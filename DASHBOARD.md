# Omega Dental — Admin Dashboard

A private, password-protected page for recording patient visits, tracking payments and
exporting the data to Excel. It is not linked from anywhere on the site and is excluded
from search engines (`noindex, nofollow`).

---

## Opening it

**Tap the Omega Dental logo in the page FOOTER 3 times, quickly** (within about 1.5
seconds between taps), from any page on the site. Then enter the PIN.

It is the logo at the very **bottom** of the page, not the one in the top bar — the top
one is a link to the homepage, so tapping it repeatedly just navigates.

```
PIN: 2518
```

The direct address is `/dashboard.html`, but the 5-tap route means you never have to type
it on a shared screen. "Lock" returns you to the PIN screen.

> To change how many taps are needed, edit `TAPS_NEEDED` in `assets/admin-gate.js`.
> To change the PIN, edit `DEFAULT_PIN` near the top of the records script in
> `dashboard.html`. It is stored in the page itself, so treat it as a *privacy* screen
> that keeps casual eyes out — not as bank-grade security.

---

## Where your data lives

Records are saved in **two places at once**:

1. **This browser** — instantly, always, even offline.
2. **Your Firebase account (the cloud)** — as soon as you are signed in.

The strip under the toolbar always tells you which is active:

| Shows | Meaning |
|---|---|
| ☁ Records are synced to your account | Safe in the cloud and on every signed-in device |
| 💾 Records are saved in this browser | Working locally — sign in to start syncing |
| ⏳ Syncing / Uploading… | Working on it |
| ⚠ Offline / could not sync | Saved locally; will sync when the connection returns |

**Once you sign in, this is what you get:**

- Records added on the clinic PC appear on your phone within a second, and vice versa.
- Clearing your browsing data no longer loses anything — sign in again and everything
  comes back.
- Records added *before* you signed in are uploaded automatically the first time you do.

**If you never sign in**, the dashboard still works exactly as before — fully usable,
local to that browser. Nothing nags you. But then clearing browsing data *does* erase the
records, so keep taking Excel backups.

> Cloud sync is free at clinic volume. The Firestore free tier covers 20,000 writes and
> 50,000 reads per day; recording 30 patients uses about 30 writes.

### A note on privacy
Records are patient data, so the cloud copy is readable **only** by your signed-in
account — the security rules deny everyone else, including anonymous visitors. This is
stricter than website bookings, which anyone can *create* (that is the booking form) but
only you can read.

## Day-to-day use

**Dates read day-month-year everywhere** — `05-08-2026` is 5 August 2026. That covers the
records table, the Next Appointment column, the date boxes you tap, the income report
(`08-2026`) and the dates inside an exported Excel file.

Excel *filenames* stay year-first (`omega-dental-2026-09-02.xlsx`) on purpose, so a folder
of backups sorts oldest-to-newest by itself. Importing an older backup still works: files
saved before this change hold year-first dates and are converted as they come in.


### Adding a walk-in
Fill in the form and press **Add record**. Only the mobile number is required — the
**Customer ID is generated from its last 4 digits** (`01711234567` → `OD-4567`).

Note that two patients whose numbers end in the same 4 digits will share a Customer ID.
Use the Name column to tell them apart.

The form rejects a **Paid amount larger than the Total**, and rejects negative amounts —
otherwise the negative balance would quietly cancel out other patients' dues in the
"Outstanding due" figure.

### Editing and deleting
Every row has ✏️ (edit) and 🗑️ (delete). On a phone each patient shows as a card with
those buttons at the top.

Deleting moves the record to the **🗑 Bin**, where it can be restored for **30 days**;
after that it is removed for good. The Bin tab only appears when something is in it.

While signed in, both the delete and the restore apply **everywhere** — a delete on your
phone also removes it from the clinic PC, and restoring puts it back on both.

Records in the Bin are excluded from the table, the totals and every Excel export, so a
deleted patient never quietly inflates your figures.

### Views and search
- **Day** — one date, chosen with the date picker.
- **This Week** — the last 7 days, ending today.
- **Month** — one calendar month, chosen with the month picker.
- **All** — everything.
- **📅 Upcoming** — everyone with a future appointment, soonest first, each showing
  "today" / "tomorrow" / "in N days". Built from the Next Appointment field you already fill in.
