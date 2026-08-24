// Shared posts data for blog.html and post.html
// Each post: slug, img (cover photo), cat, title, excerpt, date, read, author, c1/c2 (fallback gradient), art (svg overlay), body (html)
const WS_POSTS = [
  {
    slug: 'nis2-2026-pymes',
    img: '/uploads/blog/1450101499163.jpg',
    cat: 'Normativa',
    title: 'NIS2 ya es obligatoria: qué tiene que hacer tu pyme antes de octubre',
    excerpt: 'La directiva europea de ciberseguridad afecta a más de 100.000 empresas españolas. Te explicamos sin jerga quién está obligado, qué exige exactamente y por dónde empezar sin volverte loco.',
    date: '02 jun 2026',
    read: 9,
    author: 'Equipo Legitec · Normativa',
    c1: '#1a1a2e', c2: '#16213e',
    art: '<g stroke="rgba(245,166,35,0.5)" fill="none"><circle cx="320" cy="115" r="60"/><circle cx="320" cy="115" r="40"/><circle cx="320" cy="115" r="20" fill="rgba(245,166,35,0.25)"/></g><g stroke="rgba(255,255,255,0.12)"><line x1="0" y1="60" x2="400" y2="60"/><line x1="0" y1="170" x2="400" y2="170"/></g>',
    body: `
      <p>Si tu empresa tiene más de 50 empleados o factura más de 10 millones de euros y opera en un sector "esencial o importante", <strong>la directiva NIS2 te aplica desde ya</strong>. Y a diferencia del RGPD — donde la sanción llegaba después de la denuncia — aquí el regulador puede pedirte evidencias de forma proactiva.</p>
      <p>En Legitec llevamos meses acompañando empresas en su adecuación, y el patrón se repite: la mayoría descubre que está dentro del ámbito de aplicación mucho más tarde de lo que debería. Esta guía resume lo esencial para que no te pase.</p>

      <h2>¿Está mi empresa dentro del ámbito?</h2>
      <p>La directiva distingue entre entidades <strong>esenciales</strong> e <strong>importantes</strong>. La diferencia práctica está en el régimen de supervisión y en el techo de las sanciones, pero las obligaciones técnicas son casi idénticas:</p>
      <table>
        <thead><tr><th>Categoría</th><th>Sectores</th><th>Multa máxima</th></tr></thead>
        <tbody>
          <tr><td><strong>Esenciales</strong></td><td>Energía, transporte, banca, sanidad, agua, infraestructura digital, administración pública, espacio</td><td>10 M€ o 2% de la facturación global</td></tr>
          <tr><td><strong>Importantes</strong></td><td>Servicios postales, gestión de residuos, química, alimentación, fabricación de productos críticos, servicios digitales, investigación</td><td>7 M€ o 1,4% de la facturación global</td></tr>
        </tbody>
      </table>
      <p>Ojo al detalle que casi todo el mundo pasa por alto: <strong>la cadena de suministro</strong>. Aunque tu empresa no esté listada, si eres proveedor relevante de una entidad esencial, tu cliente te va a exigir contractualmente medidas equivalentes. NIS2 se contagia hacia abajo.</p>

      <h2>Las cinco obligaciones que importan</h2>
      <ul>
        <li><strong>Análisis de riesgos documentado</strong> y políticas de seguridad aprobadas — y firmadas — por la dirección.</li>
        <li><strong>Formación obligatoria en ciberseguridad</strong> para toda la plantilla, incluida la alta dirección.</li>
        <li><strong>Gestión de incidentes</strong> con alerta temprana a la autoridad en menos de 24 horas y notificación completa en 72.</li>
        <li><strong>Seguridad en la cadena de suministro</strong>: debes evaluar y vigilar a tus proveedores críticos.</li>
        <li><strong>Evidencias auditables</strong> de todo lo anterior. Si no está documentado, a efectos del regulador no existe.</li>
      </ul>

      <figure>
        <img src="/uploads/blog/1573164574572.jpg" alt="Reunión de un comité de dirección" loading="lazy">
        <figcaption>El artículo 20 de NIS2 hace responsable directa a la dirección: los órganos de gobierno deben aprobar las medidas, supervisarlas y formarse en ciberseguridad.</figcaption>
      </figure>

      <h2>La novedad que cambia las reglas: responsabilidad personal</h2>
      <p>Esta es la frase que más despierta a los comités de dirección cuando la explicamos en una sesión ejecutiva:</p>
      <blockquote>
        <p>Los Estados miembros velarán por que los órganos de dirección puedan ser considerados responsables del incumplimiento de las medidas de gestión de riesgos de ciberseguridad.</p>
        <cite>— Directiva (UE) 2022/2555, artículo 20</cite>
      </blockquote>
      <p>Traducción: la ciberseguridad deja de ser "un tema de IT" por mandato legal. La dirección tiene que entender el riesgo, aprobar las medidas y poder demostrar que se ha formado. Por eso nuestros itinerarios incluyen un módulo ejecutivo específico de 20 minutos.</p>

      <h2>El error más común que estamos viendo</h2>
      <p>Empresas que compran tecnología y olvidan a las personas. NIS2 menciona explícitamente la <em>"ciberhigiene y la formación"</em> como medida obligatoria (artículo 21.2.g). Un firewall no te sirve de evidencia de que tu plantilla sabe identificar un correo malicioso; un registro de formación con resultados de simulaciones, sí.</p>

      <div class="callout">
        <div class="callout-label">Recomendación LegiLearn</div>
        <p>Antes de invertir un euro más en tecnología, lanza una campaña de phishing simulada. Es la forma más rápida y barata de obtener tu métrica de riesgo humano real — y esa cifra inicial será la base de la evidencia de mejora continua que te pedirá el auditor.</p>
      </div>

      <h2>Hoja de ruta realista: 90 días</h2>
      <h3>Días 1–30 · Diagnóstico</h3>
      <p>Confirma tu ámbito de aplicación (en la duda, asume que sí), inventaría activos y proveedores críticos, y lanza la primera simulación de phishing para medir el punto de partida.</p>
      <h3>Días 31–60 · Medidas</h3>
      <p>Aprueba las políticas en comité de dirección, define el procedimiento de notificación de incidentes en 24/72 horas y activa el plan de formación continua para toda la plantilla.</p>
      <h3>Días 61–90 · Evidencias</h3>
      <p>Documenta todo lo anterior, programa la segunda simulación para demostrar mejora y prepara el expediente de adecuación. A partir de aquí, el sistema se mantiene solo: formación mensual, simulaciones trimestrales, informes automáticos.</p>

      <hr>
      <p>Las multas impresionan, pero el coste real de no hacer nada no es la sanción: es el incidente que la formación habría evitado. Si quieres saber en qué punto está tu empresa, <strong>el diagnóstico inicial con campaña de phishing incluida es gratuito</strong>.</p>
    `,
  },
  {
    slug: 'phishing-ia-deepfake-voz',
    img: '/uploads/blog/1523966211575.jpg',
    cat: 'Amenazas',
    title: 'Tu "CEO" te llama por teléfono: el fraude por voz clonada se dispara un 300%',
    excerpt: 'Los atacantes ya no necesitan escribir correos: con 30 segundos de audio público clonan la voz de un directivo y autorizan transferencias por teléfono. Así funciona el ataque y así se frena.',
    date: '28 may 2026',
    read: 7,
    author: 'Análisis de amenazas · LegiLearn',
    c1: '#2d1b00', c2: '#1a1a1a',
    art: '<g stroke="rgba(245,166,35,0.6)" fill="none" stroke-width="2"><path d="M60 115 q20 -40 40 0 q20 40 40 0 q20 -40 40 0 q20 40 40 0 q20 -40 40 0"/></g><g stroke="rgba(245,166,35,0.25)" fill="none"><path d="M60 145 q20 -25 40 0 q20 25 40 0 q20 -25 40 0 q20 25 40 0 q20 -25 40 0"/></g>',
    body: `
      <p>El esquema es tan simple que asusta: el atacante descarga una intervención pública de tu CEO — un webinar, una entrevista, un saludo en LinkedIn — y con herramientas de IA generativa accesibles por menos de 20 euros al mes <strong>clona su voz con una fidelidad que engaña a la mayoría de los empleados</strong>. No hace falta ser un grupo criminal sofisticado; hace falta una tarde libre.</p>
      <blockquote>
        <p>El 78% de los empleados no distingue una voz clonada de la real en una llamada de menos de dos minutos. Con ruido de fondo de "aeropuerto" o "coche", la cifra sube al 89%.</p>
        <cite>— Datos agregados de simulaciones de vishing, sector europeo, 2025–2026</cite>
      </blockquote>

      <h2>Anatomía del ataque, paso a paso</h2>
      <ol>
        <li><strong>Reconocimiento:</strong> el atacante identifica en LinkedIn quién autoriza pagos y quién los ejecuta. Esta información suele ser pública.</li>
        <li><strong>Recolección de voz:</strong> 30–60 segundos de audio del directivo bastan. Webinars, podcasts y vídeos corporativos son la fuente habitual.</li>
        <li><strong>El pretexto:</strong> una "operación confidencial" — una adquisición, un pago a un proveedor estratégico — que exige discreción y urgencia.</li>
        <li><strong>La llamada:</strong> viernes por la tarde, fin de trimestre o vísperas de festivo. Cuanta menos gente haya para consultar, mejor para el atacante.</li>
        <li><strong>El refuerzo:</strong> cada vez más, la llamada va precedida de un correo o un SMS "del CEO" anunciando que llamará. La coherencia entre canales dispara la credibilidad.</li>
      </ol>

      <figure>
        <img src="/uploads/blog/1587560699334.jpg" alt="Escritorio de oficina con teléfono y portátil" loading="lazy">
        <figcaption>El departamento financiero es el objetivo número uno: autoriza pagos y está entrenado para responder rápido a la dirección. Exactamente lo que el atacante explota.</figcaption>
      </figure>

      <h2>Las señales que deben encender la alarma</h2>
      <ul>
        <li><strong>Urgencia + secretismo:</strong> "tiene que salir hoy" y "no lo comentes con nadie" en la misma conversación. Ninguna operación legítima exige ambas cosas.</li>
        <li><strong>Cambio de circuito:</strong> se pide saltarse el procedimiento habitual de pagos "solo por esta vez".</li>
        <li><strong>Canal inusual:</strong> el CEO nunca llama para esto, pero hoy sí. Y casualmente desde un número oculto o desconocido.</li>
        <li><strong>Resistencia a la verificación:</strong> cualquier intento de confirmar por otro canal genera presión o irritación. Un directivo real entiende la prudencia; un atacante no puede permitírsela.</li>
      </ul>

      <h2>Las tres defensas que funcionan</h2>
      <p><strong>1. Protocolo de doble verificación.</strong> Ninguna transferencia fuera del circuito habitual se ejecuta sin confirmación por un segundo canal — mensaje directo al número conocido, videollamada o en persona. Sin excepciones, ni siquiera "del CEO". La regla protege precisamente porque no admite jerarquías.</p>
      <p><strong>2. Palabra clave interna.</strong> Para operaciones sensibles, una palabra de verificación acordada que jamás se comunica por escrito. De coste cero y eficacia total contra la clonación de voz: la IA imita el timbre, no el conocimiento compartido.</p>
      <p><strong>3. Entrenamiento con simulaciones.</strong> Igual que simulamos correos de phishing, simulamos llamadas de vishing. Quien ha vivido el ataque una vez en un simulacro — con el corazón acelerado y la "voz del jefe" al otro lado — no cae en el real.</p>

      <div class="callout">
        <div class="callout-label">Recomendación LegiLearn</div>
        <p>Documenta el protocolo de doble verificación en una página, fírmalo desde dirección y entrénalo con un simulacro trimestral. El día que llegue la llamada real, tu equipo no tendrá que decidir bajo presión: solo seguir el procedimiento.</p>
      </div>

      <hr>
      <p>En LegiLearn hemos incorporado módulos específicos de fraude por voz e ingeniería social telefónica a los itinerarios de formación, con simulaciones de vishing incluidas. Si tu plan de concienciación solo cubre el correo, tiene un agujero del tamaño de una llamada.</p>
    `,
  },
  {
    slug: 'qr-phishing-quishing',
    img: '/uploads/blog/1512941937669.jpg',
    cat: 'Amenazas',
    title: 'Quishing: el código QR del parking puede vaciarte la cuenta',
    excerpt: 'Pegatinas falsas sobre códigos legítimos en parquímetros, cartas físicas con QR "del banco" y menús de restaurante manipulados. El phishing por QR crece porque salta los filtros del correo.',
    date: '19 may 2026',
    read: 6,
    author: 'Análisis de amenazas · LegiLearn',
    c1: '#0f2027', c2: '#203a43',
    art: '<g fill="rgba(245,166,35,0.55)"><rect x="290" y="60" width="14" height="14"/><rect x="310" y="60" width="14" height="14"/><rect x="350" y="60" width="14" height="14"/><rect x="290" y="80" width="14" height="14"/><rect x="330" y="80" width="14" height="14"/><rect x="290" y="120" width="14" height="14"/><rect x="310" y="100" width="14" height="14"/><rect x="350" y="100" width="14" height="14"/><rect x="330" y="120" width="14" height="14"/><rect x="350" y="140" width="14" height="14"/><rect x="290" y="160" width="14" height="14"/><rect x="310" y="160" width="14" height="14"/></g>',
    body: `
      <p>El éxito del <em>quishing</em> tiene una explicación técnica muy sencilla: <strong>el código QR es opaco para los humanos y para muchos filtros de seguridad</strong>. Tu pasarela de correo analiza enlaces escritos; una imagen con un QR incrustado pasa de largo. Y en el mundo físico — un parquímetro, una mesa de restaurante, un buzón — directamente no hay filtro ninguno.</p>
      <p>A eso se suma un factor psicológico: hemos entrenado a la gente durante años para desconfiar de los enlaces del correo, pero <strong>nadie le ha dicho nunca que desconfíe de un cartel</strong>. El QR hereda la confianza del soporte físico donde está pegado.</p>

      <h2>Los tres escenarios que más vemos</h2>
      <h3>1. Parquímetros y cargadores eléctricos</h3>
      <p>Pegatina falsa sobre el QR real. Pagas "el parking" en una web clonada idéntica a la oficial y de paso regalas los datos de tu tarjeta. Varias ciudades españolas han emitido avisos públicos por oleadas de este fraude.</p>
      <h3>2. Cartas físicas del "banco"</h3>
      <p>Papel con membrete impecable pidiendo "reactivar la app" o "verificar un cargo" escaneando el código. La carta física genera una confianza que el email perdió hace años — y los atacantes lo saben.</p>
      <h3>3. Correos con QR para "ver una factura" o "firmar un documento"</h3>
      <p>El truco más fino: al escanear con el móvil personal, la víctima <strong>sale del perímetro protegido de la empresa</strong>. El portátil corporativo tiene filtros, proxy y EDR; el móvil personal, normalmente nada.</p>

      <figure>
        <img src="/uploads/blog/1563013544.jpg" alt="Persona introduciendo los datos de su tarjeta en un portátil" loading="lazy">
        <figcaption>El destino final del quishing casi siempre es el mismo: una web clonada que captura credenciales corporativas o datos de tarjeta.</figcaption>
      </figure>

      <blockquote>
        <p>En las campañas de quishing simulado lanzadas desde nuestra plataforma, el 23% de los empleados escaneó el código y llegó a introducir sus credenciales.</p>
        <cite>— Resultados agregados, primeras 50 empresas, LegiLearn 2026</cite>
      </blockquote>

      <h2>Reglas de oro para tu equipo</h2>
      <ol>
        <li><strong>Todo QR que pida credenciales o pago es sospechoso por defecto.</strong> Los procesos legítimos casi nunca funcionan así.</li>
        <li><strong>Mira la URL antes de abrir.</strong> El móvil la muestra al escanear: tres segundos de atención que desactivan el 90% de los ataques.</li>
        <li><strong>Pegatina sobre pegatina, no se escanea.</strong> Si el código está superpuesto sobre otro o tiene los bordes levantados, repórtalo.</li>
        <li><strong>Las apps se descargan de la tienda oficial</strong>, nunca desde un QR de un papel o un cartel.</li>
        <li><strong>Para pagar el parking, usa la app oficial</strong> que ya tienes instalada, no el código del poste.</li>
      </ol>

      <div class="callout">
        <div class="callout-label">Recomendación LegiLearn</div>
        <p>Incluye el quishing en tu próxima campaña de simulación. Es el vector con mayor diferencia entre percepción y realidad: los equipos se creen preparados porque "saben de phishing", y los resultados demuestran lo contrario. La plantilla de campaña QR está lista para lanzar en la plataforma.</p>
      </div>

      <hr>
      <p>El QR no es el enemigo — es una herramienta magnífica. El problema es la confianza ciega. Y eso, como casi todo en seguridad, se corrige entrenando el ojo: primero en un simulacro controlado, para que el día real la alarma salte sola.</p>
    `,
  },
  {
    slug: 'contrasenas-passkeys-2026',
    img: '/uploads/blog/1614064641938.jpg',
    cat: 'Guías',
    title: 'Adiós a las contraseñas: guía práctica de passkeys para empresas',
    excerpt: 'Google, Microsoft y Apple ya permiten eliminar las contraseñas por completo. Explicamos qué son las passkeys, por qué son inmunes al phishing y cómo desplegarlas sin drama en tu organización.',
    date: '12 may 2026',
    read: 8,
    author: 'Guías prácticas · LegiLearn',
    c1: '#1a1a2e', c2: '#0f3460',
    art: '<g stroke="rgba(245,166,35,0.55)" fill="none" stroke-width="2"><circle cx="310" cy="100" r="28"/><path d="M310 128 v40 M310 145 h22 M310 160 h16"/></g><g stroke="rgba(255,255,255,0.1)"><line x1="0" y1="190" x2="400" y2="190"/></g>',
    body: `
      <p>Una passkey es una credencial criptográfica que vive en tu dispositivo — móvil, portátil, llave física — y se desbloquea con tu huella o tu cara. <strong>No hay nada que escribir, nada que recordar y, crucialmente, nada que robar mediante phishing</strong>: la clave privada nunca sale del dispositivo y solo funciona en el dominio legítimo.</p>

      <h2>Por qué son inmunes al phishing</h2>
      <p>Cuando un empleado introduce su contraseña en una web clonada, el atacante la captura y la reutiliza. Con passkeys este ataque es <strong>matemáticamente imposible</strong>: la passkey de <em>tuempresa.com</em> no responde ante <em>tuempresa-login.co</em>. El navegador ni siquiera la ofrece. No es que el empleado "deba fijarse mejor" — es que no hay nada que pueda entregar por error.</p>
      <p>Esto convierte a las passkeys en la única medida que elimina de raíz la categoría completa de ataques de robo de credenciales, en lugar de mitigarla.</p>

      <figure>
        <img src="/uploads/blog/1510511459019.jpg" alt="Pantalla de portátil con código en un entorno oscuro" loading="lazy">
        <figcaption>Miles de millones de contraseñas filtradas circulan en listas combinadas que alimentan ataques automatizados de credential stuffing. Las passkeys no aparecen en ninguna lista: no hay nada que filtrar.</figcaption>
      </figure>

      <h2>Contraseña vs. passkey, sin tecnicismos</h2>
      <table>
        <thead><tr><th>Riesgo</th><th>Contraseña</th><th>Passkey</th></tr></thead>
        <tbody>
          <tr><td>Phishing</td><td>Vulnerable, incluso con MFA por SMS</td><td>Inmune por diseño</td></tr>
          <tr><td>Filtración del servidor</td><td>Hash crackeable y reutilizable</td><td>Solo se filtra la clave pública: inservible</td></tr>
          <tr><td>Reutilización entre servicios</td><td>El hábito más extendido y peligroso</td><td>Imposible: una por servicio, automática</td></tr>
          <tr><td>Fricción para el usuario</td><td>Recordar, rotar, gestionar</td><td>Huella o cara: dos segundos</td></tr>
        </tbody>
      </table>

      <blockquote>
        <p>Las cuentas protegidas con passkeys resisten más del 99% de los ataques de apropiación automatizados; el inicio de sesión es además ocho veces más rápido que con contraseña y MFA tradicional.</p>
        <cite>— Datos publicados por la FIDO Alliance y los principales proveedores de identidad</cite>
      </blockquote>

      <h2>Plan de despliegue en 4 fases</h2>
      <ol>
        <li><strong>Inventario (semana 1–2):</strong> identifica qué aplicaciones soportan ya FIDO2/WebAuthn. Microsoft 365, Google Workspace y la mayoría de SaaS modernos lo hacen; tu ERP de 2009 probablemente no, y no pasa nada: prioriza el correo y la identidad central, que es donde ocurre el phishing.</li>
        <li><strong>Piloto con IT y dirección (semana 3–4):</strong> dos semanas, grupo reducido, recogida de fricciones reales — dispositivos compartidos, perfiles sin móvil corporativo, recuperación de cuenta.</li>
        <li><strong>Despliegue general (mes 2):</strong> activación por departamentos con la contraseña como respaldo temporal. La comunicación importa más que la técnica: explica el "por qué" antes del "cómo".</li>
        <li><strong>Eliminación del respaldo (mes 3+):</strong> política de passkey obligatoria donde sea posible y contraseña deshabilitada. Hasta este paso, el phishing sigue funcionando: el atacante simplemente pide "el método antiguo".</li>
      </ol>

      <div class="callout">
        <div class="callout-label">Recomendación LegiLearn</div>
        <p>El mayor obstáculo no es técnico, es de comunicación: la gente desconfía de lo que no entiende ("¿y si me cortan el dedo?", nos preguntan en serio en las formaciones). Acompaña el despliegue con una píldora formativa que explique qué es una passkey y por qué es más cómoda — cuando el empleado entiende que gana en comodidad y en seguridad a la vez, la adopción se dispara.</p>
      </div>

      <hr>
      <p>Nuestro módulo de formación sobre passkeys está incluido en todos los itinerarios de la plataforma, junto con la guía de despliegue para administradores. Quince minutos de formación que eliminan la principal puerta de entrada de los atacantes.</p>
    `,
  },
  {
    slug: 'ransomware-backup-3-2-1',
    img: '/uploads/blog/1558494949.jpg',
    cat: 'Guías',
    title: 'El ransomware no te perdonará un mal backup: la regla 3-2-1-1-0 explicada',
    excerpt: 'Pagar el rescate no garantiza recuperar nada — y en muchos casos es ilegal. La única defensa real es una estrategia de copias que el atacante no pueda cifrar. Te contamos la regla de oro actualizada.',
    date: '05 may 2026',
    read: 7,
    author: 'Guías prácticas · LegiLearn',
    c1: '#232526', c2: '#414345',
    art: '<g stroke="rgba(245,166,35,0.5)" fill="none" stroke-width="2"><rect x="280" y="70" width="60" height="44" rx="4"/><rect x="292" y="92" width="60" height="44" rx="4" fill="rgba(245,166,35,0.12)"/><rect x="304" y="114" width="60" height="44" rx="4" fill="rgba(245,166,35,0.2)"/></g>',
    body: `
      <p>El ransomware moderno no cifra tus datos nada más entrar. Primero pasa días — a veces semanas — moviéndose en silencio por tu red con un objetivo prioritario: <strong>localizar y destruir las copias de seguridad</strong>. Los atacantes saben que una empresa con backups intactos no paga. Tu estrategia de copias es, literalmente, tu póliza de vida digital.</p>
      <blockquote>
        <p>En el 94% de los incidentes de ransomware analizados, los atacantes intentaron comprometer los repositorios de backup; lo consiguieron total o parcialmente en más de la mitad de los casos.</p>
        <cite>— Informes de respuesta a incidentes del sector, 2025</cite>
      </blockquote>

      <h2>La regla 3-2-1-1-0, número a número</h2>
      <table>
        <thead><tr><th>Regla</th><th>Qué significa</th><th>La pregunta que debes hacerte</th></tr></thead>
        <tbody>
          <tr><td><strong>3</strong></td><td>Tres copias de tus datos: producción más dos copias</td><td>¿Sobrevivimos si fallan dos soportes a la vez?</td></tr>
          <tr><td><strong>2</strong></td><td>Dos soportes distintos: disco y cloud, por ejemplo</td><td>¿Un mismo fallo puede afectar a ambas copias?</td></tr>
          <tr><td><strong>1</strong></td><td>Una copia fuera de la oficina (offsite)</td><td>¿Qué pasa si la oficina arde o se inunda?</td></tr>
          <tr><td><strong>1</strong></td><td>Una copia inmutable u offline</td><td>¿Puede borrarla un administrador con credenciales robadas?</td></tr>
          <tr><td><strong>0</strong></td><td>Cero errores verificados en restauración</td><td>¿Cuándo probamos restaurar por última vez?</td></tr>
        </tbody>
      </table>
      <p>El cuarto punto — la copia <strong>inmutable</strong> — es el que marca la diferencia en 2026. Si el atacante consigue credenciales de administrador (y el phishing se las dará), borrará todo lo que se pueda borrar. La inmutabilidad (object lock en S3, cintas offline, appliances WORM) es la única garantía que sobrevive a un administrador comprometido.</p>

      <figure>
        <img src="/uploads/blog/1622151834677.jpg" alt="Técnico trabajando frente a un portátil de noche" loading="lazy">
        <figcaption>La diferencia entre una mala noche y el cierre del negocio se decide meses antes del incidente: en cómo diseñaste — y probaste — tus copias.</figcaption>
      </figure>

      <h2>El simulacro que casi nadie hace</h2>
      <p>Pregunta incómoda: ¿cuánto tardaríais en restaurar el servidor de ficheros completo? Si la respuesta es "no lo sabemos", tenéis un plan teórico, no un plan. <strong>Agenda una prueba de restauración trimestral con cronómetro.</strong> El dato que obtengas — tu RTO real — vale más que cualquier auditoría, y suele dar sorpresas: copias corruptas desde hace meses, dependencias olvidadas, documentación desactualizada.</p>

      <h2>Por qué pagar no es un plan</h2>
      <ul>
        <li><strong>No garantiza nada:</strong> una parte significativa de las empresas que pagan no recupera todos sus datos, y el descifrador del atacante suele ser lento y defectuoso.</li>
        <li><strong>Te marca como pagador:</strong> los grupos comparten listas de víctimas que pagan. La probabilidad de un segundo ataque se multiplica.</li>
        <li><strong>Puede ser ilegal:</strong> si el grupo está sancionado internacionalmente, pagar puede constituir una infracción en sí misma.</li>
        <li><strong>No evita la extorsión doble:</strong> aunque recuperes los datos, te seguirán chantajeando con publicarlos.</li>
      </ul>

      <div class="callout">
        <div class="callout-label">Recomendación LegiLearn</div>
        <p>Trata el backup como un sistema de seguridad, no como una tarea de mantenimiento: credenciales separadas del dominio principal, copia inmutable, prueba de restauración trimestral documentada. Y recuerda que el ransomware entra casi siempre por un correo — la mejor restauración es la que nunca llegas a necesitar.</p>
      </div>

      <hr>
      <p>La formación continua y las simulaciones de phishing reducen drásticamente la probabilidad de que el ransomware llegue a ejecutarse. Las copias bien diseñadas garantizan que, si llega, sea un mal día y no un cierre de persiana. Necesitas las dos cosas.</p>
    `,
  },
  {
    slug: 'teletrabajo-wifi-publica',
    img: '/uploads/blog/1521017432531.jpg',
    cat: 'Buenas prácticas',
    title: 'Teletrabajo seguro: lo que tu equipo hace mal en la cafetería (y cómo arreglarlo)',
    excerpt: 'Wifi abiertas, pantallas a la vista, portátiles desbloqueados y conversaciones de trabajo a volumen de conferencia. Una guía realista de seguridad para equipos híbridos, sin paranoia.',
    date: '27 abr 2026',
    read: 6,
    author: 'Buenas prácticas · LegiLearn',
    c1: '#134e5e', c2: '#1a1a2e',
    art: '<g stroke="rgba(245,166,35,0.55)" fill="none" stroke-width="2"><path d="M280 140 a45 45 0 0 1 80 0"/><path d="M292 152 a30 30 0 0 1 56 0"/><path d="M304 164 a16 16 0 0 1 32 0"/><circle cx="320" cy="172" r="4" fill="rgba(245,166,35,0.8)"/></g>',
    body: `
      <p>El teletrabajo llegó para quedarse y los atacantes lo celebran: el perímetro de tu empresa ya no es la oficina, es <strong>cada cafetería, cada AVE y cada salón con la wifi del vecino</strong>. La buena noticia: el 90% del riesgo se elimina con hábitos simples, no con tecnología cara. Esta es la guía que damos a los equipos híbridos, sin paranoia y sin jerga.</p>

      <h2>Los 5 errores que vemos a diario</h2>
      <ul>
        <li><strong>Wifi pública sin VPN:</strong> en una red abierta, tu tráfico es una postal que cualquiera en la misma red puede intentar leer o manipular. Con VPN, un sobre lacrado. Fuera de casa, la VPN corporativa no es opcional.</li>
        <li><strong>Pantalla a la vista:</strong> el <em>shoulder surfing</em> es la técnica de espionaje más barata del mundo — y en un AVE lleno, la más rentable. Un filtro de privacidad cuesta 30 euros.</li>
        <li><strong>Portátil desbloqueado al ir al baño:</strong> 40 segundos bastan para insertar un USB malicioso o reenviarse un documento. Bloqueo automático a 1 minuto y bloqueo manual al levantarse, siempre.</li>
        <li><strong>Llamadas sensibles a volumen de conferencia:</strong> los datos también se filtran por el aire. Nombres de clientes, cifras, contraseñas dictadas… Auriculares y discreción.</li>
        <li><strong>Dispositivos personales sin gestionar:</strong> si el portátil personal accede al CRM, necesita las mismas protecciones que el corporativo. BYOD sin gestión es un agujero con patas.</li>
      </ul>

      <figure>
        <img src="/uploads/blog/1554118811.jpg" alt="Persona trabajando con su portátil en una cafetería" loading="lazy">
        <figcaption>La oficina de hoy tiene camareros. Cada mesa de cafetería con un portátil corporativo abierto es una extensión del perímetro de tu empresa.</figcaption>
      </figure>

      <blockquote>
        <p>El riesgo del teletrabajo no está en la tecnología: está en que nadie le ha explicado al equipo, con ejemplos reales, qué puede salir mal en una cafetería.</p>
        <cite>— Conclusión recurrente de nuestras auditorías de seguridad en entornos híbridos</cite>
      </blockquote>

      <h2>El kit del teletrabajador seguro</h2>
      <ol>
        <li><strong>VPN siempre activa</strong> fuera de la red de casa — ideal si se conecta sola y el empleado ni lo piensa.</li>
        <li><strong>Filtro de privacidad</strong> en el portátil de quien viaja o trabaja en espacios públicos.</li>
        <li><strong>Compartir internet del móvil antes que wifi abierta:</strong> tu 5G es infinitamente más seguro que la wifi del aeropuerto.</li>
        <li><strong>Bloqueo automático a 1 minuto</strong> + hábito de Win+L / Ctrl+Cmd+Q al levantarse.</li>
        <li><strong>Gestor de contraseñas corporativo</strong> — o mejor aún, passkeys — para que ninguna credencial se escriba en un papel o se dicte por teléfono.</li>
        <li><strong>Un canal claro para reportar:</strong> si algo se pierde o se sospecha, el empleado debe saber a quién avisar en menos de 5 minutos, sin miedo a la bronca.</li>
      </ol>

      <div class="callout">
        <div class="callout-label">Recomendación LegiLearn</div>
        <p>La política de teletrabajo perfecta de 14 páginas que nadie lee protege menos que seis hábitos entrenados. Convierte esta lista en tu política mínima, fórmala con casos reales y refuérzala con un recordatorio trimestral. Lo simple y repetido gana a lo exhaustivo e ignorado.</p>
      </div>

      <hr>
      <p>Nuestro módulo "Teletrabajo seguro" condensa todo esto en 4 minutos de vídeo con casos reales — es uno de los contenidos mejor valorados de la plataforma, precisamente porque habla de situaciones que todo el mundo reconoce. La seguridad que se entiende es la que se aplica.</p>
    `,
  },
];
