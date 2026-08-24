// Función serverless de Vercel: recibe el formulario y envía un correo con Resend.
// Configura en Vercel la variable de entorno RESEND_API_KEY (obligatoria).
// Opcional: CONTACT_FROM (remitente verificado en Resend) y CONTACT_TO (destinatario).
//
// El endpoint es público, así que da por hecho que le van a pegar. Filtra en
// este orden: método, tamaño, trampa para robots, tiempo de relleno, límite por
// IP, campos obligatorios y formato. Lo que pasa todo eso, se envía.

const esc = (s) =>
  String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
  }[c]));

// Longitud máxima por campo. Nadie pone su nombre en 5.000 caracteres, y sin
// esto un solo envío puede meter megas en el buzón.
const LIMITES = {
  first: 80, last: 80, email: 160, phone: 40,
  company: 120, employees: 40, sector: 60, message: 2000,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

// Límite por IP. Es "el mejor esfuerzo": vive en memoria del proceso, así que
// sólo cuenta mientras la instancia siga caliente y no se comparte entre
// regiones. Frena ráfagas, que es el caso real; no sustituye a un WAF.
const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 5;
const visitas = new Map();

const demasiadas = (ip) => {
  const ahora = Date.now();
  const previas = (visitas.get(ip) || []).filter((t) => ahora - t < VENTANA_MS);
  previas.push(ahora);
  visitas.set(ip, previas);

  // Poda: sin esto el Map crece sin freno mientras la instancia siga viva.
  if (visitas.size > 5000) {
    for (const [k, v] of visitas) {
      if (!v.some((t) => ahora - t < VENTANA_MS)) visitas.delete(k);
    }
  }
  return previas.length > MAX_POR_VENTANA;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Falta la variable de entorno RESEND_API_KEY' });
  }

  const body = req.body || {};

  // 1. La trampa. Si viene rellena es un robot: le devolvemos un 200 para que
  //    no aprenda que le hemos calado, pero no enviamos nada.
  if (String(body.website || '').trim()) {
    return res.status(200).json({ ok: true });
  }

  // 2. Tiempo de relleno. Menos de tres segundos no lo hace una persona.
  const elapsed = Number(body.elapsed);
  if (Number.isFinite(elapsed) && elapsed < 3000) {
    return res.status(200).json({ ok: true });
  }

  // 3. Límite por IP.
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'desconocida';
  if (demasiadas(ip)) {
    res.setHeader('Retry-After', '600');
    return res.status(429).json({ error: 'Demasiadas solicitudes. Inténtalo en unos minutos.' });
  }

  // 4. Campos: recortados a su longitud máxima.
  const campo = (nombre) => String(body[nombre] == null ? '' : body[nombre]).trim().slice(0, LIMITES[nombre]);
  const first = campo('first');
  const last = campo('last');
  const email = campo('email');
  const phone = campo('phone');
  const company = campo('company');
  const employees = campo('employees');
  const sector = campo('sector');
  const message = campo('message');

  if (!first || !email || !company) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  if (!EMAIL.test(email)) {
    return res.status(400).json({ error: 'El correo no tiene un formato válido' });
  }
  // Sin consentimiento no hay envío: es el que legitima el tratamiento.
  if (body.consent !== true && body.consent !== 'true' && body.consent !== 'on') {
    return res.status(400).json({ error: 'Falta el consentimiento' });
  }

  // Registro del consentimiento, para poder demostrarlo si algún día se
  // reclama: cuándo, desde qué IP y con qué texto exacto.
  const sello = new Date().toISOString();
  const consentText = String(body.consentText || '').trim().slice(0, 400);

  const row = (label, value) =>
    `<tr>
      <td style="padding:6px 16px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top">${esc(label)}</td>
      <td style="padding:6px 0;font-size:14px;color:#111">${esc(value) || '-'}</td>
    </tr>`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#111">
      <h2 style="font-size:18px;margin:0 0 4px">Nueva solicitud de demo</h2>
      <p style="font-size:13px;color:#6b7280;margin:0 0 16px">Enviada desde la web de LegiLearn.</p>
      <table style="border-collapse:collapse;width:100%">
        ${row('Nombre', (first + ' ' + last).trim())}
        ${row('Email', email)}
        ${row('Teléfono', phone)}
        ${row('Empresa', company)}
        ${row('Nº empleados', employees)}
        ${row('Sector', sector)}
        ${row('Mensaje', message)}
      </table>
      <h3 style="font-size:13px;margin:22px 0 6px;color:#6b7280">Registro de consentimiento</h3>
      <table style="border-collapse:collapse;width:100%">
        ${row('Fecha y hora', sello)}
        ${row('IP de origen', ip)}
        ${row('Texto aceptado', consentText)}
      </table>
    </div>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'LegiLearn <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO || 'eperez@legitec.com'],
        reply_to: email,
        subject: `Nueva solicitud de demo: ${company}`,
        html,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error('Error de Resend:', detail);
      return res.status(502).json({ error: 'No se pudo enviar el correo' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error interno:', err);
    return res.status(500).json({ error: 'Error interno' });
  }
}
