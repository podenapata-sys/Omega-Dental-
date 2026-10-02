# MEMORY — Omega Dental project log

> Running context so work can continue in a new session or a different tool.
> **Update rules:** newest entries first in each section, one or two lines each, dated
> (YYYY-MM-DD). Record *what* changed and *why*. Never paste secrets, tokens, passwords or
> personal data — this file is public on the live domain.

## Current state (2026-10-02)

- **⚠ GitHub Pages is publishing the branch `claude/tender-albattani-m04a9m`, not `main`.**
  Every push to that branch is live in about a minute (confirmed from the Pages build history:
  23 Sep, 29 Sep, 30 Sep, 2 Oct). `main` (e5b20c1, 14 Sep) is behind and is NOT what visitors see.
- The content editor (`publish.gs`) commits to `main`, so while this lasts, the clinic's
  published edits would not reach the site. None have been made since 14 Sep.
- Fix (TASKS 0.1): fast-forward `main` to the branch, then set Settings → Pages → Source to
  **GitHub Actions** so `main` is live again.
- Domain restored 28 Sep after an outage (see incidents). Site confirmed loading.
- Content: 15 services, 45 priced treatments in 10 categories, 14 service pages, 5 blog articles,
  53 gallery photos, 1 doctor. 28 public pages.
- Open work: `TASKS.md`. Phase 0 is the priority.

## Decisions (with reasons)

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

See `TASKS.md` for the full list. Headline items: alert token exposed in page source (0.3);
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
