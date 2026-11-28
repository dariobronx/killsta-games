// The game catalogue. To add a game, copy one block and edit it.
// Texts come in two languages: it (Italian) and en (English).
// url: public address of the game. Empty ('') shows the card as "In arrivo".
// colors: the two colours of the card cover.
window.KILLSTA_GAMES = [
  {
    id: 'avventure-di-fili',
    title: { it: 'Le avventure di Fili', en: 'The Adventures of Fili' },
    description: {
      it: 'Tre avventure punta e clicca: il faro, l\'isola Maya e il villaggio di Natale.',
      en: 'Three point-and-click adventures: the lighthouse, Maya island and the Christmas village.',
    },
    emoji: '🗺️',
    tags: { it: ['Avventura', 'Famiglia'], en: ['Adventure', 'Family'] },
    colors: ['#f59e0b', '#b45309'],
    url: '',
  },
  {
    id: 'astro-fili',
    title: { it: 'Astro Fili', en: 'Astro Fili' },
    description: {
      it: 'Invasione delle verdure spaziali: spara a broccoli e carote con il tuo razzo, da soli o in due.',
      en: 'Space vegetables are invading: blast broccoli and carrots from your rocket, alone or with a friend.',
    },
    emoji: '🚀',
    tags: { it: ['Sparatutto', '1-2 giocatori'], en: ['Shooter', '1-2 players'] },
    colors: ['#6366f1', '#312e81'],
    url: '',
  },
  {
    id: 'marble',
    title: { it: 'Marble', en: 'Marble' },
    description: {
      it: 'Biglie su pista in 3D: precisione, fisica e un labirinto dentro una sfera trasparente.',
      en: 'Marbles on a 3D track: precision, physics and a maze inside a transparent sphere.',
    },
    emoji: '🔮',
    tags: { it: ['Abilità', '3D'], en: ['Skill', '3D'] },
    colors: ['#06b6d4', '#155e75'],
    url: '',
  },
  {
    id: 'fuga-dall-ufficio',
    title: { it: 'Fuga dall\'ufficio', en: 'Escape from the Office' },
    description: {
      it: 'Scoppia un incendio al quarto piano: trova un\'altra via d\'uscita. Tre atti, due finali.',
      en: 'A fire breaks out on the fourth floor: find another way out. Three acts, two endings.',
    },
    emoji: '🔥',
    tags: { it: ['Avventura', 'Enigmi'], en: ['Adventure', 'Puzzles'] },
    colors: ['#ef4444', '#7f1d1d'],
    url: '',
  },
  {
    id: 'giallo-di-san-giorgio',
    title: { it: 'DEM e il giallo di San Giorgio', en: 'DEM and the San Giorgio Mystery' },
    description: {
      it: 'Un delitto, una reliquia rubata e un drago come testimone: indaga punto per punto.',
      en: 'A murder, a stolen relic and a dragon as the key witness: investigate clue by clue.',
    },
    emoji: '🐉',
    tags: { it: ['Avventura', 'Giallo'], en: ['Adventure', 'Mystery'] },
    colors: ['#10b981', '#064e3b'],
    url: 'games/giallo-di-san-giorgio/',
    featured: true, // shown first and larger on the home page
    // "details" gives the game its own page (game.html?id=...). Every part is optional.
    details: {
      cover: 'assets/games/giallo-di-san-giorgio/square.jpg',
      tagline: {
        it: 'Un giallo che mette insieme presente, passato e due pizzichi di fantasia.',
        en: 'A mystery that blends present, past and two pinches of fantasy.',
      },
      facts: {
        it: [
          ['Genere', 'Avventura punta e clicca'],
          ['Giocatori', '1'],
          ['Si gioca con', 'Mouse o dito: computer, telefono, tablet'],
          ['Lingua del gioco', 'Italiano'],
        ],
        en: [
          ['Genre', 'Point-and-click adventure'],
          ['Players', '1'],
          ['Played with', 'Mouse or finger: computer, phone, tablet'],
          ['Game language', 'Italian only'],
        ],
      },
      story: {
        it: [
          'È il 23 aprile, festa di San Giorgio, a Pagnano di Merate. Le campane suonano la fine della messa delle otto e, come sempre, mezza piazza attraversa la strada per il caffè al bar.',
          'Ma quella mattina il barista viene trovato morto, e dalla chiesa è sparita la reliquia del santo. Tocca a DEM, il Don del paese, capire chi è stato: interrogando i compaesani, raccogliendo indizi e mettendo in fila chi era dove.',
          'Tra i testimoni ce n\'è uno che nessuno si aspetta: il drago della leggenda di San Giorgio.',
        ],
        en: [
          'It is 23 April, the feast of San Giorgio, in the village of Pagnano di Merate. The bells ring the end of the eight o\'clock mass and, as always, half the square crosses the road for a coffee at the bar.',
          'But that morning the barman is found dead, and the saint\'s relic has vanished from the church. It falls to DEM, the village priest, to work out who did it: questioning the villagers, collecting clues and piecing together who was where.',
          'Among the witnesses there is one nobody expects: the dragon from the legend of San Giorgio.',
        ],
      },
      chapters: {
        it: ['Un caffè troppo amaro', 'La scena del delitto', 'Chi era dove alle sei', 'La Scaglia del drago'],
        en: ['A coffee too bitter', 'The crime scene', 'Who was where at six', 'The dragon\'s Scale'],
      },
      howToPlay: {
        it: [
          'Clicca (o tocca, su telefono) la scena per camminare.',
          'Scegli un\'azione (Guarda, Prendi, Usa, Parla) e poi clicca una cosa o una persona.',
          'Il tasto destro del mouse guarda da vicino; su telefono usa "Guarda".',
          '"Aiuto" ti dà un suggerimento, "Cose" mostra tutto ciò che si può cliccare.',
          'La partita si salva da sola nel tuo browser: puoi chiudere e riprendere quando vuoi.',
        ],
        en: [
          'Click (or tap, on a phone) the scene to walk.',
          'Pick an action (Guarda = look, Prendi = take, Usa = use, Parla = talk), then click a thing or a person.',
          'The right mouse button takes a closer look; on a phone use "Guarda".',
          '"Aiuto" gives you a hint, "Cose" shows everything you can click.',
          'The game saves itself in your browser: close it and pick it up again whenever you like.',
        ],
      },
      phone: {
        it: [
          'Funziona anche su telefono e tablet: si gioca toccando lo schermo, meglio tenendolo in orizzontale.',
          'Si può installare come app direttamente dal sito, senza negozi di app e senza costi. Una volta installato funziona anche senza internet.',
          'Come si installa: apri il gioco dal browser e scegli "Installa app" oppure "Aggiungi alla schermata Home".',
          'Qualcosa non va sul tuo dispositivo? Scrivimi a {email}: così posso sistemarlo. Grazie per l\'aiuto!',
        ],
        en: [
          'It also works on phones and tablets: you play by tapping the screen, best held sideways.',
          'It can be installed as an app straight from the site, with no app store and no cost. Once installed it also works without internet.',
          'How to install: open the game in your browser and choose "Install app" or "Add to Home Screen".',
          'Something not working on your device? Write to me at {email} so I can fix it. Thank you for helping!',
        ],
      },
      notes: {
        it: [
          'I luoghi sono angoli veri di un paese della Brianza: la piazza con la chiesa di San Giorgio e il campanile, la scuola, la fontana, l\'oratorio.',
          'Il delitto, la vittima e il colpevole sono inventati.',
          'Disegni, musica e suoni sono creati dal gioco stesso: non scarica nulla e non invia nulla.',
        ],
        en: [
          'The places are real corners of a village in Brianza: the square with the church of San Giorgio and its bell tower, the school, the fountain, the parish youth club.',
          'The crime, the victim and the culprit are invented.',
          'Drawings, music and sounds are created by the game itself: it downloads nothing and sends nothing.',
        ],
      },
      screenshots: [
        {
          src: 'assets/games/giallo-di-san-giorgio/square.jpg',
          alt: { it: 'La piazza di Pagnano dopo la messa, con la chiesa, la pizzeria e il bar', en: 'The square of Pagnano after mass, with the church, the pizzeria and the bar' },
        },
        {
          src: 'assets/games/giallo-di-san-giorgio/chapter.jpg',
          alt: { it: 'L\'apertura del primo capitolo, "Un caffè troppo amaro"', en: 'The opening of chapter one, "A coffee too bitter"' },
        },
        {
          src: 'assets/games/giallo-di-san-giorgio/title.jpg',
          alt: { it: 'La schermata iniziale, il paese di notte', en: 'The title screen, the village at night' },
        },
      ],
    },
  },
];