- **💰 Dues** — only patients who still owe money, largest balance first. Each row has a
  💬 button that opens WhatsApp with a polite reminder naming the amount, treatment and date.
- **🗑 Bin** — deleted records awaiting restore (appears only when it has something).

The **search box ignores the date filter on purpose** and searches all your records by
name, mobile, Customer ID or service — so you can find a patient without remembering when
they came. Clear the box to return to the selected view.

The four stat cards always reflect what is currently on screen. "Patients (in view)"
counts **visits**, so a patient who came three times counts three times.

---

## Website content editor

Press **🌐 Website** in the top bar (next to Report) to switch to the content editor;
**📋 Records** brings you back. Same PIN.

Four tabs:
- **Services** — the 15 cards: name, short line, description, price, how long it takes
- **Prices** — the 45 price-list rows: name, cheapest, most expensive, note
- **Photos** — each service's main photo, the second photo it fades to, and the small
  strip of extra photos on the card
- **Gallery** — the 53 photos on your Gallery page

### Gallery
Each photo has a **category** (which tab it shows under) and a caption in both languages.
**Add photo** puts a new one at the top of the list — give it a caption and pick its category.
The **×** takes a photo out of the gallery; the file stays on your site, so you can add it back.

The category tabs on the gallery page are built from this list, so a photo can only sit under
a tab that exists.

### Photos
Tap **Change** to pick from the photos already on your site, or **Upload a photo** inside the
picker to add your own. An uploaded photo is resized automatically to the three sizes the site
uses, so you can send one straight from your phone camera.

The **main photo** cannot be removed — every card needs one. The second photo and the extra
photos each have a red **×**.

Uploaded photos are marked **NEW** and are stored in your draft until you publish; the footer
tells you how many are waiting. Browsers only allow a few megabytes of draft storage, so add
a handful of photos, publish, then add more.

Every text field shows **English and Bangla side by side**, so nothing gets half-translated.
Beside each card price you also see that service's price-table range, to catch a real mistake.
They are separate on purpose — the card is a headline figure, the table lists each
sub-procedure — so most of them differ legitimately.

| Button | What it does |
|---|---|
| **👁 Preview** | Shows how the cards and price table will look, from your draft |
| **✓ Check** | Flags empty fields, bad amounts and duplicates before you publish |
| **↺ Revert draft** | Throws your draft away and goes back to the live content |

**Your edits are a draft on this device until published.** The strip at the top says whether
you have unpublished changes. Publishing to the live site is not built yet — for now the
editor cannot change the website at all, so it is safe to explore.

---

## Income report

Press **📊 Report** in the top bar for:

- **Collected per month** — the last 12 months as a bar chart, so you can see the trend.
- **Top services by income** — which treatments actually bring the money in.
- An all-time line: visits, total billed, total collected and outstanding.

It counts **collected** money (what patients actually paid), not what was billed, and it
ignores anything in the Bin. Press the button again to hide it.

---

## Backups

| Button | What it does |
|---|---|
| **Download this view (Excel)** | Exports exactly what is on screen — use with the Month tab for a monthly sheet. |
| **Backup all (Excel)** | Two sheets: every record, plus a month-by-month summary. |
| **Backup to Drive** | Same workbook, uploaded to an "Omega Dental Backups" folder in your Google Drive. |
| **Import** | Restores an Excel/CSV backup. |

**Importing asks you to choose:**
- **OK / Replace** — clears the existing records first, then loads the file. While signed
  in this clears them **in the cloud too**, so it affects every device. Use it only when
  you genuinely want the file to become the whole record set.
- **Cancel / Merge** — keeps what is there and adds only records not already present.
  Re-importing the same backup twice will **not** create duplicates. This is the safe
  choice.

With cloud sync on and a 30-day Bin behind every delete, Excel backups are no longer your
only safety net — but they are still worth taking, as the only copy you can open without
the internet and the only one that outlives the 30-day window. **Once a month is plenty now.**

---

## Website bookings (live)

When someone books through the website — or asks for a call back from the homepage —
it appears in the **Website Bookings** panel within a second or two, with a sound and a
browser notification.

