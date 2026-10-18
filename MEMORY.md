# MEMORY — Omega Dental project log

> Running context so work can continue in a new session or a different tool.
> **Update rules:** newest entries first in each section, one or two lines each, dated
> (YYYY-MM-DD). Record *what* changed and *why*. Never paste secrets, tokens, passwords or
> personal data — this file is public on the live domain.

## Current state (2026-10-18)

- **`main` is live**, deployed by GitHub Actions (Pages source switched to Actions on 11 Oct;
  no branch deploys since). The working branch `claude/tender-albattani-m04a9m` is
  fast-forwarded into `main` after each reviewed change.
- Prices: one list in `content.js`; `tools/sync-prices.js` copies it into the service tables,
  treatments cards and JSON-LD, and the deploy runs it. Five prices await the clinic (TASKS 2.5).
- Apps Script: the hardened `booking-alert.gs` / `publish.gs` are in the repo but must be pasted
  and redeployed by hand (TASKS 0.3). Until then the live publish endpoint is the old one.
- Domain restored 28 Sep after an outage (see incidents). Site confirmed loading.
- Content: 15 services, 52 priced treatments in 10 categories, 14 service pages, 5 blog articles,
  53 gallery photos, 1 doctor. 28 public pages.
- Open work: `TASKS.md`. Phase 0 is the priority.

## Decisions (with reasons)

- **2026-10-18** — **One price list.** Each price row has a fixed `id`; pages link to it
  (`data-price`, `data-svc`) and `tools/sync-prices.js` fills them, run by the deploy so an editor
  publish (which commits only `content.js`) updates every page. Chosen over runtime-only JS so
  Google and no-JS visitors see the same prices. The sync never fails the deploy.
- **2026-10-18** — Prices at the owner's direction: Front Tooth RCT ৳5,000, Back Tooth RCT
  ৳6,000 (was ৳5,000 on the page), "Root Canal Treatment (RCT)" ৳5,000–6,000. Cosmetic page
  prices (Smile Design, Rabbit Tooth, Hollywood Smile, Tooth Jewelry, Blackish Gum) added to the
  price list at their page values. Teeth Scaling and Flexible Denture cells now show the list's
  ranges (৳1,500–2,500; ৳5,000–8,000). Treatments cards show the homepage card prices (7
  changed). Composite Crown and Tooth Shaping left unlinked pending the clinic.
- **2026-10-18** — Cosmetic Book links open the form unselected (`SERVICE_DEFAULT` `""`): the
  service now has five priced rows and pre-picking Smile Design would guess.
- **2026-10-18** — Editor drafts keep their `base`; a mismatch with live pauses publishing
  (merge or start fresh). `publish.gs` additionally refuses content.js without unique price ids,
  so an old cached editor cannot undo the change either.
- **2026-10-18** — No personal data in publish commit messages (the repo is public); the
  clinic's login email had been written into every editor commit.
- **2026-10-11** — Prices changed at the clinic's request: Permanent Tooth Extraction
  ৳4,000–5,000 (was 2,000–5,000), Surgical Tooth Extraction ৳10,000–12,000 (was 8,000–12,000).
  Updated in `content.js` (price list, calculator, booking, dashboard), the extraction page
  comparison table, treatments.html JSON-LD and `gen-services.js`; `content.js?v=4`.
- **2026-09-29** — Six project docs added at the repo root. They deploy publicly, so they hold no
  secret values or personal data by design.
- **2026-09-23** — Booking links accept an exact price name *or* a service slug
  (`resolveService()`); `extractions` resolves to Permanent Tooth Extraction, not the milk-tooth
  price. Old links keep working.
- **2026-09-23** — Opening hours are one `HOURS` object computed in Asia/Dhaka; the badge is
  hidden without JS rather than risk a wrong claim.
- **2026-09-23** — Service pages patched in place, not regenerated: `gen-services.js --force`
  would destroy hand edits on 12 pages and cut sitemap URLs.
- **2026-09-14** — **No third-party runtime JS.** The review QR became a static SVG built by
  `tools/gen-review-qr.py`. Reason: a stalled cdnjs request had blanked the homepage.
- **2026-09-14** — **No enforcing CSP** yet: meta-tag CSP can't run report-only, and a wrong
  `connect-src` silently breaks booking and sign-in.
- **2026-09-14** — Frame-buster on `dashboard.html` / `admin-content.html`; Pages can't send
  `X-Frame-Options`.
- **2026-09-13** — **Default language English** (was Bangla-first), at the clinic's request.
  Reversible with `node tools/bake-lang.js bn`.
- **2026-09-13** — Doctor photo: crop/resize/compress only; no generative processing on a real
  face next to a BMDC number.
- **2026-09-13** — Gallery and doctor card baked into HTML: in-app browsers and no-JS visitors
  otherwise saw empty pages.
- **2026-09-10** — Default text baked into HTML; set-domain tool; switched to omegadentalbd.com.
- **2026-09-09** — Firebase Auth replaced the PIN; dashboard read-only when signed out;
  owner lists hold **UIDs not emails** (config is public); Firestore limited to the owner UIDs.
