/* ==========================================================================
   LegiLearn — composición del artículo (post.html)
   Lee WS_POSTS de posts-data.js y monta el artículo indicado en ?p=slug.
   ========================================================================== */
(() => {
  'use strict';

  const mount = document.getElementById('articulo');
  if (!mount || typeof WS_POSTS === 'undefined') return;

  const esc = (s) =>
    String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const slug = new URLSearchParams(location.search).get('p');
  const post = WS_POSTS.find((p) => p.slug === slug) || WS_POSTS[0];
  const related = WS_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  /* --- Cabecera del documento: título, meta y canonical del artículo ----- */
  document.title = `${post.title} | LegiLearn`;
  const set = (selector, attr, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  set('meta[name="description"]', 'content', post.excerpt);
  set('meta[property="og:title"]', 'content', post.title);
  set('meta[property="og:description"]', 'content', post.excerpt);
  set('meta[property="og:image"]', 'content', post.img);
  set('meta[name="twitter:title"]', 'content', post.title);
  set('meta[name="twitter:description"]', 'content', post.excerpt);
  set('meta[name="twitter:image"]', 'content', post.img);
  set('meta[property="og:type"]', 'content', 'article');
  const canonical = `https://www.legilearn.com/post.html?p=${post.slug}`;
  set('link[rel="canonical"]', 'href', canonical);
  set('meta[property="og:url"]', 'content', canonical);

  /* --- Datos estructurados del artículo --------------------------------- */
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.img,
    url: canonical,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'LegiLearn', url: 'https://www.legilearn.com/' },
    mainEntityOfPage: canonical,
  });
  document.head.appendChild(ld);

  /* --- Composición ------------------------------------------------------- */
  const card = (p) => `
    <li><article class="card card--hover post-card">
      <a class="post-card__cover" href="post.html?p=${esc(p.slug)}">
        <img src="${esc(p.img)}" alt="" loading="lazy" decoding="async">
      </a>
      <div class="post-card__body">
        <p class="post-meta"><span class="post-cat">${esc(p.cat)}</span><span>${esc(p.date)}</span><span>${p.read} min</span></p>
        <h3><a href="post.html?p=${esc(p.slug)}">${esc(p.title)}</a></h3>
        <p>${esc(p.excerpt)}</p>
      </div>
    </article></li>`;

  mount.innerHTML = `
    <section class="page-hero">
      <div class="wrap" style="max-width:900px">
        <p class="post-meta" style="color:rgba(245,245,245,.6);margin-bottom:20px">
          <a href="blog.html" style="color:var(--amber)">Blog</a>
          <span>·</span><span>${esc(post.cat)}</span>
          <span>·</span><span>${esc(post.date)}</span>
          <span>·</span><span>${post.read} min de lectura</span>
        </p>
        <h1>${esc(post.title)}</h1>
        <p class="page-hero__lead">${esc(post.excerpt)}</p>
        <p class="page-hero__lead" style="margin-top:20px;font-size:14px">${esc(post.author)}</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="article">
          <figure class="article__cover">
            <img src="${esc(post.img)}" alt="" fetchpriority="high" decoding="async">
          </figure>
          <div class="prose">${post.body}</div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="wrap">
        <div class="head">
          <div class="head__title">
            <p class="eyebrow">Seguir leyendo</p>
            <h2>Otros artículos del blog.</h2>
          </div>
          <p class="head__lead"><a class="btn btn--ghost" href="blog.html">Ver todos <svg width="15" height="15" aria-hidden="true"><use href="#i-arrow"/></svg></a></p>
        </div>
        <ul class="posts">${related.map(card).join('')}</ul>
      </div>
    </section>`;

  // Las tablas anchas necesitan poder desplazarse en móvil.
  mount.querySelectorAll('.prose table').forEach((table) => {
    const box = document.createElement('div');
    box.className = 'table-scroll';
    table.parentNode.insertBefore(box, table);
    box.appendChild(table);
  });
})();
