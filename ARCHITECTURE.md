# ARCHITECTURE — Omega Dental website

> How the site is built and how its parts connect. Verified against the code on 29 Sep 2026.
> If you change the structure, update this file in the same commit.
>
> Public file. Configuration values are referred to by **name** only.

## 1. Stack at a glance

| Layer | Technology | Cost |
|---|---|---|
| Pages | Static HTML + one stylesheet + vanilla JS. No framework, no npm, no build step | — |
| Hosting | GitHub Pages, deployed by `.github/workflows/pages.yml` on push to `main` | ৳0 |
| Domain | `omegadentalbd.com` (Namecheap), `CNAME` file in repo root | yearly renewal |
| Database / auth | Firebase Spark: Firestore, Authentication (email/password), App Check (reCAPTCHA v3) | ৳0 |
| Server-side jobs | Google Apps Script web app: booking alerts, sweep, reminders, publishing | ৳0 |
| Fonts | Google Fonts (Sora, Inter) + local woff2 (Kalpurush, Noto Sans Bengali) | ৳0 |

There is **no third-party runtime JavaScript** on the public pages. The dashboard additionally
loads Google Sign-In (for Drive backup) and a vendored `assets/vendor/xlsx.full.min.js`.

## 2. Folder structure

```
/                       9 root pages
  index.html            homepage (data-i18n system)
  book.html             booking form (data-i18n system)
  treatments.html  careers.html  privacy-policy.html  terms.html  medical-disclaimer.html
  dashboard.html        private: records, bookings, payments  (noindex)
  admin-content.html    private: content editor              (noindex)
  CNAME  robots.txt  sitemap.xml  firestore.rules
services/               14 treatment pages (data-en/data-bn system)
blog/                   index + 5 articles
gallery/                index.html
assets/
  content.js            ALL editable content → window.OMEGA_CONTENT
  app.js                homepage/booking logic, I18N table, contact constants, HOURS
  booking-cloud.js      Firebase init, App Check, omegaSaveBooking(), live site/stats
  firebase-config.js    public config globals (see §8)
  service-content.js    re-prices service pages from content.js
  admin-gate.js         3 quick taps on the footer logo → dashboard
  brand-highlight.js    styles the clinic name inside running text
  legal.js              footer legal links, disclaimer line, cookie banner (data-lg)
  styles.css            the only stylesheet for public pages
  fonts/  services/  ba/  doctors/  vendor/
tools/                  generators, bake scripts, Apps Script sources (run by hand)
.github/workflows/pages.yml
```

30 HTML files; 28 public.

## 3. Content model

`assets/content.js` is a plain `<script>` that sets `window.OMEGA_CONTENT`. It must load
**before** `app.js`, which reads it synchronously.

| Key | Count | Used by |
|---|---|---|
| `cats` | 10 | price table grouping |
| `prices` | 45 (`c, n, nb, note, noteb, min, max`, optional `slug`) | price table, calculator, booking dropdown, service pages |
| `services` | 15 (+11 sub-items) | homepage grid, service pages |
| `photos` | 86 | service imagery |
| `gallery` / `galleryCats` | 53 / 11 | gallery page |
| `doctors` | 1 | doctor card + Physician JSON-LD |

The content editor rewrites this file. It is data, not code: never add logic to it.

**Service ↔ price link.** Booking dropdown option values are price names (`p.n`). Links use
`book.html?service=<value>`; `resolveService()` in `app.js` accepts an exact price name or a
service slug (first priced row with that slug, with an override map `SERVICE_DEFAULT` for
`extractions`). `tools/gen-services.js` carries the same logic.

## 4. Languages

Two mechanisms, one preference key: **`omega_lang`** in localStorage. Default **English**.

| Where | Markup | Strings live in |
|---|---|---|
| `index.html`, `book.html` | `data-i18n`, `data-i18n-html`, `data-i18n-ph` | `I18N` table in `assets/app.js` |
| all other pages | `data-en` + `data-bn` on the element | the element itself; inline `setLang()` |
| footer legal strings | `data-lg` | `STR` table in `assets/legal.js` |

The default-language text is **baked into the HTML** so no-JS visitors and link-preview crawlers
see real content. `node tools/bake-lang.js en|bn` flips the default across every page.

## 5. Booking flow

```
book.html form ──submitBooking()── app.js
      │
      ├─► WhatsApp link (wa.me, pre-filled)          patient's optional fast route
      │
      ├─► omegaSaveBooking()  booking-cloud.js ──► Firestore  bookings/{id}
      │        (App Check token attached)              status:"new", source:"website"
      │
      └─► sendBeacon(OMEGA_ALERT_URL) ──► Apps Script doPost (booking-alert.gs)
                                              ├─► Google Sheet row
                                              └─► email to clinic

Every 5 min: sweepBookings()  (Apps Script)
      reads new bookings from Firestore over REST → emails any the beacon missed
      (dedupe fingerprint = phone digits + minute in Dhaka time; last 100 kept)
```

