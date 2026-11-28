# KillSta Games

> [!summary]
> **What:** the home page of KillSta Games: a showcase with one card per game, a "buy me a coffee" button, an advertising space and Google visit statistics.
> **Impact:** works locally today. Coffee, advertising and statistics are built but switched off until their codes are pasted into `js/config.js`. Nothing is sent to Google before the visitor accepts cookies.
> **Open points:** the site is online at https://dariobronx.github.io/killsta-games/ and "DEM e il giallo di San Giorgio" is playable. The Ko-fi, Google Analytics and Google AdSense accounts are still to be created. The privacy page is a plain template, not legal advice.
> **Next step:** decide where to publish the site and the games; then fill in `js/config.js` and the `url` of each game in `js/games.js`.

## Preview on this computer

```powershell
node scripts/serve.js
```

Then open http://localhost:4780.

## Everyday changes

| I want to... | File | What to do |
|---|---|---|
| Add a game | `js/games.js` | Copy one block, change title, text (Italian and English), emoji, colours |
| Change the support page | `support.html` | Edit both blocks: `data-lang="it"` and `data-lang="en"` |
| Change a menu or button word | `js/strings.js` | Edit the word in both languages |
| Change the colours | `css/style.css` | Dark theme at the top, light theme right below |
| Make a game playable | `js/games.js` | Put its public address in `url` |
| Switch on the coffee button | `js/config.js` | Paste the Ko-fi (or similar) page in `coffeeUrl` |
| Switch on statistics | `js/config.js` | Paste the Analytics ID (`G-...`) in `gaMeasurementId` |
| Switch on advertising | `js/config.js` + `ads.txt` | Paste the AdSense IDs; put the publisher ID in `ads.txt` |
| Show a contact on the privacy page | `js/config.js` | Fill `contactEmail` |

## A page for a single game

A game gets its own page (`game.html?id=<id>`) when its block in `js/games.js` has a `details` part: cover picture, tagline, facts, story, chapters, how to play, notes, screenshots. Every part is optional and comes in Italian and English. Pictures go in `assets/games/<id>/`. The card on the home page then opens that page instead of the game. Example: `giallo-di-san-giorgio`.

## What Google needs before it approves advertising

- The site online on its own address, with real content (playable games).
- A privacy page: `privacy.html` (done).
- A cookie consent banner: built in, it appears as soon as an Analytics or AdSense ID is set.
- The `ads.txt` file at the root of the site (done, to complete with the publisher ID).

## What is measured (after consent only)

- Visits and pages viewed (standard Google Analytics).
- `play_game`: which game card was opened.
- `support_click`: clicks on the coffee button.

## Games left out on purpose

- **smks** (kart game): it uses names and characters of a well-known commercial game. Publishing it next to donations and advertising is a legal risk; rename and redraw first.
- **Tank** and **Fili Bros**: both are close to classic commercial games; check names and looks before listing them.

## Languages and themes

- Two languages, Italian and English, chosen with the IT / EN switch in the menu. First visit: Italian for Italian browsers, English for everyone else.
- Two themes, dark and light, chosen with the sun / moon button. First visit: the theme of the visitor's device.
- Both choices are remembered in the visitor's browser only.

## Q&A

- **How does the site say that ads are voluntary without breaking Google's rules?** It states a fact: ads appear only if the visitor accepts cookies, and declining changes nothing in the games. It never asks anyone to watch or click an ad.

- **Why is there no "watch an ad to support me" button?** Google AdSense forbids asking visitors to view or click ads, including "support us" wording; breaking this gets the account closed. The ad space is therefore only labelled "Pubblicità". Ads the player chooses to watch (rewarded ads) exist only inside games, through a separate Google programme for approved sites.
- **What is `ads.txt`?** A small text file that tells advertisers which accounts may sell ads on the site. Without it AdSense shows a warning and may earn less.
- **What is a measurement ID?** The code (`G-...`) that links the page to your Google Analytics property, so visits land in your reports.
