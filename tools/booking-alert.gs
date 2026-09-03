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

/* Who receives the alerts. Separate several with commas — every one of them gets the
   same email. Note that Google's ~100-a-day mail allowance counts RECIPIENTS, not
   messages, so two addresses means two units per booking (about 50 bookings a day
   instead of 100 — still far more than a clinic takes). */
var TO_EMAIL     = 'omegadental@gmail.com, noorayn408@gmail.com';
var SHARED_TOKEN = 'Omega.JS';                // ← must match firebase-config.js
var CLINIC_NAME  = 'Omega Dental';

/** TO_EMAIL as MailApp wants it. Typing a list by hand invites a trailing comma, a
    stray semicolon or a line break, and MailApp rejects the whole send for one bad
    entry — so anything without an "@" is dropped rather than taking the alert down
    with it. */
function _recipients() {
  return String(TO_EMAIL || '')
    .split(/[,;\s]+/)
    .filter(function (a) { return a.indexOf('@') > 0; })
    .join(',');
}

/* A project may only have one doPost, so this is the single front door: the booking
   form and the content editor both arrive here and are told apart by `action`. */
function doPost(e) {
  try {
    /* Pressing Run on doPost from the editor gets here with no request attached. The
       catch below would swallow the TypeError and report "Execution completed" having
       sent nothing — which reads exactly like a broken email. Say so instead. */
    if (!e || !e.postData) {
      console.log('doPost is the website\'s entry point — it cannot be run from the editor, '
                + 'because there is no booking attached to it.');
      console.log('To test the email: pick sendTestAlert in the function dropdown above, '
                + 'then press Run. To see the setup: pick checkAlertSetup.');
      return _ok('no request');
    }

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
      ['Address',   _address(d) || '—']
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

    var to = _recipients();
    if (!to) return _ok('no recipient');   // logged to the sheet regardless, above
    MailApp.sendEmail({ to: to, subject: subj, htmlBody: body, name: CLINIC_NAME + ' website' });
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
var SHEET_HEADERS = ['Received', 'Patient', 'Phone', 'Address', 'Treatment',
                     'Requested date', 'Requested time', 'Emergency', 'Status'];
var ADDRESS_COL   = 4;   // where Address sits in SHEET_HEADERS

/** The booking form used to ask "where are you coming from?" and send it as `msg`.
    It asks for the address outright now. Read both so a visitor still on a cached
    copy of the old page lands in the Address column rather than nowhere. */
function _address(d) {
  return _clean(d && d.address) || _clean(d && d.msg);
}

/** Adds one booking to the top of the sheet. Newest first, so the clinic opens it
    and sees today without scrolling.

    Each value is placed under its OWN heading rather than at a fixed position. The sheet
    is the clinic's own file: they can reorder the columns, and the Address column arrives
    by migration on a sheet that predates it. Writing by position meant one unexpected
    column put every phone number under Treatment. */
function _logBooking(d) {
  var sh = _bookingsSheet();
  if (!sh) return;
  var width = Math.max(sh.getLastColumn(), SHEET_HEADERS.length);
  var head  = sh.getRange(1, 1, 1, width).getValues()[0];
  var byName = {
    'received':       Utilities.formatDate(new Date(), 'Asia/Dhaka', 'dd-MM-yyyy HH:mm'),
    'patient':        _clean(d.name),
    'phone':          _clean(d.phone),
    'address':        _address(d),
    'note':           _address(d),   // an un-migrated sheet still says Note
    'treatment':      _clean(d.service),
    'requested date': _clean(d.date),
    'requested time': _clean(d.time),
    'emergency':      d.emerg ? 'YES' : '',
    'status':         'New'
  };
  var row = head.map(function (h) {
    var k = String(h).trim().toLowerCase();
    return byName.hasOwnProperty(k) ? byName[k] : '';
  });
  sh.insertRowBefore(2);
  sh.getRange(2, 1, 1, row.length).setValues([row]);
}

/** The sheet, made on first use and remembered afterwards. */
function _bookingsSheet() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('BOOKINGS_SHEET_ID');
  if (id) {
    try {
      var existing = SpreadsheetApp.openById(id).getSheets()[0];
      _addAddressColumn(existing);
      return existing;
    }
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
  sh.setColumnWidth(ADDRESS_COL, 220);
  props.setProperty('BOOKINGS_SHEET_ID', ss.getId());
  return sh;
}

/** Sheets made before the booking form asked for an address have no Address heading,
    and _logBooking would write straight past them into the wrong columns.

    Their **Note** column already holds the answer to "where are you coming from?" — the
    same question, asked less directly — so it is renamed and slid into place rather than
    left behind: no history is lost and nothing ends up in a column it does not belong in.
    A sheet with no Note column at all just gains an empty one.

    Runs once. Every booking after that finds the heading and returns immediately. */
function _addAddressColumn(sh) {
  try {
    var head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    var noteAt = -1;
    for (var i = 0; i < head.length; i++) {
      var h = String(head[i]).trim().toLowerCase();
      if (h === 'address') return;            // already migrated
      if (h === 'note') noteAt = i + 1;       // getRange is 1-based
    }
    if (noteAt > 0) {
      sh.getRange(1, noteAt).setValue('Address');
      if (noteAt !== ADDRESS_COL) {
        sh.moveColumns(sh.getRange(1, noteAt, sh.getMaxRows(), 1), ADDRESS_COL);
      }
    } else {
      sh.insertColumnAfter(ADDRESS_COL - 1);
      sh.getRange(1, ADDRESS_COL)
        .setValue('Address').setFontWeight('bold').setBackground('#eef4f7');
    }
    sh.setColumnWidth(ADDRESS_COL, 220);
  } catch (e) { console.warn('Address column: ' + e); }
}

function _sheetUrl() {
  var id = PropertiesService.getScriptProperties().getProperty('BOOKINGS_SHEET_ID');
  return id ? 'https://docs.google.com/spreadsheets/d/' + id : '';
}

/* ---------- checking it, when an alert does not arrive ----------

   An alert crosses three separate things, and a failure in any one of them looks
   identical from the outside — nothing in the inbox. So test them one at a time
   rather than guessing:

     1. does the mail itself work?     -> run sendTestAlert() below
     2. is the web app reachable?      -> open the /exec URL in a browser
     3. did the website's post arrive?  -> Executions in the left sidebar

   Both functions below run straight from the editor with the ▷ Run button. They do
   NOT need a deployment: a deployment only affects what the /exec URL serves, so a
   test can be run the moment the file is saved. */

/** Sends one alert to TO_EMAIL, exactly as a real booking would, and logs the mail
    quota that is left. If this arrives but real bookings do not, the email is fine
    and the problem is the website reaching the script — check Executions. */
function sendTestAlert() {
  var to = _recipients();
  if (!to) { console.log('NO VALID ADDRESS in TO_EMAIL — nothing to send to.'); return; }
  var n = to.split(',').length;
  var left = MailApp.getRemainingDailyQuota();
  console.log('Recipients (' + n + '): ' + to);
  console.log('Sends left today: ' + left + '  (each booking uses ' + n + ')');
  if (left < n) {
    console.log('QUOTA SPENT. Google allows about 100 a day; it resets after 24 hours. '
              + 'No alert can be sent until then.');
    return;
  }
  MailApp.sendEmail({
    to: to,
    subject: '[TEST] ' + CLINIC_NAME + ' booking alert',
    htmlBody: '<div style="font-family:Arial,sans-serif;font-size:15px;color:#1f2d3d">'
            + '<h2 style="color:#173a63;margin:0 0 12px">This is a test</h2>'
            + '<p>If you can read this, alert emails are working and reaching '
            + to + '. Nobody booked anything — you can delete this.</p>'
            + '<p style="color:#6b7a8c;font-size:12px">Sent from the Apps Script editor at '
            + Utilities.formatDate(new Date(), 'Asia/Dhaka', 'dd-MM-yyyy HH:mm') + '.</p></div>',
    name: CLINIC_NAME + ' website'
  });
  console.log('Sent. Check the inbox, and the Spam and Promotions tabs.');
}

/** Prints everything the alert needs, in one run: who it emails, the token the
    website must match, how much mail quota is left, and where the sheet is. */
function checkAlertSetup() {
  var to = _recipients();
  console.log('Alerts are emailed to : ' + (to || 'NOBODY — TO_EMAIL has no valid address'));
  console.log('Number of recipients  : ' + (to ? to.split(',').length : 0)
            + '   (each booking uses that many of the daily sends)');
  console.log('Token the site must send: ' + SHARED_TOKEN
            + '   (must equal OMEGA_ALERT_TOKEN in assets/firebase-config.js)');
  console.log('Emails left to send today: ' + MailApp.getRemainingDailyQuota());
  console.log('Bookings sheet: ' + (_sheetUrl() || 'not created yet'));
  console.log('Script owner (mail is sent from here): ' + Session.getEffectiveUser().getEmail());
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
