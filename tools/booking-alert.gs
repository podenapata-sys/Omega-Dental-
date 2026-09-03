/**
 * Omega Dental — free booking alerts by email.
 *
 * The website has no server, so this small Google Apps Script acts as one. It
 * receives a booking from book.html and emails it to the clinic, which the Gmail
 * app on a phone shows as a notification.
 *
 * It also appends every booking to a Google Sheet in the clinic's own Drive, so
 * there is a complete list to open in Excel without anyone re-typing anything.
 * The sheet is created automatically on the first booking; run bookingsSheetUrl()
 * from the editor to get its link.
 *
 * Free: MailApp allows about 100 emails a day on a normal Google account, far
 * more than a clinic will ever book in a day.
 *
 * ── SETUP (about five minutes, once) ────────────────────────────────────────
 * 1. Go to script.google.com and press "New project".
 * 2. Delete whatever is in the editor and paste this whole file in.
 * 3. Change TO_EMAIL below to the address that should receive the alerts, and
 *    change SHARED_TOKEN to any random word of your own.
 * 4. Press Deploy → New deployment → type "Web app".
 *      Execute as:      Me
 *      Who has access:  Anyone
 *    Press Deploy, then Authorise access and allow it (Google will warn that
 *    the app is not verified — that is normal for your own script; choose
 *    Advanced → Go to project).
 * 5. Copy the Web app URL it gives you.
 * 6. Put that URL and the same token into assets/firebase-config.js:
 *      window.OMEGA_ALERT_URL   = "https://script.google.com/macros/s/..../exec";
 *      window.OMEGA_ALERT_TOKEN = "your-random-word";
 *
 * ── A NOTE ON THE TOKEN ─────────────────────────────────────────────────────
 * The token sits in the website's page source, so anyone determined can read
 * it. It is a speed bump against random bots, not a secret. The worst that can
 * happen is junk arriving in the inbox below — the script can only ever email
 * that one fixed address, and it can never read or change anything else.
 */

var TO_EMAIL     = 'omegadental@gmail.com';   // ← who receives the alerts
var SHARED_TOKEN = 'Omega.JS';                // ← must match firebase-config.js
var CLINIC_NAME  = 'Omega Dental';

/* A project may only have one doPost, so this is the single front door: the booking
   form and the content editor both arrive here and are told apart by `action`. */
function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);

    /* The content editor. Guarded by a Firebase sign-in inside publishContent(), not by
       SHARED_TOKEN — that token is in the website's page source and must never be
       enough to write to the repository. Defined in publish.gs. */
    if (d && d.action === 'publish') return _ok(JSON.stringify(publishContent(d)));

    if (String(d.token || '') !== SHARED_TOKEN) return _ok('ignored');

    var name  = _clean(d.name)    || '(no name given)';
    var phone = _clean(d.phone);
    var when  = [_clean(d.date), _clean(d.time)].filter(String).join(' at ') || 'not specified';
    var subj  = (d.emerg ? '[EMERGENCY] ' : '') + 'New booking — ' + name;

    /* Written down before anything else. If the mail quota is spent or Gmail is having
       a bad day the booking is still recorded, and building the email afterwards means
       even the very first one can link to the sheet that was just created. */
    try { _logBooking(d); } catch (logErr) { console.warn('Sheet log failed: ' + logErr); }

    var rows = [
      ['Patient',   name],
      ['Phone',     phone ? '<a href="tel:' + phone + '">' + phone + '</a>' : '(not given)'],
      ['Treatment', _clean(d.service) || 'not specified'],
      ['Wants',     when],
      ['Note',      _clean(d.msg) || '—']
    ];
    var body = '<div style="font-family:Arial,sans-serif;font-size:15px;color:#1f2d3d">'
      + (d.emerg ? '<p style="background:#fde8e8;color:#c0392b;padding:10px;border-radius:8px">'
                 + '<b>Marked as an emergency / same-day request.</b></p>' : '')
      + '<h2 style="color:#173a63;margin:0 0 12px">New booking from the website</h2>'
      + '<table cellpadding="7" style="border-collapse:collapse">';
    for (var i = 0; i < rows.length; i++) {
      body += '<tr>'
           +  '<td style="color:#6b7a8c">' + rows[i][0] + '</td>'
           +  '<td><b>' + rows[i][1] + '</b></td></tr>';
    }
    body += '</table>'
      + (phone ? '<p style="margin-top:16px">'
               + '<a href="https://wa.me/88' + phone.replace(/\D/g, '') + '"'
               + ' style="background:#25D366;color:#fff;padding:10px 16px;border-radius:8px;'
               + 'text-decoration:none;font-weight:bold">Reply on WhatsApp</a></p>' : '')
      + '<p style="color:#6b7a8c;font-size:12px;margin-top:20px">'
      + 'Sent automatically by the ' + CLINIC_NAME + ' website. It is also saved in your dashboard'
      + (_sheetUrl() ? ' and in your <a href="' + _sheetUrl() + '">bookings sheet</a>' : '')
      + '.</p></div>';

    MailApp.sendEmail({ to: TO_EMAIL, subject: subj, htmlBody: body, name: CLINIC_NAME + ' website' });
    return _ok('sent');
  } catch (err) {
    // never throw: a failed alert must not affect the patient's booking
    return _ok('error');
  }
}

