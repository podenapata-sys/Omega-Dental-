# PRD — Omega Dental website

> Product requirements for **omegadentalbd.com**. The site is live; this describes what it is
> for and what it does today. Changes to scope are recorded in `MEMORY.md`.
>
> This file is public (the whole repo is deployed). Never put secrets or personal data here.

## 1. The business

- **Clinic:** Omega Dental, West Kazipara, Dhaka. The full street address is the one published on
  the site (`contact_addr` in `assets/app.js`, and the JSON-LD in `index.html`). Keep them identical.
- **Chief Dental Surgeon:** Dr. Afsana Haque Joty — BDS (DU), PGT Oral & Maxillofacial Surgery
  and Paediatric Dentistry (Dhaka Dental College), BMDC 11071.
- **Hours:** Saturday–Thursday 10:00 AM – 9:30 PM, Friday 11:00 AM – 9:30 PM (Asia/Dhaka).
- **Contact:** phone and WhatsApp as set in `assets/app.js` (contact constants).

## 2. The problem

Patients in Dhaka choose a dentist on their phone, usually from Google Maps or a Facebook share,
often inside the WhatsApp or Facebook in-app browser. Before they call, they want three things:

1. **What does it cost?** Dental prices are the most-asked question and are rarely published.
2. **Can I trust this clinic?** A real doctor with a real registration number, real photos.
3. **How do I book without phoning?** Many patients prefer to message rather than call.

Without a site, all three are answered one WhatsApp message at a time by the front desk.

## 3. Users

| User | What they need | Where they are |
|---|---|---|
| **Patient** | Price, trust, book in under a minute | Mobile, Bangla or English, often slow connection or in-app browser, sometimes JS blocked |
| **Front desk** | Every booking arrives, nothing is lost, records are quick to enter | Clinic PC or phone, sometimes offline |
| **Owner** | Change prices and photos without a developer; see income | Phone, occasional |

## 4. What the site does (shipped)

### Public site — 28 pages
- **Homepage:** hero, 15 service cards, full price list (45 priced treatments in 10 categories),
  cost calculator, doctor card, gallery preview, reviews QR, contact and map.
- **Service pages:** 14 pages in `services/`, one per treatment, each with price, FAQ and a
  Book button that pre-selects that treatment.
- **Blog:** index + 5 articles. **Gallery:** 53 photos in 11 categories.
  **Treatments, Careers, Privacy Policy, Terms, Medical Disclaimer.**
- **Bilingual:** English (default) and Bangla, one-tap switch, choice remembered.
- **Readable without JavaScript:** default text, gallery and doctor card are baked into the HTML.
- **Open-now badge:** live open/closed state computed in Dhaka time.

### Booking
- Form needs **name, phone, treatment** and consent; date, time and address are optional.
- Every "Book" button (15 service cards, 45 price rows, 14 service pages) arrives with the
  treatment already selected.
- On submit: saved to the cloud database, an email alert and a spreadsheet row go to the clinic,
  and the patient is offered WhatsApp as a faster confirmation route.
- A background job re-sends any alert that was missed.

### Clinic tools (private, not linked)
- **Dashboard** (`dashboard.html`): patient records, payments against dues, repeat treatments,
  website bookings as pending records, income report, Excel export, Google Drive backup.
  Works read-only when offline or signed out.
- **Content editor** (`admin-content.html`): owner edits prices, services, gallery and photos and
  publishes to the live site without a developer.
- **Evening reminder:** an email each evening listing tomorrow's appointments, with a one-tap
  WhatsApp reminder per patient.

## 5. Non-goals

- Online payment or deposits.
- A patient login or portal.
- Fully automatic SMS/WhatsApp to patients (needs a paid gateway; the tap-to-send reminder is
  the free alternative).
- Invented social proof: no made-up reviews, patient counts or years of experience.

## 6. Success measures

No tracking scripts are added for this. Measured from what already exists:
- Bookings per week (dashboard / bookings sheet).
- Calls and direction requests (Google Business Profile).
- Search impressions and clicks (Google Search Console).

Baseline the weekly booking count before any conversion change ships, so the comparison means
something.

## 7. Constraints

- **Running cost ৳0/month.** GitHub Pages hosting, Firebase Spark (free) tier, Google Apps Script.
  The only cost is the domain, renewed yearly.
- **No build step.** Anyone can edit an HTML file and push.
- **Handover-ready.** The clinic owns the domain, the accounts and the code.