- **2026-09-09** — Website bookings become **pending records**; they turn into patient records
  only when the patient arrives.
- **2026-09-09** — Nothing invented about doctors: blank fields render as absent, no experience
  figure, careers page uses WebPage not JobPosting.
- **2026-09-07** — Before/after images labelled **illustrative** (not this clinic's patients).
- **2026-09-06** — App Check (reCAPTCHA v3) added, **enforcement off** until metrics show
  verified traffic; enforcing early would silently reject real bookings.
- **2026-09-03** — Content editor publishes via Apps Script with the GitHub token in Script
  Properties, path allowlist, Firebase login required. `main` is the deploy branch.
- **2026-09-03** — Booking alerts: Apps Script email + Google Sheet, plus a 5-minute sweep so a
  lost beacon never loses a booking.

## Incidents

- **2026-10-18 — Editor audit (owner asked to check the editor; fixed the same week).**
  (1) A draft saved on a device loaded over newer live content without warning and could be
  published back. (2) 100 prices outside `content.js` (42 table cells, 13 cards, 45 JSON-LD
  offers) never followed the editor, and 4 already disagreed with it. (3) The editor's draft
  had no `photos` list, so the first publish would have removed it from content.js, and a
  publish with a new photo would have shown an error after committing. (4) Token expiry was
  invisible until publishing failed. No editor publish had happened yet, so nothing was lost.
  Verified: 40 linked cells equal the list on all 14 pages in Chromium; editor scenarios
  (old draft, merge, start fresh, reload during deploy) and a faked end-to-end publish pass.
- **2026-10-11 — Security audit (owner asked for a full checklist).** Fixed in code:
  (1) stored XSS — a booking ID chosen by a visitor was put unescaped into a dashboard
  attribute; all IDs now escaped and `firestore.rules` only accepts 20-char auto IDs;
  (2) Google Sheet formula injection from booking fields; (3) alert email escaping;
  (4) alert flood — rate limit on beacon and sweep; (5) publish endpoint now validates file
  contents (content.js must be the editor's JSON format; photos must be real JPEGs ≤3 MB);
  (6) hard-coded alert token and recipient emails moved to Script Properties (they remain in
  git history); (7) gallery `?cat=` could crash the page. Manual steps: TASKS 0.3, 0.5–0.7.
- **2026-10-02 — Before/after sliders blocked page scrolling on phones.** The invisible range
  input covered the whole card with `touch-action:none`, so any touch on a photo dragged the
  divider and the page would not scroll. Now only the divider (44px strip) starts a drag; the range
  input stays for keyboard use. Verified with real touch events: swipe on a photo scrolls 345px
  (was 0). Reported by the owner from his phone.
- **2026-09-30 — Homepage before/after gallery empty (live since at least 3 Sep).** `.ba`
  cards used `margin:0 auto` inside a grid, which shrinks a grid item to its content; the photos
  are absolutely positioned, so each card collapsed to ~13×10px. Fixed on the branch with
  `width:100%` (536×402 desktop, 362×272 phone); stylesheet cache-buster bumped to
  `?v=20260930a` on all 28 pages, which also ships the branch's earlier `.pbook`/badge styles to
  returning visitors. Found while taking portfolio screenshots.
- **2026-09-28 — Site down (domain).** Visitors got a Namecheap page. Cause: Namecheap
  nameservers set to **"Custom DNS"** (`dns1/dns2.registrar-servers.com`), so the Advanced DNS
  host records were ignored. Code and GitHub Pages were fine. Fix: switched to **Namecheap
  BasicDNS**; host records (4 GitHub A records, `www` CNAME, Pages TXT) were already correct.
  Lesson: never change nameserver mode; record kept in `ARCHITECTURE.md` §10.
- **2026-09-23 — 10 of 15 homepage Book buttons opened an empty form.** Service names were
  passed where the dropdown expects price names. Fixed on the branch (not yet live).
- **2026-09-13 — English pages showed Bangla legal footer** for returning visitors; `legal.js`
  now observes `data-lang`. Gallery page had no legal links at all; added.
- **Before 2026-09-14 — Homepage blank** on a slow connection when a CDN script stalled.
  Led to the no-third-party-JS rule.

## Known issues (not yet fixed)

See `TASKS.md` for the full list. Headline items: five prices await the clinic (2.5);
alert token exposed in page source (0.3);
Firestore rules publication unconfirmed (0.4); README and IMAGES_GUIDE stale (1.1, 1.2);
`--surface` undefined and `.blob` overflow (1.3, 1.4); homepage FAQ/testimonials empty without
JS (1.6).

## Open questions

- Has the tightened `firestore.rules` been pasted into the Firebase Console?
- Is the street address identical to the Google Business Profile?
- Clinic answers for the FAQ (TASKS 2.1).

## History note

The local clone is shallow (~51 commits visible); commit messages reference several hundred
earlier commits. Treat decisions above as the authoritative summary.
