# natarajmalavade.in

Official website of Nataraj Malavade: the hub that links to every course, channel, tool and book.
Built with [Astro](https://astro.build) and deployed to GitHub Pages by GitHub Actions.

## Run it on your Mac

```bash
npm install        # first time only
npm run dev        # live preview at http://localhost:4321 (updates as you save)
npm run build      # production build into dist/
```

## Where things live

```
src/
  data/
    site.ts        ← name, stats, contact details, header menu, analytics ID
    links.ts       ← EVERY link on the site + its short links (edit this most)
  pages/           ← one file = one page on the website
    index.astro          → /
    tools.astro          → /tools.html        (financial calculators)
    contact.astro        → /contact.html
    privacy-policy.md    → /privacy-policy.html   (plain Markdown)
    terms-of-use.md      → /terms-of-use.html
    refund-policy.md     → /refund-policy.html
    [slug].astro         → short links like /youtube, /courses (generated from links.ts)
    404.astro            → "page not found"
    sitemap.xml.ts       → /sitemap.xml
  layouts/
    BaseLayout.astro     ← <head>, analytics, header and footer for every page
    PageLayout.astro     ← title band + text column (used by Markdown pages)
  components/            ← header, footer, cards, icons
  styles/
    global.css           ← design system: colours, fonts, buttons, cards
    calculators.css      ← calculator-only styles
public/                  ← copied as-is: images, favicon, CNAME, calculators.js
```

## Common tasks

**Change a link, add a course or channel** → edit `src/data/links.ts`.
Every entry appears as a card in its `group` section on the home page.

**Add a short link** → add a name to that entry's `short: [...]` list.
`short: ['youtube', 'yt']` makes `natarajmalavade.in/youtube` and `/yt` both redirect there.
Each short-link visit is recorded in Google Analytics as a `short_link` event.

**Add a new page**
- Text page: create `src/pages/my-page.md` with this front-matter:
  ```md
  ---
  layout: ../layouts/PageLayout.astro
  title: My Page
  description: One line for Google.
  ---
  Your content in Markdown…
  ```
- Custom page: copy `src/pages/contact.astro` and change it.
- Then add it to `nav` in `src/data/site.ts` (header menu) and to `src/pages/sitemap.xml.ts`.

## Current short links

| Short link | Goes to |
|---|---|
| `/youtube` `/yt` `/kannada` | YouTube — Kannada (subscribe) |
| `/trading-channel` `/english` `/yt-english` | YouTube — Trading (English) |
| `/growguru` `/community` `/investing` | growguru.in (community) |
| `/trading` `/courses` | trading.natarajmalavade.in |
| `/blog` | blog.natarajmalavade.in |
| `/calculators` `/calc` `/sip` | Financial calculators |
| `/whatsapp` `/channel` | WhatsApp channel |
| `/business` `/collab` | WhatsApp business chat |
| `/instagram` `/ig` · `/facebook` `/fb` · `/twitter` `/x` | Social profiles |
| `/books` · `/book-day-trading` · `/book-price-action` | Books |

## Deployment

Every push to `main` builds the site and publishes it through `.github/workflows/deploy.yml`.
This needs one setting in GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The custom domain comes from `public/CNAME`.
