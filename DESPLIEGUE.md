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
  un dominio propio (p. ej. `legitec.com` o `concienciaciber.com`) añadiendo
  los registros DNS que te indiquen. Luego define la variable `CONTACT_FROM`
  con algo como `ConcienciaCiber <web@concienciaciber.com>`. Así los correos
  saldrán desde tu dominio y podrás enviar a cualquier destinatario.
