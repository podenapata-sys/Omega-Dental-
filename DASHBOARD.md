# Omega Dental — Admin Dashboard

A private, password-protected page for recording patient visits, tracking payments and
exporting the data to Excel. It is not linked from anywhere on the site and is excluded
from search engines (`noindex, nofollow`).

---

## Opening it

**Tap the Omega Dental logo 5 times, quickly** (within about 1.5 seconds between taps),
from any page on the site. Then enter the PIN.

```
PIN: 2518
```

The direct address is `/dashboard.html`, but the 5-tap route means you never have to type
it on a shared screen. "Lock" returns you to the PIN screen.

> To change the PIN, edit `DEFAULT_PIN` near the top of the records script in
> `dashboard.html`. It is stored in the page itself, so treat it as a *privacy* screen
> that keeps casual eyes out — not as bank-grade security.

---

## Where your data lives — read this once

Patient records are saved in **your browser's own storage on the device you added them
on**. They are not uploaded anywhere.

That means:

- Records added on the clinic PC are **not** visible on your phone, and vice versa.
- **Clearing your browsing data, or "clear cookies and site data", erases the records.**
- A different browser on the same computer is a different, empty dashboard.

**So back up regularly.** Use "Backup all (Excel)" or "Backup to Drive" — see below.
Website bookings are the exception: those live in Firebase and appear on every device.

---

## Day-to-day use

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
those buttons at the top. Deleting asks for confirmation and **cannot be undone** — so
keep backups.

### Views and search
- **Day** — one date, chosen with the date picker.
- **This Week** — the last 7 days, ending today.
- **Month** — one calendar month, chosen with the month picker.
- **All** — everything.

The **search box ignores the date filter on purpose** and searches all your records by
name, mobile, Customer ID or service — so you can find a patient without remembering when
they came. Clear the box to return to the selected view.

The four stat cards always reflect what is currently on screen. "Patients (in view)"
counts **visits**, so a patient who came three times counts three times.

---

## Backups

| Button | What it does |
|---|---|
| **Download this view (Excel)** | Exports exactly what is on screen — use with the Month tab for a monthly sheet. |
| **Backup all (Excel)** | Two sheets: every record, plus a month-by-month summary. |
| **Backup to Drive** | Same workbook, uploaded to an "Omega Dental Backups" folder in your Google Drive. |
| **Import** | Restores an Excel/CSV backup. |

**Importing asks you to choose:**
- **OK / Replace** — deletes the records on this device first, then loads the file. Use
  this when moving to a new computer.
- **Cancel / Merge** — keeps what is there and adds only records not already present.
  Re-importing the same backup twice will **not** create duplicates.

A practical routine: **Backup all (Excel) once a week**, and keep the file somewhere other
than the clinic PC.

---

## Website bookings (live)

When someone books through the website, the booking appears in the **Website Bookings**
panel within a second or two, with a sound and a browser notification.

Press **Connect** and sign in with the clinic's Firebase email and password. Each booking
has:

- **➕ Add to records** — creates a record from it. The **visit date is set to today** and
  the date the patient requested becomes their **Next Appointment**. Total and Paid start
  at 0 for you to fill in.
- **✓ Handled** — clears it from the list.

Notifications only arrive while the dashboard is open in a browser tab.

---

## One-time setup (already done — for reference)

### Firebase
1. **Firestore Database** → Create database (production mode).
2. **Authentication** → Sign-in method → enable **Email/Password**, then add one user
   (the clinic's account).
3. **Firestore → Rules** → paste the contents of [`firestore.rules`](firestore.rules)
   and Publish.
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
   `https://podenapata-sys.github.io` (no redirect URI needed).
3. OAuth consent screen → if it is in "Testing", add the clinic's Google account under
   **Test users**.

The client ID lives in `assets/firebase-config.js` as `window.OMEGA_GOOGLE_CLIENT_ID`.
Leave it empty to hide the Drive button. The app requests the `drive.file` scope only,
so it can **only see files it created** — it cannot read the rest of your Drive.

---

## If something goes wrong

| Symptom | Cause / fix |
|---|---|
| "Excel engine is not loaded" | The SheetJS file did not download. Check the connection and reload. |
| Records vanished | Browsing data was cleared, or you are on a different device/browser. Restore from your last Excel backup via Import. |
| Sign-in error mentioning app-check | App Check enforcement is on — see the App Check section above. |
| "Couldn't load Firebase (offline?)" | No internet, or a network blocking Google. Bookings still arrive by WhatsApp. |
| Drive backup fails | Usually the Authorized JavaScript origin, the Drive API not being enabled, or the account not being a Test user. |
| Website bookings not appearing | Confirm you pressed Connect and signed in; check the Firestore rules were published. |

---

## For developers

Everything is in `dashboard.html` — three scripts, no build step:

1. **Records app** (classic script) — localStorage under the key `od_records`, rendering,
   filtering, Excel import/export.
2. **Website bookings** (ES module) — Firebase Auth + Firestore `onSnapshot`.
3. **Drive backup** (classic script) — Google Identity Services + Drive REST.

They communicate only through two globals: `window.__odBackupBlob()` and
`window.__odImportBooking()`.

The 5-tap logo handler lives in `assets/app.js` (search for "Private admin"). Sub-pages
need `<meta name="page-root">` set correctly for the redirect to resolve.

Record shape:

```js
{ _id, date, mobile, id, name, service, total, paid, next }
```

`due` is never stored — it is always derived as `total - paid`.
