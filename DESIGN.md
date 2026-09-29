# DESIGN — Omega Dental design system

> The system as implemented in `assets/styles.css` (the only stylesheet for public pages;
> `dashboard.html` and `admin-content.html` have their own inline styles). Use these tokens and
> components; don't invent parallel ones.

## 1. Character

Clean, bright and clinical, with warmth: a **teal-to-blue brand gradient**, navy headings,
orange for the call to action, soft glass cards, generous rounding and gentle motion. Light
theme only — there is no dark mode.

## 2. Colour tokens (`:root`)

| Token | Value | Use |
|---|---|---|
| `--teal` | `#57C3AD` | brand, focus ring, highlights |
| `--teal-d` | `#3aa893` | hover |
| `--teal-dd` | `#2c8a78` | accent **text**: prices, links, labels (readable on white) |
| `--blue` / `--blue-d` | `#2B6CB0` / `#1f5290` | gradient end, secondary accents |
| `--navy` / `--navy2` | `#13294e` / `#1c3a63` | headings, topbar, footer, marquee |
| `--orange` / `--orange-d` | `#F08A24` / `#d9760f` | primary call-to-action (call, book) |
| `--violet` | `#7b8cf4` | decorative mesh only |
| `--ink` | `#16323c` | body text |
| `--muted` | `#5b7682` | secondary text (≈4.6:1 on white — the lightest text allowed) |
| `--line` | `#e7eef1` | borders, dividers |
| `--bg` / `--bg-soft` / `--bg-soft2` | `#fff` / `#f2fbf9` / `#eef6fb` | page / alternate sections |

**Gradients:** `--grad-brand` (teal → blue, 120°) is the signature; `--grad-warm` (teal → orange);
`--grad-mesh` (three soft radial blobs) behind heroes.
**Glass:** `--glass` `rgba(255,255,255,.72)` with `--glass-brd`.

