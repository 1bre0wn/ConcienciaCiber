# Desplegar la web en Vercel

La web es un sitio estático (`index.html` + `assets/`) con una función
serverless (`api/contact.js`) que envía el formulario por correo con Resend.

---

## Parte 1 — Resend (para que lleguen los correos)

1. Entra en **https://resend.com** y crea una cuenta.
   **Regístrate con el correo `eperez@legitec.com`** (importante, ver nota al final).
2. Dentro de Resend ve a **API Keys → Create API Key**. Copia la clave
   (empieza por `re_...`). La necesitarás en la Parte 2.
3. Para empezar no hace falta nada más: la función usa el remitente de
   pruebas `onboarding@resend.dev`.

## Parte 2 — Vercel (publicar la web)

1. Entra en **https://vercel.com** y crea una cuenta (puedes usar tu GitHub).
2. Sube esta carpeta a un repositorio de **GitHub** y en Vercel pulsa
   **Add New → Project → Import**.
   (Alternativa: instala la CLI con `npm i -g vercel` y ejecuta `vercel`
   dentro de la carpeta.)
3. Vercel detecta solo el sitio estático y la función `/api`. No toques la
   configuración de build.
4. Antes (o después) de desplegar, en **Settings → Environment Variables**
   añade:

   | Nombre             | Valor                                   | Obligatoria |
   |--------------------|-----------------------------------------|-------------|
   | `RESEND_API_KEY`   | la clave `re_...` de Resend              | Sí          |
   | `CONTACT_TO`       | `eperez@legitec.com`                     | No          |
   | `CONTACT_FROM`     | remitente verificado (ver abajo)         | No          |

5. Pulsa **Deploy**. Vercel te da una URL `xxxxx.vercel.app`.
   Después puedes conectar tu dominio en **Settings → Domains**.

## Parte 3 — Probar

Abre la web publicada, rellena el formulario y envíalo. Debe llegar un
correo a `eperez@legitec.com`.

---

## Notas importantes

- **En local no funciona el formulario.** Si abres `index.html` en el
  navegador directamente, `/api/contact` no existe. Solo funciona en Vercel
  (o ejecutando `vercel dev`).
- **Por qué registrarse en Resend con `eperez@legitec.com`:** mientras uses
  el remitente de pruebas `onboarding@resend.dev`, Resend solo permite
  enviar correos a la dirección con la que te registraste. Como el
  formulario envía precisamente a `eperez@legitec.com`, funciona sin más.
- **Para profesionalizarlo más adelante:** en Resend → **Domains**, verifica
  un dominio propio (p. ej. `legitec.com` o `legilearn.com`) añadiendo
  los registros DNS que te indiquen. Luego define la variable `CONTACT_FROM`
  con algo como `LegiLearn <web@legilearn.com>`. Así los correos
  saldrán desde tu dominio y podrás enviar a cualquier destinatario.

---

## Parte 4 — El blog se genera, no se edita a mano

Los artículos viven en `posts-data.js`. Cada vez que toques ese fichero hay
que regenerar las páginas:

```
node build-blog.mjs
```

Eso reescribe `blog/<slug>.html` (una página real por artículo, con su
título, su descripción, su imagen para redes y sus datos estructurados) y
vuelve a montar `sitemap.xml`. No edites los ficheros de `blog/` a mano: el
generador los sobrescribe.

`post.html` sólo queda para que los enlaces antiguos del tipo
`post.html?p=slug` sigan llevando al artículo correcto. No se indexa.

## Parte 5 — Dominios

- **web.legilearn.com** → esta web. Es el dominio que aparece en los
  canonical, en el sitemap y en los datos estructurados.
- **legilearn.com** → la plataforma. Es adonde apunta el botón *Acceder*.

Si algún día cambia, hay que tocar `SITE` en `build-blog.mjs` y buscar
`web.legilearn.com` en los HTML, en `robots.txt` y en `sitemap.xml`.

## Parte 6 — Cabeceras de seguridad

`vercel.json` define la Content-Security-Policy y el resto de cabeceras.
Dos avisos:

- La CSP autoriza los scripts en línea **por su hash**. Si cambias el
  `<script>` que hay dentro de cualquier `<head>`, o el de `post.html`, el
  hash deja de coincidir y el navegador bloqueará el script. Hay que
  recalcularlo (`sha256` del contenido, en base64) y actualizarlo.
- El único tercero permitido es `youtube-nocookie.com`, y sólo dentro de un
  iframe que no se carga hasta que alguien pulsa el vídeo. Tipografías,
  imágenes del blog y miniatura del vídeo se sirven desde el propio dominio,
  para no ceder la IP de cada visitante antes de que acepte nada.
