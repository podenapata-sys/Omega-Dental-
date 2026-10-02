# RULES — for anyone (human or AI) changing this repo

> Read this before changing anything. Each rule exists because breaking it has already cost
> something, or would on a live clinic site with real patients booking. Reasons are in
> `MEMORY.md` (decisions log).

## 0. The three that matter most

1. **`main` is live** (but see `MEMORY.md` → Current state: as of 2026-10-02 Pages serves the
   working branch instead, so a push there is live too). A push to the live branch is on
   omegadentalbd.com in about a minute. Work on a
   branch; the owner reviews and merges.
2. **The repo is public and fully deployed.** Every file, including these `.md` files, is served
   on the domain. Never commit a secret, password, token value or personal data.
3. **Never invent facts about the clinic.** No made-up reviews, ratings, patient counts, years
   of experience, doctor credentials or prices. Missing data renders as absent, not as a guess.

## 1. Stack — allowed and not allowed

| Allowed | Not allowed |
|---|---|
| Plain HTML, the one `assets/styles.css`, vanilla JS | Frameworks (React, Vue, Tailwind build, jQuery) |
| Node or Python scripts in `tools/`, run by hand, no dependencies beyond what's already used (Pillow, segno) | npm packages, lock files, a build step the site needs to run |
| Firebase Spark features already in use | Anything that needs a paid plan (Blaze, Cloud Functions, Storage on new buckets) |
| Google Apps Script for server-side jobs | A new server, VPS or paid SaaS |
| Google Fonts (Sora, Inter) + local Bangla woff2 | **Any new third-party runtime script** (CDN libraries, widgets, trackers, chat bubbles) |

Third-party scripts are banned because one stalled CDN request blanked the homepage for the
owner. If a feature needs a library, vendor a pinned copy into `assets/vendor/` — and ask first.

## 2. Content and language

- Editable content lives in **`assets/content.js`** only. It is data — the content editor
  rewrites it — so no logic in it, and keep it valid for the editor's JSON round-trip.
- **Every visible string exists in English and Bangla.** Add both or neither.
  - `index.html`, `book.html`: `data-i18n="key"` + an entry in both languages of `I18N` in `app.js`.
  - Other pages: `data-en` and `data-bn` on the element.
- `applyI18n()` and the inline `setLang()` replace `textContent`. **Never nest links or markup
  inside an element that carries a translation attribute** — they will be destroyed. Make them
  siblings, or (index/book only) use `data-i18n-html` with the markup in both I18N strings.
- Default language is **English**. Change it only with `node tools/bake-lang.js en|bn`, never
  by hand.
- Booking links use `book.html?service=<exact price name or service slug>`. Anything else lands
  on an empty dropdown.

## 3. Works without JavaScript

- Key content is baked into the HTML (`tools/bake-*.js`). After changing gallery, doctors or
  default text, re-run the matching bake script.
- Anything that could be wrong without JS (open-now badge, live counts) ships `hidden` and is
  revealed by JS. Remember `[hidden]` loses to `display:flex/inline-flex` — add
  `.thing[hidden]{display:none}`.

## 4. Generators

- **`tools/gen-services.js` must not be run with `--force`** unless you have diffed its output
  against all 14 committed pages. Twelve are hand-edited and it would also shrink `sitemap.xml`.
  Patch service pages in place and mirror the change in the generator.
- `resolveService()`/`SERVICE_DEFAULT` in `app.js` and the copy in `gen-services.js` must stay
  identical.

## 5. Firebase and security

- **Firestore rules:** edit in the Firebase Console first, then copy to `firestore.rules`.
  `service` and `time` are reserved words in the rules language: write `d['service']`,
  `d['time']`, never `d.service`.
- **App Check enforcement stays OFF.** The Apps Script sweep can't carry App Check tokens, and
  enforcing early would reject real bookings silently.
- **No enforcing Content-Security-Policy** until the written rollout is followed; a meta CSP
  can't run report-only and a wrong `connect-src` breaks booking and sign-in without errors
  anyone sees.
- **Secrets never go in the repo.** GitHub token, Firebase login and API keys belong in Apps
  Script **Script Properties**. `OMEGA_ALERT_TOKEN` is a known exposure — rotate it, don't
  copy it anywhere else.
- Owner lists use **UIDs, not email addresses** (the config file is public).
- Don't remove the Apps Script account's UID from the owner list: reminders and the sweep stop.
- Keep the frame-buster on `dashboard.html` and `admin-content.html`.

## 6. Domain

- **Do not touch DNS, nameservers or `CNAME` from code.** Nameservers stay on
  **Namecheap BasicDNS**; "Custom DNS" took the site down on 28 Sep 2026.
- To change the domain, use `tools/set-domain.js`, then update Namecheap and GitHub Pages
  settings by hand.

## 7. Photos and medical content

- Doctor photos: crop, resize, compress only. **No generative or AI editing of real faces.**
- Before/after images that are not this clinic's patients stay labelled **illustrative**.
- Stock photos only from licence-safe sources (see `IMAGES_GUIDE.md`); sizes and names follow
  the slots in `DESIGN.md`.
- Health claims stay general; the medical disclaimer stays linked in every footer.

## 8. Code style

- Match the file you're in: 2-space indent, `const`/`let`, small named functions, no classes
  unless the file already uses them.
- Use the CSS tokens in `:root`; don't add new hard-coded colours.
- Comments only for a non-obvious *why*. No commented-out code.
- Errors on the public site must never blank the page: wrap optional features so a failure
  leaves the rest working, and fail quietly for the patient. The booking save swallows errors
  on purpose — the WhatsApp route and the sweep are the fallback.

## 9. Before every push

- [ ] Both languages checked on every page you touched.
- [ ] Page still reads with JavaScript disabled.
- [ ] No horizontal scroll from 320px to 1440px.
- [ ] No console errors.
- [ ] Every link and `?service=` value resolves.
- [ ] Cache-buster (`?v=YYYYMMDDx`) bumped on changed CSS/JS.
- [ ] `git diff --stat` shows only files you meant to change.
- [ ] No secret values or personal data in the diff.
- [ ] `MEMORY.md` updated with what changed and why.
- [ ] Pushed to a branch, not `main`.