**Fixed colours used outside tokens (leave as-is, don't spread):** WhatsApp `#25D366`, Facebook
`#1877F2`, orange CTA gradient `#FBB04B → #F08A24 → #E0760F`, footer dark `#0d1f3d`.
Status: open/success `#1c7a5e` on teal-16%; shut/warning `#8a5a12` on orange-12%.

## 3. Typography

| Role | Font | Detail |
|---|---|---|
| Headings | **Sora** 600/700/800 | weight 800, `letter-spacing:-.02em`, `line-height:1.15`, navy, `text-wrap:balance` |
| Body | **Inter** 400–700 | `line-height:1.65`, `--ink` |
| Bangla | **Kalpurush**, then Noto Sans Bengali | local woff2, `unicode-range` includes U+200C–200D for conjuncts |

Scale: `--fs-h1` `clamp(2.1rem,5vw,3.6rem)` (homepage hero only) · `--fs-h1-sub`
`clamp(1.8rem,4.2vw,2.7rem)` (other pages' h1) · `--fs-h2` `clamp(1.65rem,3.8vw,2.5rem)` ·
`--fs-h3` `1.12rem` · `--fs-lead` `clamp(1.04rem,2.2vw,1.18rem)`. Small text .78–.92rem;
eyebrows uppercase .72–.85rem with wide tracking.

**Bangla mode** (`body.bn`): all text switches to `--f-bn`, base 1.06rem, paragraph line-height
1.85, leads and cards ~5–10% larger. Bangla needs the extra size and leading — keep it.

## 4. Layout and spacing

- Container: `--maxw` **1200px**, 24px side padding (14px ≤760px).
- Section: 60px vertical padding (40px ≤760px); section heading block max 700px, 52px below.
- Grid gaps 22–28px.
- Radius: `--r` 20px (cards), `--r-lg` 30px (large cards), `--r-xl` 38px (photos), inputs 13px,
  small cards/FAQ 14–16px, pills 999px.
- Shadow: `--shadow-sm` at rest, `--shadow` + lift on hover, `--shadow-glow` on primary buttons.

**Breakpoints:** 1440 (nav tightens) · **1280 (nav → burger)** · 980 · 760 · 480 (main layout
steps); also 860, 640, 600, 560, 520 for specific components. The English nav needs ~1165px, which
is why it collapses at 1280.

## 5. Components (class names)

| Component | Classes | Look |
|---|---|---|
| Topbar | `.topbar` | navy strip, 38px, hidden ≤480 |
| Header | `.header`, `.nav`, `.navlist`, `.has-dd`/`.dd-menu`, `.lang-toggle`, `.burger` | sticky white glass, 84px; dropdown with teal top bar |
| Hero | `.hero`, `.hero-bg`, `.hero-stats`, `.hero-badges` | mesh + dot grid, photo with left scrim, glass stat tiles |
| Buttons | `.btn` + `.btn-primary` / `.btn-orange` / `.btn-call` / `.btn-ghost` / `.btn-wa` / `.btn-red` | pill, Sora 700, 14px×28px, lift on hover; Book links get a spinning border + shine |
| Service card | `.svc-card`, `.svc-img`, `.svc-price`, `.svc-per`, `.svc-sub-chip` | rotating teal/blue border, 210px image, teal-dd price, orange per-unit chip |
| Price table | `.price-table`, `.price-cat`, `.pbook` | gradient header and category rows; `.pbook` small teal-tint pill, solid on hover |
| Open badge | `.open-badge.is-open` / `.is-shut` | green pulsing dot / amber; `[hidden]{display:none}` |
| Forms | `.book-form`, `.f-field`, `.f-opt` | glass card; inputs 1.6px `--line` border, 13px radius, **font ≥16px** (no iOS zoom), teal focus ring `0 0 0 4px` teal-16%; `.f-opt` muted "optional" pill |
| Gallery | `.gal-item`, `.gal-lb`, `.gal-cm`, `.ba` | Instagram-style cards, lightbox, comments modal, before/after slider |
| Footer | `.footer`, `.foot-logo` | navy gradient, 5px brand-gradient top rule, 4 columns; `.foot-logo` is the admin gate |
| Overlays | `.srch-overlay`, `.cookie-banner`, WhatsApp bubble, `.totop`, `#scrollbar` | |

New components should be built from these tokens and radii, pill buttons, and the same hover
lift.

## 6. Motion

- Hover easing: spring `cubic-bezier(.34,1.56,.64,1)`.
- Scroll reveals: `svcRise` via `animation-timeline:view()`, IntersectionObserver fallback on `.reveal`.
- Attention: `callPulse`, `ctaPulse`, `ctaShine`, `obPulse` (open badge).
- **Every animation must stop under `prefers-reduced-motion: reduce`.** Four such blocks exist;
  see known gaps.

## 7. Accessibility

- Focus: `:focus-visible` → `outline:3px solid var(--teal)`, offset 2px.
- `html{scroll-padding-top:100px}` so anchors clear the 84px sticky header.
- Inputs at least 16px; tap targets at least 44px.
- Text contrast: body `--ink`, secondary no lighter than `--muted`, accent text `--teal-dd`
  (never plain `--teal` for text on white).

## 8. Images

| Slot | Path | Size |
|---|---|---|
| Service photo | `assets/services/<slug>.jpg` (+ `cards/`, `thumbs/` via `tools/gen-image-sizes.py`) | 800×600 (4:3) |
| Before/after | `assets/ba/<treatment>-before.jpg`, `-after.jpg` | 600×420 |
| Hero | `assets/hero-portrait.jpg` | 720×810 |
| Doctor | `assets/doctors/<name>.jpg` (+ `cards/`) | square crop, 900 / 640 |
| Share card | `assets/share-1200x630.jpg` | 1200×630 |

JPG, quality 70–80, under ~150 KB, lowercase-hyphenated names. Always set `alt`, `width`,
`height`, and `loading="lazy"` below the fold.

## 9. Known gaps (fix, don't copy)

- `--surface` is used in 4 places but never defined, so those backgrounds are transparent.
- Recurring hard-coded hex values (`#fff` ×~100, footer greys, reds) should become tokens.
- Reduced-motion misses: `scroll-behavior:smooth`, `.hero-wa-btn` pulse, `baPulse`, and the
  `heroFloat`/`heroDot`/`amtPop`/`galCmIn`/`cookieUp` keyframes.
- Decorative `.blob` causes a few pixels of horizontal scroll: `index.html` at 768px,
  `book.html` at 320px.
- `.fixed-sidebar` rests at `opacity:.4` and `.gal-wm` watermark text is 7–8px — both low contrast.
