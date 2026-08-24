/* ==========================================================================
   Generador de las páginas del blog.
   Lee posts-data.js y escribe un fichero HTML por artículo en /blog.

       node build-blog.mjs

   Antes el artículo se montaba con JavaScript desde post.html?p=slug. Eso
   dejaba a los seis artículos compartiendo título, descripción y canonical,
   y hacía que al compartir un enlace por WhatsApp o LinkedIn saliera el
   título genérico: los previsualizadores no ejecutan JavaScript. Ahora cada
   artículo es una página real, con su propia cabecera y su propio HTML.

   Hay que ejecutarlo después de tocar posts-data.js.
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://web.legilearn.com';
const OUT = 'blog';

/* --- Datos ---------------------------------------------------------------- */
const posts = (() => {
  const src = fs.readFileSync('posts-data.js', 'utf8');
  return new Function(`${src}; return WS_POSTS;`)();
})();

const esc = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const abs = (url) => (url.startsWith('http') ? url : SITE + (url.startsWith('/') ? '' : '/') + url);

/* Fecha "02 jun 2026" -> "2026-06-02", que es lo que entienden los buscadores. */
const MESES = { ene: '01', feb: '02', mar: '03', abr: '04', may: '05', jun: '06',
                jul: '07', ago: '08', sep: '09', oct: '10', nov: '11', dic: '12' };
const iso = (fecha) => {
  const m = String(fecha).match(/(\d{1,2})\s+([a-zñ]{3})[a-z]*\.?\s+(\d{4})/i);
  if (!m) return null;
  const mes = MESES[m[2].toLowerCase().slice(0, 3)];
  return mes ? `${m[3]}-${mes}-${m[1].padStart(2, '0')}` : null;
};

/* --- Plantilla ------------------------------------------------------------
   Reutiliza blog.html: misma cabecera, mismo pie, mismo sprite de iconos.
   Como las páginas viven en /blog, las rutas relativas suben un nivel. */
const shell = fs.readFileSync('blog.html', 'utf8').replace(/\r\n/g, '\n');