/* Visiting the URL in a browser should say something friendly rather than error. */
function doGet() {
  return _ok(CLINIC_NAME + ' booking alerts are running.');
}

/* ---------- the bookings sheet ---------- */

var SHEET_NAME    = 'Omega Dental — Website Bookings';
var SHEET_HEADERS = ['Received', 'Patient', 'Phone', 'Treatment', 'Requested date',
                     'Requested time', 'Note', 'Emergency', 'Status'];

/** Adds one booking to the top of the sheet. Newest first, so the clinic opens it
    and sees today without scrolling. */
function _logBooking(d) {
  var sh = _bookingsSheet();
  if (!sh) return;
  sh.insertRowBefore(2);
  sh.getRange(2, 1, 1, SHEET_HEADERS.length).setValues([[
    Utilities.formatDate(new Date(), 'Asia/Dhaka', 'dd-MM-yyyy HH:mm'),
    _clean(d.name),
    _clean(d.phone),
    _clean(d.service),
    _clean(d.date),
    _clean(d.time),
    _clean(d.msg),
    d.emerg ? 'YES' : '',
    'New'
  ]]);
}

/** The sheet, made on first use and remembered afterwards. */
function _bookingsSheet() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('BOOKINGS_SHEET_ID');
  if (id) {
    try { return SpreadsheetApp.openById(id).getSheets()[0]; }
    catch (e) { /* deleted or in someone's bin — fall through and make a new one */ }
  }
  var ss = SpreadsheetApp.create(SHEET_NAME);
  var sh = ss.getSheets()[0];
  sh.getRange(1, 1, 1, SHEET_HEADERS.length)
    .setValues([SHEET_HEADERS]).setFontWeight('bold').setBackground('#eef4f7');
  sh.setFrozenRows(1);
  /* Phone as TEXT. A spreadsheet reads 01711223344 as a number and drops the leading
     zero, which makes every Bangladeshi mobile in the file wrong. */
  sh.getRange('C:C').setNumberFormat('@');
  sh.setColumnWidth(1, 130);
  sh.setColumnWidth(7, 220);
  props.setProperty('BOOKINGS_SHEET_ID', ss.getId());
  return sh;
}

function _sheetUrl() {
  var id = PropertiesService.getScriptProperties().getProperty('BOOKINGS_SHEET_ID');
  return id ? 'https://docs.google.com/spreadsheets/d/' + id : '';
}

/** Run this from the editor to find the sheet. */
function bookingsSheetUrl() {
  var url = _sheetUrl();
  console.log(url || 'No sheet yet — it is created when the first booking arrives.');
  return url;
}

function _clean(v) {
  return String(v == null ? '' : v).replace(/[<>]/g, '').slice(0, 300).trim();
}
function _ok(msg) {
  return ContentService.createTextOutput(msg).setMimeType(ContentService.MimeType.TEXT);
}
