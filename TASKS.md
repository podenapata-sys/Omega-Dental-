# TASKS — Omega Dental backlog

> The site is built and live, so this is the remaining work, in priority order. Do one task at a
> time, on a branch, and follow `RULES.md`. When a task is done, tick it, add the date, and log
> it in `MEMORY.md`. Add new tasks at the bottom of the right phase.
>
> Status: `[ ]` open · `[~]` in progress · `[x]` done · **Owner:** who has to act.

## Phase 0 — Now (live-site safety)

- [ ] **0.1 Review and merge the conversion branch — and make `main` live again.** · Owner: developer
  ⚠ Pages currently serves this branch directly, so its commits are already live. Fast-forward
  `main` to it, then Settings → Pages → Source: GitHub Actions. Until then the content editor
  (which commits to `main`) does not update the site.
  Branch `claude/tender-albattani-m04a9m`, commit b61ee90: Book buttons pre-select the
  treatment (15 service cards, 45 price rows, 14 service pages), open-now badge, lighter form,
  clearer success message.
  *Done when:* reviewed on a phone, fast-forwarded into `main`, live site checked in both
  languages. Record the weekly booking count **before** merging, for comparison.

- [ ] **0.2 Domain contact verification.** · Owner: developer (Namecheap account)
  Registrar requires the contact email to be verified within 15 days of registration
  (registered 13 Sep 2026).
  *Done when:* no verification warning in Namecheap; nameservers show **Namecheap BasicDNS**.

- [ ] **0.3 Rotate the booking-alert token.** · Owner: developer
  `OMEGA_ALERT_TOKEN` is readable in page source and hard-coded as `SHARED_TOKEN` in
  `tools/booking-alert.gs`. Move `SHARED_TOKEN` to a Script Property, set a new value, update
  `assets/firebase-config.js` to match, redeploy the Apps Script.
  *Done when:* a test booking still produces an email and a sheet row; the old value no longer
  appears in any tracked file.

- [ ] **0.4 Confirm the Firestore rules are published.** · Owner: developer
  `firestore.rules` is only a record. *Done when:* the Console's rules match the file exactly
  (including `validBooking()`), and a public read of `bookings` is denied.

## Phase 1 — Correctness (code only, no clinic input needed)

- [ ] **1.1 Rewrite `README.md`.** It says 12 services / 37 treatments / no backend / a single
  `index.html` / logo tapped 5 times / edit prices in `app.js`. Truth: 15 / 45 / Firestore +
  Apps Script / 30 pages / 3 taps on the footer logo / prices in `content.js` via the editor.
  Point to the six project docs instead of duplicating them.
- [ ] **1.2 Refresh `IMAGES_GUIDE.md`** — lists 12 service filenames; `content.js` now has more.
- [ ] **1.3 Define `--surface`** in `:root` (used in 4 places, currently transparent).
  *Done when:* the 4 elements have the intended background in both languages.
- [ ] **1.4 Fix `.blob` horizontal scroll** at 768px (`index.html`) and 320px (`book.html`).
  *Done when:* zero overflow at every width 320–1440.
- [ ] **1.5 Complete reduced-motion coverage** (list in `DESIGN.md` §9).
- [ ] **1.6 Bake the homepage FAQ and testimonials** for no-JS (`#faqList`, `#testGrid` are
  empty without JavaScript).
- [ ] **1.7 Remove stale comments** in `tools/bake-gallery.js` that call Bangla the default.
- [ ] **1.8 Add `tools/check.js`** — a no-dependency pre-push check: tag balance, local links
  resolve, no duplicate ids, JSON-LD parses, I18N key parity, every `?service=` resolves.
  *Done when:* it runs clean on `main` and fails on a deliberately broken link.

- [x] **1.10 Before/after slider stole touch scrolling on phones** — drag only from the divider.
  Done 2026-10-02.
- [x] **1.9 Before/after cards collapsed to ~13×10px** — `width:100%` on `.ba`, cache-buster
  bumped. Done 2026-09-30 (on the branch; goes live with 0.1).

## Phase 2 — Needs the clinic

- [ ] **2.1 Real FAQ answers** (sterilisation routine, same-day emergencies, payment methods,
  parking) → homepage FAQ + `FAQPage` JSON-LD. · Owner: clinic supplies, developer builds.
  Do not write answers on the clinic's behalf.
- [ ] **2.2 Verify the street address** against the Google Business Profile, character for
  character, in `app.js` (`contact_addr`) and the JSON-LD.
- [ ] **2.3 Real before/after photos** with patient consent, to replace the illustrative set.
- [ ] **2.4 Ask for Google reviews** using the review QR at the front desk.

## Phase 3 — Hardening

- [ ] **3.1 App Check enforcement** — only after the Console shows nearly all traffic verified
  for two weeks, and only once the sweep's reads are confirmed unaffected.
- [ ] **3.2 Content-Security-Policy rollout** — test on a branch deploy first; a wrong
  `connect-src` breaks booking and sign-in silently.
- [ ] **3.3 Reconcile generators with hand-edited pages** so `gen-services.js` can run without
  `--force` and without losing edits or sitemap URLs.
- [ ] **3.4 Tokenise recurring hard-coded colours** (`DESIGN.md` §9).