Call-back requests show **📞 Call back request** where an appointment shows the treatment,
and carry only a name and a phone number. There is nothing else to know: ring them.

Press **Connect** and sign in with the clinic's Firebase email and password. Each booking
has:

- **➕ Add to records** — creates a record from it. The **visit date is set to today** and
  the date the patient requested becomes their **Next Appointment**. Total and Paid start
  at 0 for you to fill in.
- **✓ Handled** — clears it from the list.

Notifications only arrive while the dashboard is open in a browser tab.

### Lock vs Sign out — they are different
- **🔒 Lock** returns you to the PIN screen. It is a quick privacy screen for stepping away;
  your cloud session stays active underneath.
- **Sign out** (in the Website Bookings panel) ends the cloud session properly. Records stay
  in this browser but stop syncing until you sign in again.

Use **Sign out** on any device you do not fully control, or before handing a phone to someone.
Lock alone does not stop someone who knows the PIN from reaching your cloud records.

---

## Email alerts for new bookings

The dashboard beeps only while it is open. To be told about a booking even when nobody is
at the computer, the site can email the clinic every time someone books. It is free —
a Google account may send about 100 of these a day, far more than a clinic receives.

**This is off until it is set up.** With no address configured the booking form behaves
exactly as before.

### Setting it up (about five minutes, once)

