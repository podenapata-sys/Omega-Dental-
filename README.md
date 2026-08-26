# Omega Dental — Website

A fast, bilingual (English / বাংলা) website for **Omega Dental**, a painless &
cosmetic dental clinic in West Kazipara, Dhaka. Built as a zero-build static
site (HTML + CSS + vanilla JS) so it can be hosted for free on GitHub Pages,
Netlify, Vercel or any static host.

## Features
- **Bilingual** EN / বাংলা toggle (remembers choice in `localStorage`)
- **Clean clinical** design — teal `#57C3AD` primary with blue/orange logo accents
- **Services** grid (12 services)
- **Cost estimator** wired to the real price list (per-tooth quantity support)
- **Pricing table** — all 37 treatments grouped by category (BDT ৳)
- **Before & After** drag-comparison sliders (filterable)
- **Meet the Doctor** — Dr. Afsana Haque, credentials
- **Testimonials**, animated stat counters
- **Contact** with embedded Google Map
- **Booking form** that submits straight to WhatsApp (no backend needed) + floating WhatsApp button
- **SEO** — meta tags, Open Graph, `Dentist` JSON-LD structured data

## Run locally
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Project structure
```
index.html          # page markup + SEO/JSON-LD
assets/styles.css   # clean-clinical theme
assets/app.js       # price data, translations, calculator, slider, booking
assets/logo.svg     # placeholder logo (replace with real PNG/SVG)
```

## Customising
- **Prices / services:** edit the `PRICES` and `SERVICES` arrays in `assets/app.js`
  (they drive the table, calculator and booking dropdown automatically).
- **Text / translations:** edit the `I18N` object in `assets/app.js`.
- **Logo:** replace `assets/logo.svg` with the real Omega Dental logo.
- **Before/After & clinic photos:** swap the SVG placeholders for real images.
- **Contact details:** the `OMEGA` constant at the top of `assets/app.js`.

## Admin dashboard

A private page for recording visits, tracking payments and exporting to Excel — opened by
tapping the logo 5 times. See **[DASHBOARD.md](DASHBOARD.md)** for how to use it, the
backup routine, and the Firebase / Google Drive setup.
