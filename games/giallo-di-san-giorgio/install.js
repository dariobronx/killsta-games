// Packaged game only: when the page is opened with #installa (the site's "download" button),
// show a small box that points to the game's own "↓ Installa" button (js/engine.js does the install).
// This file only listens to 'beforeinstallprompt' to know the button is there; it never holds or uses the event.
(function () {
  if (location.hash !== '#installa') return;
  if (matchMedia('(display-mode: standalone)').matches || navigator.standalone) return; // already an app

  const box = document.createElement('div');
  box.style.cssText = 'position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:99;'
    + 'background:#2a1a10;color:#fbe9c9;border:2px solid #e0a64b;border-radius:14px;padding:14px 30px 14px 18px;'
    + 'font:17px/1.4 system-ui,sans-serif;max-width:90vw;text-align:center;box-shadow:0 6px 20px #000a';
  const text = document.createElement('div');
  const close = document.createElement('button');
  close.textContent = '✕';
  close.setAttribute('aria-label', 'Chiudi');
  close.style.cssText = 'position:absolute;top:4px;right:8px;background:none;border:0;color:#fbe9c9;font-size:18px;cursor:pointer';
  close.onclick = () => box.remove();
  box.append(close, text);
  document.body.appendChild(box);

  const say = (message) => { text.textContent = message; };
  const useButton = 'Per installare il gioco come app tocca «↓ Installa» qui sopra. Poi lo trovi tra le tue app e funziona anche senza internet.';
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (ios) { say(useButton); return; } // the game shows its iPhone/iPad button and tip without any browser event

  say('Preparo l’installazione…');
  let offered = false;
  window.addEventListener('beforeinstallprompt', () => { offered = true; say(useButton); });
  window.addEventListener('appinstalled', () => say('Installato! Lo trovi tra le tue app. Buon divertimento!'));
  setTimeout(() => {
    if (!offered) say('Per installare il gioco apri il menu del browser (⋮ o ⋯) e scegli «Installa app» oppure «Aggiungi a schermata Home».');
  }, 4000);
})();
