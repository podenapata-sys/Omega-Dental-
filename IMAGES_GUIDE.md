# 📸 How to add real photos to the Omega Dental website

The site is wired so every photo has a **named slot**. Drop a correctly‑named image
into the right folder and it appears automatically, cropped to fit. If a photo is
missing, the site falls back to the current illustration — so nothing ever looks broken.

You don't need to touch any code. Just **find → optimise → rename → drop in** (or send
the prepared images to me and I'll place them).

---

## 1) Where to find good, license‑safe photos (free)

Use these — all free for commercial use, **no attribution required**:

| Site | Link |
|---|---|
| Unsplash | https://unsplash.com |
| Pexels | https://www.pexels.com |
| Pixabay | https://pixabay.com |

⚠️ **Do NOT** grab images from Google Images / random websites — most are copyrighted
and you can be fined. The three sites above are safe.

**Search terms by section:**
- Hero: `dentist patient smile`, `happy dental patient`, `dental clinic`
- Scaling/Polishing: `dental cleaning`, `teeth scaling`
- Veneer / Cosmetic / Whitening: `white teeth smile`, `teeth whitening`, `perfect smile`
- Root canal / Filling: `dentist working`, `dental treatment`
- Crown / Bridge: `dental crown`, `dental lab teeth`
- Denture: `dentures`, `dental prosthesis`
- Implant: `dental implant model`
- Extraction / Surgery: `dental surgery`, `dentist tools`
- Kids: `child at dentist`, `kids dental`
- Braces / Aligner: `dental braces`, `clear aligner`

**Tip for a premium look:** pick photos with a **similar bright, clean, white/teal tone**
so all the cards feel like one matching set.

---

## 2) Optimise each photo (keeps the site fast)

1. Open the image in **https://squoosh.app** (free) or **https://tinypng.com**.
2. **Resize** to the target size in the table below.
3. Export as **JPG**, quality ~70–80%, aiming for **under ~150 KB** each.

---

## 3) Rename to the exact filename and drop it in the folder

Names must match **exactly** (all lowercase, with the hyphens).

### A. Service photos → folder `assets/services/`  · size **800 × 600** (landscape 4:3)
```
scaling-polishing.jpg
veneers.jpg
root-canal-rct.jpg
tooth-fillings.jpg
crowns-bridges.jpg      (used by Fiber Bridge + Zirconia & PFM Crown)
dentures.jpg
dental-implants.jpg
teeth-whitening.jpg
extractions-surgery.jpg
kids-dentistry.jpg
cosmetic-dentistry.jpg
braces-aligners.jpg     (used by Orthodontic Treatment + Aligner)
```

### B. Before/After photos → folder `assets/ba/`  · size **600 × 420** (landscape)
Each treatment needs a *before* and an *after* image (same angle/zoom looks best):
```
whitening-before.jpg   whitening-after.jpg
veneers-before.jpg     veneers-after.jpg
braces-before.jpg      braces-after.jpg
implants-before.jpg    implants-after.jpg
```

### C. Hero photo → folder `assets/`  · size **720 × 810** (portrait 4:4.5)
```
hero-portrait.jpg
```
(The looping background video stays; this photo fills the framed card on the right.)

---

## 4) Make them go live

- **Easiest:** send the prepared, renamed images here and I'll commit them for you.
- Or, if you manage the repo: place the files in the folders above, commit and push.
  The matching illustration is replaced automatically on the next refresh.

You can add them **a few at a time** — each card upgrades to a real photo as soon as its
file exists, and keeps the illustration until then.

---

## Quick checklist
- [ ] Downloaded from Unsplash / Pexels / Pixabay (license‑safe)
- [ ] Resized to the target size
- [ ] Compressed to < ~150 KB (JPG)
- [ ] Renamed **exactly** as listed
- [ ] Placed in the correct folder (or sent to me)
