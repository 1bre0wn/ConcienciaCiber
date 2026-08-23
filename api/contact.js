// Función serverless de Vercel: recibe el formulario y envía un correo con Resend.
// Configura en Vercel la variable de entorno RESEND_API_KEY (obligatoria).
// Opcional: CONTACT_FROM (remitente verificado en Resend) y CONTACT_TO (destinatario).

const esc = (s) =>
  String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
  }[c]));

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
  const first = String(body.first || '').trim();
  const last = String(body.last || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim();
  const company = String(body.company || '').trim();
  const employees = String(body.employees || '').trim();
  const sector = String(body.sector || '').trim();
  const message = String(body.message || '').trim();

  if (!first || !email || !company) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

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
        ${row('Nombre', first + ' ' + last)}
        ${row('Email', email)}
        ${row('Teléfono', phone)}
        ${row('Empresa', company)}
        ${row('Nº empleados', employees)}
        ${row('Sector', sector)}
        ${row('Mensaje', message)}
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
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