const subir = (html) =>
  html
    .replace(/(href|src)="(assets\/)/g, '$1="../$2')
    .replace(/(href)="(index|blog|nosotros|post)\.html/g, '$1="../$2.html');

// El <head> de blog.html trae el JSON-LD del índice (@type Blog, con la lista
// de artículos). En una página de artículo no pinta nada: fuera, que cada una
// declara su propio BlogPosting.
const head = subir(shell.slice(shell.indexOf('<head>'), shell.indexOf('</head>')))
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\n?/g, '');
const entreHeadYMain = subir(shell.slice(shell.indexOf('<body>'), shell.indexOf('<main id="contenido">')));
const cierre = subir(shell.slice(shell.indexOf('</main>') + '</main>'.length, shell.indexOf('<script src="assets/app.js"')));

/* --- Composición ---------------------------------------------------------- */

/* Las tablas anchas tienen que poder desplazarse solas; si no, empujan la
   página entera en móvil. Antes lo hacía blog.js al vuelo. */
const cuerpo = (html) =>
  html.trim().replace(/<table[\s\S]*?<\/table>/g, (t) => `<div class="table-scroll">${t}</div>`);

const tarjeta = (p) => `
      <li><article class="card card--hover post-card">
        <a class="post-card__cover" href="${esc(p.slug)}.html">
          <img src="${esc(p.img)}" alt="" width="1400" height="900" loading="lazy" decoding="async">
        </a>
        <div class="post-card__body">
          <p class="post-meta"><span class="post-cat">${esc(p.cat)}</span><span>${esc(p.date)}</span><span>${p.read} min</span></p>
          <h3><a href="${esc(p.slug)}.html">${esc(p.title)}</a></h3>
          <p>${esc(p.excerpt)}</p>
        </div>
      </article></li>`;

const pagina = (p) => {
  const url = `${SITE}/${OUT}/${p.slug}.html`;
  const img = abs(p.img);
  const fecha = iso(p.date);
  const otros = posts.filter((o) => o.slug !== p.slug).slice(0, 3);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.excerpt,
    image: img,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'es-ES',
    author: { '@type': 'Organization', name: p.author },
    publisher: {
      '@type': 'Organization',
      name: 'LegiLearn',
      url: SITE + '/',
      logo: { '@type': 'ImageObject', url: SITE + '/assets/legilearn-logo.png' },
    },
    ...(fecha ? { datePublished: fecha, dateModified: fecha } : {}),
    articleSection: p.cat,
    timeRequired: `PT${p.read}M`,
  };

  const cabecera = head
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(p.title)} | LegiLearn</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(p.excerpt)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`)
    .replace(/<meta property="og:type" content="[^"]*">/, '<meta property="og:type" content="article">')
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(p.title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(p.excerpt)}">`)
    .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${img}">\n<meta property="og:image:alt" content="${esc(p.title)}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${esc(p.title)}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${esc(p.excerpt)}">`)
    .replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${img}">`);

  return `<!doctype html>
<html lang="es">
${cabecera}
<script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
</script>
</head>
${entreHeadYMain}<main id="contenido">

  <section class="page-hero">
    <div class="wrap" style="max-width:900px">
      <p class="post-meta" style="color:rgba(245,245,245,.7);margin-bottom:20px">
        <a href="../blog.html" style="color:var(--amber)">Blog</a>
        <span>·</span><span>${esc(p.cat)}</span>
        <span>·</span>${fecha ? `<time datetime="${fecha}">${esc(p.date)}</time>` : `<span>${esc(p.date)}</span>`}
        <span>·</span><span>${p.read} min de lectura</span>
      </p>
      <h1>${esc(p.title)}</h1>
      <p class="page-hero__lead">${esc(p.excerpt)}</p>
      <p class="page-hero__lead" style="margin-top:20px;font-size:14px">${esc(p.author)}</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <article class="article">
        <figure class="article__cover">
          <img src="${esc(p.img)}" alt="" width="1600" height="900" fetchpriority="high" decoding="async">
        </figure>
        <div class="prose">${cuerpo(p.body)}</div>
      </article>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="wrap">
      <div class="head">
        <div class="head__title">
          <p class="eyebrow">Seguir leyendo</p>
          <h2>Otros artículos del blog.</h2>
        </div>
        <p class="head__lead"><a class="btn btn--ghost" href="../blog.html">Ver todos <svg width="15" height="15" aria-hidden="true"><use href="#i-arrow"/></svg></a></p>
      </div>
      <ul class="posts">${otros.map(tarjeta).join('')}
      </ul>
    </div>
  </section>

  <section class="section--sand">
    <div class="wrap" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:24px">
      <div style="display:flex;flex-direction:column;gap:10px;max-width:620px">
        <h2 style="font-size:clamp(26px,3vw,34px)">Pon a prueba a tu equipo esta semana.</h2>
        <p style="font-size:16px;line-height:1.65;color:var(--fg-body)">Una campaña de phishing real, gratis y sin compromiso, con su informe de resultados.</p>
      </div>
      <a class="btn btn--amber btn--lg" href="../index.html#contacto">Primera campaña gratis <svg width="16" height="16" aria-hidden="true"><use href="#i-arrow"/></svg></a>
    </div>
  </section>
</main>
${cierre}<script src="../assets/app.js" defer></script>
</body>
</html>
`;
};

/* --- Escritura ------------------------------------------------------------ */
fs.mkdirSync(OUT, { recursive: true });
for (const p of posts) {
  const file = path.join(OUT, `${p.slug}.html`);
  fs.writeFileSync(file, pagina(p));
  console.log(`${(fs.statSync(file).size / 1024).toFixed(1).padStart(7)} KB  ${file}`);
}

/* --- Sitemap -------------------------------------------------------------- */
const estaticas = [
  { loc: SITE + '/', prio: '1.0', freq: 'weekly' },
  { loc: SITE + '/nosotros.html', prio: '0.7', freq: 'monthly' },
  { loc: SITE + '/blog.html', prio: '0.8', freq: 'weekly' },
];
const urls = [
  ...estaticas.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.prio}</priority>\n  </url>`),
  ...posts.map((p) => {
    const f = iso(p.date);
    return `  <url>\n    <loc>${SITE}/${OUT}/${p.slug}.html</loc>${f ? `\n    <lastmod>${f}</lastmod>` : ''}\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`;
  }),
];
fs.writeFileSync('sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
console.log(`\nsitemap.xml: ${urls.length} URL, ninguna con parámetros`);
