/* ==========================================================================
   LegiLearn — comportamiento de la página
   Tres cosas y nada más: menú móvil, aparición al hacer scroll y envío del
   formulario. Sin dependencias.
   ========================================================================== */
(() => {
  'use strict';

  /* --- Menú móvil ------------------------------------------------------- */
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');

  if (nav && toggle) {
    const setOpen = (open) => {
      nav.dataset.open = String(open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.sr-only').textContent = open ? 'Cerrar menú' : 'Abrir menú';
      toggle.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
    };

    toggle.addEventListener('click', () => setOpen(nav.dataset.open !== 'true'));

    // Cerrar al navegar a una sección o al pulsar Escape.
    nav.querySelectorAll('.nav__links a').forEach((link) =>
      link.addEventListener('click', () => setOpen(false))
    );
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.dataset.open === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* --- Aparición al hacer scroll ----------------------------------------
     Comprobación por posición en lugar de IntersectionObserver: es igual de
     barata para dos docenas de elementos y no depende de que el observador
     dispare, así que el contenido nunca se queda invisible. */
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  const quiet = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (quiet) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    let pending = reveals;
    let queued = false;

    const check = () => {
      queued = false;
      const limit = window.innerHeight - 60;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top > limit) return true;
        el.classList.add('is-in');
        return false;
      });
      if (!pending.length) {
        window.removeEventListener('scroll', request);
        window.removeEventListener('resize', request);
      }
    };

    const request = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(check);
    };

    const revealAll = () => {
      pending.forEach((el) => el.classList.add('is-in'));
      pending = [];
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    };

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    window.addEventListener('load', request);
    check();

    // Red de seguridad: si por lo que sea el scroll nunca llega (navegador
    // raro, lector automático, pestaña en segundo plano), el contenido
    // aparece igualmente. Nunca se queda una sección invisible.
    setTimeout(revealAll, 5000);
  }

  /* --- Reproductor de la píldora ----------------------------------------
     La carátula es un botón: hasta que no se pulsa no se carga nada de
     YouTube, así que la página no arrastra su peso ni sus cookies. */
  document.querySelectorAll('[data-video]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.video;
      const frame = document.createElement('iframe');
      frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      frame.title = 'Píldora formativa: cómo reconocer un correo de phishing';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.allowFullscreen = true;
      button.replaceChildren(frame);
      button.style.cursor = 'default';
      button.disabled = true;
    });
  });

  /* --- Formulario de contacto ------------------------------------------- */
  const form = document.getElementById('form-demo');

  if (form) {
    const status = form.querySelector('[data-status]');
    const button = form.querySelector('[data-submit]');
    const label = button.innerHTML;
    const abierto = Date.now();

    const say = (text, state) => {
      status.textContent = text;
      if (state) status.dataset.state = state;
      else status.removeAttribute('data-state');
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Validación nativa: enfoca el primer campo con problema.
      if (!form.checkValidity()) {
        const invalid = form.querySelector(':invalid');
        if (invalid) invalid.focus();
        say('Revisa los campos marcados antes de enviar.', 'error');
        return;
      }

      const data = Object.fromEntries(new FormData(form));

      // El consentimiento se envía y queda registrado en el correo: el RGPD
      // exige poder demostrar que se obtuvo, y con qué texto exactamente.
      const casilla = form.querySelector('[name="consent"]');
      data.consent = casilla.checked;
      data.consentText = form.querySelector('.consent span').textContent.trim();

      // Cuánto ha tardado en rellenarlo. Los robots envían al instante.
      data.elapsed = Date.now() - abierto;

      button.disabled = true;
      button.textContent = 'Enviando…';
      say('');

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          // El servidor explica qué ha pasado (formato, consentimiento,
          // demasiados intentos). Es más útil que un "algo ha fallado".
          const detalle = await response.json().catch(() => null);
          throw new Error(detalle && detalle.error ? detalle.error : '');
        }

        form.dataset.sent = 'true';
        form.querySelector('.form__done').focus?.();
      } catch (error) {
        button.disabled = false;
        button.innerHTML = label;
        say(
          error.message
            ? `${error.message} Si el problema sigue, escríbenos a eperez@legitec.com.`
            : 'No se pudo enviar. Vuelve a intentarlo o escríbenos a eperez@legitec.com.',
          'error'
        );
      }
    });
  }
})();