The homepage callback form uses the same path with `kind:"callback"`.
Tests for the sweep: `node tools/booking-sweep.test.js`.

## 6. Firestore

`firestore.rules` is a **record** of the rules published in the Firebase Console; edit the
console first, then copy here.

| Path | Read | Write |
|---|---|---|
| `bookings/{id}` | owner | public **create only**, if `validBooking()` passes (allowed keys, sizes, `status=='new'`, `source=='website'`, `createdAt==request.time`). No update/delete |
| `records/{id}` | owner | owner |
| `site/{doc}` (e.g. `site/stats`) | public | owner |
| anything else | denied | denied |

`isOwner()` = signed in and UID in the owner list. One of those UIDs is the Apps Script
account; removing it silently stops reminders and the sweep.

## 7. Clinic tools

- **Dashboard** — Firebase sign-in; client-side owner check against `OMEGA_OWNER_UIDS` (display
  gate only; the rules are the real protection); optional PIN screen-lock; reads latest bookings,
  two-way syncs `records` with a localStorage cache; read-only when signed out or offline.
- **Content editor** — edits `content.js` and images, then POSTs `{action:"publish", idToken,
  files}` to the Apps Script. `tools/publish.gs` verifies the Firebase ID token, checks a path
  allowlist (`assets/content.js`, service and doctor images; max 60 files) and makes **one commit
  to `main`** with a GitHub token stored in Script Properties. Pages redeploys in ~1 minute.
- **Reminder** — `tools/appointment-reminder.gs`, daily trigger set by hand (7–8 pm), emails
  tomorrow's list with WhatsApp buttons. It reads the Next Appointment date on dashboard
  `records`, so it only sees records synced to the cloud.
- **Admin gate** — 3 taps within 1.6 s on the **footer** logo (`TAPS_NEEDED` in `admin-gate.js`).
- Both admin pages carry a frame-buster (Pages cannot send `X-Frame-Options`).

## 8. Configuration (names only)

`assets/firebase-config.js` (public by design): `OMEGA_FB` (Firebase web config),
`OMEGA_APPCHECK_KEY`, `OMEGA_OWNER_UIDS`, `OMEGA_GOOGLE_CLIENT_ID`, `OMEGA_ALERT_URL`,
`OMEGA_ALERT_TOKEN`.

Apps Script **Script Properties** (never in the repo): `GITHUB_TOKEN`, `FB_API_KEY`, `FB_EMAIL`,
`FB_PASSWORD`, `BOOKINGS_SHEET_ID`, sweep state.

Known weakness: `OMEGA_ALERT_TOKEN` is readable in page source and matches `SHARED_TOKEN`
hard-coded in `tools/booking-alert.gs`. It only filters casual spam; see `TASKS.md`.

## 9. tools/

| Script | Does | Notes |
|---|---|---|
| `booking-alert.gs`, `publish.gs`, `appointment-reminder.gs` | Apps Script sources | pasted into one Apps Script project by hand |
| `gen-services.js` | service pages + sitemap | **refuses without `--force`**: 12 of 14 pages are hand-edited |
| `gen-blog.js`, `gen-careers.js`, `gen-treatments.js`, `gen-images.js` | page / image generators | |
| `bake-default-text.js`, `bake-lang.js`, `bake-gallery.js`, `bake-doctors.js` | bake content into HTML for no-JS | |
| `set-domain.js` | rewrites the domain across files | |
| `gen-image-sizes.py`, `gen-review-qr.py` | card/thumb sizes; static review QR SVG | Python (Pillow, segno) |
| `booking-sweep.test.js` | tests for the sweep | `node tools/booking-sweep.test.js` |

No CI runs any of these. The deploy workflow only uploads files.

## 10. Deploy and domain

- Push to `main` → `pages.yml` uploads the whole repo (`path: .`) → live in about a minute.
  **Everything in the repo is public**, including these `.md` files.
- Work happens on a branch; `main` is fast-forwarded after review.
- Cache-busting: asset URLs carry `?v=YYYYMMDDx`. Bump it when a CSS/JS change must reach
  returning visitors.
- **DNS (Namecheap)** — nameservers must be **Namecheap BasicDNS**. Host records:
  `A @` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`;
  `CNAME www` → `podenapata-sys.github.io.`; `TXT _github-pages-challenge-…` (domain
  verification — keep it). Switching nameservers to "Custom DNS" takes the site down
  (it happened on 28 Sep 2026; see `MEMORY.md`).