1. Sign in to the Google account that should receive the alerts and open
   [script.google.com](https://script.google.com) → **New project**.
2. Delete whatever is in the editor and paste in the whole of
   [`tools/booking-alert.gs`](tools/booking-alert.gs).
3. At the top of the file change two lines:
   - `TO_EMAIL` — the address to alert (it can be the same account, or the manager's).
   - `SHARED_TOKEN` — any word you invent, e.g. `omega-2518-alert`. Write it down.
4. **Deploy** → **New deployment** → type **Web app**.
   - *Execute as*: **Me**
   - *Who has access*: **Anyone**
   Press Deploy, allow the permissions it asks for, and copy the **Web app URL**
   (it starts `https://script.google.com/macros/s/…/exec`).
5. Open `assets/firebase-config.js` and fill in the two empty lines:

   ```js
   window.OMEGA_ALERT_URL   = "https://script.google.com/macros/s/…/exec";
   window.OMEGA_ALERT_TOKEN = "omega-2518-alert";
   ```

6. Save and publish the site, then make one test booking on the website and check the inbox.

The email carries the patient's name, a tappable phone number, the treatment, the date and
time they asked for, their note, and a **Reply on WhatsApp** button. Emergency requests are
flagged at the top.

### A caveat worth knowing
The token sits in the website's page source, so a determined person could read it and send
fake alerts. The script only ever emails your one fixed address, so the worst case is junk
in that inbox — never a leak of patient data. It is a speed bump against random bots, not a
secret. If the inbox ever does get spammed, change `SHARED_TOKEN` in both places and
redeploy.

### Turning it off
Empty `OMEGA_ALERT_URL` in `assets/firebase-config.js`. Bookings keep working and keep
reaching the dashboard; only the emails stop.

---

## One-time setup (already done — for reference)

### Firebase
1. **Firestore Database** → Create database (production mode).
2. **Authentication** → Sign-in method → enable **Email/Password**, then add one user
   (the clinic's account).
3. **Firestore → Rules** → paste the contents of [`firestore.rules`](firestore.rules)
   and Publish. This covers both `bookings` (public create, owner read) and `records`
   (owner only, in both directions) — **records will not sync without it**.
4. Web config lives in `assets/firebase-config.js` (`window.OMEGA_FB`). These keys are
   safe to be public — the rules above are what protect the data.

### App Check
`window.OMEGA_APPCHECK_KEY` in `assets/firebase-config.js` is **empty**, so App Check must
stay **Unenforced**:

> Firebase Console → Build → **App Check** → APIs → **Authentication** and
> **Cloud Firestore** → Unenforce

If sign-in ever fails with `auth/firebase-app-check-token-is-invalid`, that setting was
switched on. Either unenforce it again, or register the web app with reCAPTCHA v3 and put
the **site key** (starts `6L…`) into `OMEGA_APPCHECK_KEY` — the code activates
automatically when that value is filled in.

### Google Drive backup
1. Google Cloud Console → APIs & Services → Library → enable the **Google Drive API**.
2. Credentials → the Web OAuth client → **Authorized JavaScript origins** → add
   `https://podenapata-sys.github.io` (no redirect URI needed). Add the custom domain
   here too once the clinic has one, or backup breaks the day the domain changes.
3. OAuth consent screen → **Audience** → **Publish app**.

**Publish it — do not leave it in Testing.** While the app is in Testing, Google blocks
every account that is not on the Test users list with *"has not completed the Google
verification process"*. Publishing normally means a Google review, but not here: the
dashboard asks only for `drive.file`, which lets it see **files it created itself** and
nothing else in your Drive. Google classes that as non-sensitive, so a `drive.file`-only
app can be published straight away with no review, no video, and no security assessment.

If you would rather not publish, the alternative is OAuth consent screen → **Test users**
→ add every Google account that will press *Backup to Drive*. That works, but you must
remember to add each new account, and nobody else can use the button.

The client ID lives in `assets/firebase-config.js` as `window.OMEGA_GOOGLE_CLIENT_ID`.
Leave it empty to hide the Drive button. The app requests the `drive.file` scope only,
so it can **only see files it created** — it cannot read the rest of your Drive.

---

## If something goes wrong

| Symptom | Cause / fix |
|---|---|
| "Excel engine is not loaded" | The SheetJS file did not download. Check the connection and reload. |
| Records vanished | If the strip says ☁ synced, press Connect and sign in — they will come back. If you were never signed in, browsing data was cleared; restore from your last Excel backup via Import. |
| Strip says ⚠ could not sync | Usually the Firestore rules are missing the `records` block — see setup. Records are still safe in this browser meanwhile. |
| Records differ between two devices | One of them is not signed in. Check the strip says ☁ on both. |
| Deleted something by mistake | Open the 🗑 Bin tab and press ↩️ Restore. You have 30 days. |
| A patient is missing from the totals | Check the Bin — if it was deleted, restore it. |
| Bin tab is not visible | It only appears when something is in it. |
| Sign-in error mentioning app-check | App Check enforcement is on — see the App Check section above. |
| "Couldn't load Firebase (offline?)" | No internet, or a network blocking Google. Bookings still arrive by WhatsApp. |
| Drive backup fails | Usually the Authorized JavaScript origin, the Drive API not being enabled, or the account not being a Test user. |
| Website bookings not appearing | Confirm you pressed Connect and signed in; check the Firestore rules were published. |

---

## For developers

Everything is in `dashboard.html` — three scripts, no build step:

1. **Records app** (classic script) — the `records[]` array, rendering, filtering, Excel
   import/export. Persists to localStorage under `od_records` (offline cache) and mirrors
   to the cloud through `window.__odCloud` when the module installs it.
2. **Website bookings** (ES module) — Firebase Auth + Firestore `onSnapshot`.
3. **Drive backup** (classic script) — Google Identity Services + Drive REST.

They communicate only through globals, so neither script imports the other:
`window.__odBackupBlob()`, `window.__odImportBooking()`, plus the sync bridge —
`window.__odCloud` (installed by the module: `save`/`saveMany`/`remove`),
`window.__odApplyCloud()` and `window.__odLocalRecords()` (exposed by the records app),
and `window.__odSyncStatus()` for the status strip.

Records sync to the `records` collection keyed by the record's own `_id`. On the first
snapshot after sign-in, any local record missing from the cloud is uploaded rather than
overwritten, so signing in never loses work done offline.

The tap handler lives in `assets/admin-gate.js`, loaded on all 28 public pages beside
`brand-highlight.js`. It is deliberately NOT in `assets/app.js`, which only 3 pages load —
that is why the gateway used to work on the homepage only. Every page needs
`<meta name="page-root">` set correctly for the redirect to resolve (`../` in `services/`,
`blog/` and `gallery/`; empty at the root).

Do not load the gateway twice on one page: two listeners would both count the same click
and the dashboard would open in fewer taps than intended.

Record shape:

```js
{ _id, date, mobile, id, name, service, total, paid, next }
```

`due` is never stored — it is always derived as `total - paid`.
