(function () {
  'use strict';

  const config = window.KILLSTA_CONFIG || {};
  const games = window.KILLSTA_GAMES || [];
  const prefs = window.KILLSTA_PREFS;
  const strings = window.KILLSTA_STRINGS[prefs.lang];
  const CONSENT_KEY = 'killsta-consent';
  const GRANTED = 'granted';
  const DENIED = 'denied';

  const byId = (id) => document.getElementById(id);

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function link(href, text, className) {
    const node = el('a', className, text);
    node.href = href;
    return node;
  }

  function button(text, className) {
    const node = el('button', className, text);
    node.type = 'button';
    return node;
  }

  // ---- Shared menu and footer ----------------------------------------------

  function renderNav() {
    const nav = byId('nav');
    if (!nav) return;

    const brand = link('./', '', 'brand');
    const logo = el('img');
    logo.src = 'assets/favicon.svg';
    logo.alt = '';
    logo.width = 36;
    logo.height = 36;
    const name = el('span', '', 'KillSta ');
    name.appendChild(el('b', '', 'Games'));
    brand.append(logo, name);

    const links = el('div', 'nav__links');
    links.append(link('./#giochi', strings.navGames), link('support.html', strings.navSupport));

    const langs = el('div', 'switch');
    langs.setAttribute('role', 'group');
    langs.setAttribute('aria-label', strings.langGroup);
    prefs.langs.forEach((code) => {
      const choice = button(code.toUpperCase(), 'switch__item');
      choice.setAttribute('aria-pressed', String(code === prefs.lang));
      choice.addEventListener('click', () => {
        if (code !== prefs.lang) prefs.setLang(code);
      });
      langs.appendChild(choice);
    });

    const theme = button('', 'icon-button');
    const paintTheme = () => {
      const light = prefs.theme() === 'light';
      theme.textContent = light ? '🌙' : '☀️';
      theme.setAttribute('aria-label', light ? strings.themeToDark : strings.themeToLight);
      theme.title = theme.getAttribute('aria-label');
    };
    theme.addEventListener('click', () => {
      track('theme_change', { theme: prefs.toggleTheme() });
      paintTheme();
    });
    paintTheme();

    links.append(langs, theme);
    nav.append(brand, links);
  }

  function renderFooter() {
    const footer = byId('footer');
    if (!footer) return;

    const left = el('p', '', `© ${new Date().getFullYear()} KillSta Games · ${strings.footerFree}`);
    const right = el('p');
    const settings = button(strings.cookieSettings, 'link-button');
    settings.id = 'cookie-settings';
    settings.hidden = true;
    right.append(link('support.html', strings.navSupport), link('privacy.html', strings.privacy), settings);
    footer.append(left, right);
  }

  // ---- Consent -------------------------------------------------------------

  function setupConsent() {
    const usesGoogle = Boolean(config.gaMeasurementId || config.adsenseClientId);
    const stored = prefs.read(CONSENT_KEY);
    if (stored === GRANTED) startGoogleServices();
    if (!usesGoogle) return;

    const banner = el('div', 'cookie');
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', strings.cookieLabel);
    const text = el('p', '', strings.cookieText);
    text.appendChild(link('privacy.html', strings.cookieDetails));
    const actions = el('div', 'cookie__actions');
    const reject = button(strings.reject, 'button');
    const accept = button(strings.accept, 'button');
    actions.append(reject, accept);
    banner.append(text, actions);
    banner.hidden = stored !== null;
    document.body.appendChild(banner);

    accept.addEventListener('click', () => {
      prefs.write(CONSENT_KEY, GRANTED);
      banner.hidden = true;
      startGoogleServices();
    });
    reject.addEventListener('click', () => {
      const wasGranted = prefs.read(CONSENT_KEY) === GRANTED;
      prefs.write(CONSENT_KEY, DENIED);
      banner.hidden = true;
      // Google scripts already running can only be stopped by a reload.
      if (wasGranted) window.location.reload();
    });

    const reopen = byId('cookie-settings');
    if (reopen) {
      reopen.hidden = false;
      reopen.addEventListener('click', () => {
        banner.hidden = false;
      });
    }
  }

  // ---- Google Analytics and AdSense (only after consent) --------------------

  let googleStarted = false;

  function loadScript(src) {
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }

  function startGoogleServices() {
    if (googleStarted) return;
    googleStarted = true;

    if (config.gaMeasurementId) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', config.gaMeasurementId, { anonymize_ip: true });
      window.gtag('set', 'user_properties', { site_language: prefs.lang, site_theme: prefs.theme() });
      loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(config.gaMeasurementId));
    }

    const adSection = byId('ad-section');
    if (adSection && config.adsenseClientId && config.adsenseSlotId) {
      const unit = el('ins', 'adsbygoogle');
      unit.style.display = 'block';
      unit.dataset.adClient = config.adsenseClientId;
      unit.dataset.adSlot = config.adsenseSlotId;
      unit.dataset.adFormat = 'auto';
      unit.dataset.fullWidthResponsive = 'true';
      byId('ad-slot').appendChild(unit);
      adSection.hidden = false;
      loadScript(
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' +
          encodeURIComponent(config.adsenseClientId)
      );
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }

  function track(eventName, params) {
    if (typeof window.gtag === 'function') window.gtag('event', eventName, params);
  }

  // ---- Game catalogue ------------------------------------------------------

  // A catalogue text is either a plain string or one text per language.
  const localized = (value) => (value && typeof value === 'object' && !Array.isArray(value) ? value[prefs.lang] : value);

  const gamePageUrl = (game) => 'game.html?id=' + encodeURIComponent(game.id);

  function trackPlay(node, game) {
    node.addEventListener('click', () => track('play_game', { game_id: game.id, game_title: localized(game.title) }));
  }

  // A card opens the game's own page when it has one, otherwise the game itself.
  function gameCard(game) {
    const playable = Boolean(game.url);
    const details = game.details;
    const title = localized(game.title);
    const clickable = playable || Boolean(details);
    const card = el(
      clickable ? 'a' : 'div',
      'card' + (playable ? '' : ' card--soon') + (game.featured ? ' card--featured' : '')
    );
    if (details) card.href = gamePageUrl(game);
    else if (playable) {
      card.href = game.url;
      trackPlay(card, game);
    }

    const cover = el('div', 'card__cover');
    const [from, to] = game.colors || ['#475569', '#1e293b'];
    cover.style.background = `linear-gradient(135deg, ${from}, ${to})`;
    if (details && details.cover) {
      const picture = el('img', 'card__image');
      picture.src = details.cover;
      picture.alt = '';
      picture.loading = 'lazy';
      cover.appendChild(picture);
    } else {
      cover.appendChild(el('span', 'card__emoji', game.emoji));
    }
    cover.appendChild(el('span', 'card__badge', playable ? strings.free : strings.soon));
    if (game.featured) cover.appendChild(el('span', 'card__badge card__badge--left', strings.featured));
    card.appendChild(cover);

    const body = el('div', 'card__body');
    body.appendChild(el('h3', 'card__title', title));
    body.appendChild(el('p', 'card__text', localized(game.description)));
    const tags = el('ul', 'card__tags');
    (localized(game.tags) || []).forEach((tag) => tags.appendChild(el('li', '', tag)));
    body.appendChild(tags);
    body.appendChild(el('span', 'card__cta', details ? strings.discover : playable ? strings.play : strings.soonCta));
    card.appendChild(body);
    return card;
  }

  // ---- A game's own page (game.html?id=...) --------------------------------

  // "{email}" in a game text becomes the contact address from config.js.
  const fillEmail = (text) => text.replace('{email}', config.contactEmail || strings.noContact);

  function textSection(heading, tag, items) {
    if (!items || !items.length) return null;
    const section = el('section', 'game__section');
    section.appendChild(el('h2', '', heading));
    if (tag === 'p') items.forEach((text) => section.appendChild(el('p', '', fillEmail(text))));
    else {
      const list = el(tag, 'game__list');
      items.forEach((text) => list.appendChild(el('li', '', fillEmail(text))));
      section.appendChild(list);
    }
    return section;
  }

  function renderGamePage() {
    const page = byId('game-page');
    if (!page) return;

    const id = new URLSearchParams(window.location.search).get('id');
    const game = games.find((candidate) => candidate.id === id && candidate.details);
    page.appendChild(link('./#giochi', strings.backToGames, 'game__back'));
    if (!game) {
      page.appendChild(el('h1', '', strings.gameNotFound));
      return;
    }

    const details = game.details;
    const title = localized(game.title);
    document.title = `${title} — KillSta Games`;
    track('view_game', { game_id: game.id, game_title: title });

    page.appendChild(el('h1', '', title));
    page.appendChild(el('p', 'lead', localized(details.tagline) || localized(game.description)));

    const actions = el('div', 'game__actions');
    if (game.url) {
      const play = link(game.url, strings.playNow, 'button button--primary');
      trackPlay(play, game);
      actions.appendChild(play);
      // Games with a phone section are installable: #installa makes the game show its install box.
      if (details.phone) actions.appendChild(link(game.url + '#installa', strings.install, 'button'));
    }
    const coffee = el('a', 'button button--coffee');
    coffee.dataset.coffee = '';
    actions.appendChild(coffee);
    page.appendChild(actions);

    if (details.cover) {
      const cover = el('img', 'game__cover');
      cover.src = details.cover;
      cover.alt = title;
      page.appendChild(cover);
    }

    const facts = localized(details.facts);
    if (facts && facts.length) {
      const list = el('dl', 'facts');
      facts.forEach(([label, value]) => {
        const item = el('div');
        item.append(el('dt', '', label), el('dd', '', value));
        list.appendChild(item);
      });
      page.appendChild(list);
    }

    const sections = [textSection(strings.story, 'p', localized(details.story))];

    if (details.screenshots && details.screenshots.length) {
      const gallery = el('section', 'game__section');
      gallery.appendChild(el('h2', '', strings.gallery));
      const grid = el('div', 'gallery');
      details.screenshots.forEach((shot) => {
        const frame = link(shot.src, '', 'gallery__item');
        frame.target = '_blank';
        const picture = el('img');
        picture.src = shot.src;
        picture.alt = localized(shot.alt) || '';
        picture.loading = 'lazy';
        frame.appendChild(picture);
        grid.appendChild(frame);
      });
      gallery.appendChild(grid);
      sections.push(gallery);
    }

    sections.push(
      textSection(strings.chapters, 'ol', localized(details.chapters)),
      textSection(strings.howToPlay, 'ul', localized(details.howToPlay)),
      textSection(strings.phone, 'ul', localized(details.phone)),
      textSection(strings.notes, 'ul', localized(details.notes))
    );
    sections.filter(Boolean).forEach((section) => page.appendChild(section));
  }

  function renderGames() {
    const grid = byId('games');
    if (!grid) return;
    // Featured games first; the sort keeps the catalogue order otherwise.
    [...games]
      .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
      .forEach((game) => grid.appendChild(gameCard(game)));
    document.querySelectorAll('[data-game-count]').forEach((node) => {
      node.textContent = String(games.length);
    });
  }

  // ---- Support and contact -------------------------------------------------

  function setupSupport() {
    document.querySelectorAll('[data-coffee]').forEach((node) => {
      if (config.coffeeUrl) {
        node.href = config.coffeeUrl;
        node.target = '_blank';
        node.rel = 'noopener';
        node.textContent = strings.coffee;
        node.addEventListener('click', () => track('support_click', { method: 'coffee', page: location.pathname }));
      } else {
        node.remove(); // no donation page yet: show nothing rather than a dead button
      }
    });
  }

  function setupContact() {
    document.querySelectorAll('[data-contact-email]').forEach((node) => {
      node.textContent = config.contactEmail || strings.noContact;
    });
  }

  function setupTitle() {
    // The <title> tag is Italian; the English one sits in <html data-title-en>.
    const english = document.documentElement.dataset.titleEn;
    if (prefs.lang === 'en' && english) document.title = english;
  }

  setupTitle();
  renderNav();
  renderFooter();
  renderGames();
  renderGamePage();
  setupSupport();
  setupContact();
  setupConsent();
})();
