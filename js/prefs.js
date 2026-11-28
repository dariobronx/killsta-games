// Loaded in <head> so language and theme are applied before the page is drawn.
(function () {
  'use strict';

  const root = document.documentElement;
  const LANGS = ['it', 'en'];
  const THEMES = ['dark', 'light'];

  function read(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Storage blocked: the choice lasts for this page view only.
    }
  }

  let lang = read('killsta-lang');
  if (!LANGS.includes(lang)) {
    lang = (navigator.language || 'it').toLowerCase().startsWith('it') ? 'it' : 'en';
  }

  let theme = read('killsta-theme');
  if (!THEMES.includes(theme)) {
    theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  root.lang = lang;
  root.dataset.theme = theme;

  window.KILLSTA_PREFS = {
    lang,
    langs: LANGS,
    read,
    write,
    theme: () => root.dataset.theme,
    setLang(value) {
      write('killsta-lang', value);
      window.location.reload();
    },
    toggleTheme() {
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      write('killsta-theme', next);
      return next;
    },
  };
})();
