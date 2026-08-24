/* ==========================================================================
   Genera el sprite de iconos a partir de Lucide (https://lucide.dev, ISC).

       node build-iconos.mjs

   Antes los iconos estaban dibujados a mano y el juego tenía diez grosores
   de línea distintos, que es lo que hacía que se vieran desparejos. Lucide
   está dibujado sobre una rejilla de 24 px con un único grosor, así que el
   sprite se genera de ahí y no se retoca a mano.

   El sprite va en línea en cada página, no en un fichero aparte: los sprites
   externos con <use href="fichero.svg#id"> no funcionan en Safari.
   ========================================================================== */
import fs from 'node:fs';

const VERSION = '0.544.0'; // fijada a propósito: que no cambie el dibujo solo
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120 Safari/537.36';

// Nuestro identificador -> nombre en Lucide.
const ICONOS = {
  'i-check': 'check',        'i-arrow': 'arrow-right',   'i-down': 'chevron-down',
  'i-menu': 'menu',          'i-close': 'x',             'i-login': 'log-in',
  'i-mail': 'mail',          'i-inbox': 'inbox',         'i-chat': 'message-square',
  'i-phone': 'phone',        'i-doc': 'file-text',       'i-clip': 'paperclip',
  'i-list': 'list-checks',   'i-pen': 'square-pen',      'i-lock': 'lock',
  'i-qr': 'qr-code',         'i-card': 'credit-card',    'i-cap': 'graduation-cap',
  'i-chart': 'chart-column', 'i-trend': 'trending-up',   'i-refresh': 'refresh-cw',
  'i-globe': 'globe',        'i-puzzle': 'puzzle',       'i-gift': 'gift',
  'i-play-circle': 'circle-play',
};

/* Dos excepciones a propósito:
   - i-quote es un signo tipográfico macizo, no un icono de línea.
   - i-play va relleno: un triángulo hueco en un botón de reproducir se ve
     endeble a tamaño pequeño. */
const APARTE = [
  '  <symbol id="i-quote" viewBox="0 0 32 32" fill="currentColor" stroke="none"><path d="M10 18V10a4 4 0 0 1 4-4h2v2h-2a2 2 0 0 0-2 2v2h4v8h-6zm10 0V10a4 4 0 0 1 4-4h2v2h-2a2 2 0 0 0-2 2v2h4v8h-6z"/></symbol>',
  '  <symbol id="i-play" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21"/></symbol>',
];

const simbolos = [];
for (const [id, nombre] of Object.entries(ICONOS)) {
  const r = await fetch(`https://unpkg.com/lucide-static@${VERSION}/icons/${nombre}.svg`, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`${nombre}: ${r.status}`);
  const svg = await r.text();
  // Nos quedamos sólo con el dibujo: los atributos comunes van en el <symbol>.
  const dentro = svg.slice(svg.indexOf('>', svg.indexOf('<svg')) + 1, svg.lastIndexOf('</svg>'))
    .replace(/\s+/g, ' ')
    .trim();
  simbolos.push(`  <symbol id="${id}" viewBox="0 0 24 24">${dentro}</symbol>`);
  console.log(`${id.padEnd(15)} ${nombre}`);
}

simbolos.push(...APARTE);

const SPRITE = `<!-- Sprite de iconos: se usa con <use href="#i-…">.
     Generado por build-iconos.mjs a partir de Lucide ${VERSION} (licencia ISC).
     No editar a mano: un grosor de línea único es lo que mantiene el juego
     coherente, y retocar un icono suelto es justo lo que lo rompe. -->
<svg class="sr-only" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
${simbolos.join('\n')}
</svg>`;

fs.writeFileSync('assets/sprite.html', SPRITE + '\n');
console.log(`\nassets/sprite.html: ${simbolos.length} iconos, ${(SPRITE.length / 1024).toFixed(1)} KB`);
