/**
 * Omega Dental — free booking alerts by email.
 *
 * The website has no server, so this small Google Apps Script acts as one. It
 * receives a booking from book.html and emails it to the clinic, which the Gmail
 * app on a phone shows as a notification.
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
var SHARED_TOKEN = 'change-this-word';        // ← must match firebase-config.js
var CLINIC_NAME  = 'Omega Dental';

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    if (String(d.token || '') !== SHARED_TOKEN) return _ok('ignored');

    var name  = _clean(d.name)    || '(no name given)';
    var phone = _clean(d.phone);
    var when  = [_clean(d.date), _clean(d.time)].filter(String).join(' at ') || 'not specified';
    var subj  = (d.emerg ? '[EMERGENCY] ' : '') + 'New booking — ' + name;

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
      + 'Sent automatically by the ' + CLINIC_NAME + ' website. It is also saved in your dashboard.'
      + '</p></div>';

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

function _clean(v) {
  return String(v == null ? '' : v).replace(/[<>]/g, '').slice(0, 300).trim();
}
function _ok(msg) {
  return ContentService.createTextOutput(msg).setMimeType(ContentService.MimeType.TEXT);
}
