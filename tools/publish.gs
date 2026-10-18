/**
 * Omega Dental — publish content edits to the website.
 *
 * The content editor (admin-content.html) runs in a browser and cannot write files.
 * It sends its changes here; this commits them to the repository, and GitHub Pages
 * rebuilds the site by itself a minute or so later.
 *
 * WHY THE TOKEN LIVES HERE AND NOT IN THE BROWSER
 * Writing to the repository needs a GitHub token. Kept in the page it would sit in
 * localStorage on whatever device the clinic uses, readable by anything that gets a
 * moment alone with that browser. Here it never leaves Google's servers, and the only
 * thing the browser can ask for is "commit these files" — nothing else in the account.
 *
 * WHO IS ALLOWED
 * The caller must send a Firebase ID token from a signed-in session, and it must belong
 * to FB_EMAIL — the clinic's own dashboard login. The web app is open to anyone (the
 * booking form needs that), so this check is what stops a stranger publishing.
 *
 * ── SETUP (once) ────────────────────────────────────────────────────────────
 * 1. Make a GitHub token: github.com → Settings → Developer settings →
 *    Personal access tokens → Fine-grained tokens → Generate new token.
 *      Repository access: Only select repositories → this repository
 *      Permissions: Repository permissions → Contents → Read and write
 *    Nothing else. Copy the token (it is shown once).
 * 2. Apps Script → Project Settings → Script Properties → add
 *      GITHUB_TOKEN = the token you just copied
 *    FB_API_KEY and FB_EMAIL are already there for the reminder; this reuses them.
 * 3. Deploy → Manage deployments → New version. The editor talks to the same /exec
 *    URL the booking form uses.
 * 4. Select checkPublishSetup in the toolbar and press Run. The log says whether the
 *    token works and when it expires. Run it again after renewing the token.
 *
 * TOKEN EXPIRY
 * Fine-grained tokens expire (at most a year). When one does, publishing stops with a
 * GitHub 401. Every publish reads the expiry date GitHub sends back, and from 30 days
 * before it the editor shows a warning under "Published". To renew: make a new token
 * as in step 1, paste it over GITHUB_TOKEN, run checkPublishSetup.
 */

var GITHUB_REPO   = 'podenapata-sys/Omega-Dental-';
/* The branch GitHub Pages builds from. Must match .github/workflows/pages.yml — commit
   to anything else and the publish succeeds while the website never changes. */
var GITHUB_BRANCH = 'main';
var GITHUB_API    = 'https://api.github.com';

/** Called from doPost in Code.gs when the payload carries action:"publish". */
function publishContent(d) {
  /* Pressing Run on this in the editor calls it with nothing, which used to throw a
     TypeError that looked like a real fault. It is driven by the website editor. */
  if (!d || typeof d !== 'object')
    return { ok: false, error: 'publishContent is called by the website editor, not run from ' +
             'this toolbar. Open the dashboard, press Connect, then Publish to website.' };

  var who = _verifyClinic(d.idToken);
  if (!who.ok) return { ok: false, error: who.error };

  var files = d.files;
  if (!files || !files.length) return { ok: false, error: 'Nothing to publish.' };
  if (files.length > 60) return { ok: false, error: 'Too many files in one publish.' };

  for (var i = 0; i < files.length; i++) {
    var bad = _pathAllowed(files[i].path) || _contentAllowed(files[i]);
    if (bad) return { ok: false, error: bad };
  }

  var token = PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN');
  if (!token) return { ok: false, error: 'GITHUB_TOKEN is not set in Script Properties.' };

  try {
    var out = _commit(token, files, d.message || 'Update website content');
    var warn = _expiryWarning();
    if (warn) out.warning = warn;
    return out;
  } catch (e) {
    if (/GitHub 401/.test(String(e)))
      return { ok: false, error: 'The publishing key (GITHUB_TOKEN) has expired or was revoked. ' +
               'Nothing was published. Ask your developer to renew it.' };
    return { ok: false, error: String(e) };
  }
}

/* ---------- token expiry ---------- */

/* GitHub sends `github-authentication-token-expiration: 2026-11-10 12:00:00 UTC` on
   every response to a token that expires. _gh keeps the last one it saw. */
var _tokenExpiry = null;
function _readExpiry(res) {
  var h = res.getAllHeaders();
  for (var k in h) {
    if (String(k).toLowerCase() !== 'github-authentication-token-expiration') continue;
    var m = /^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2})/.exec(String(h[k]));
    if (m) _tokenExpiry = new Date(m[1] + 'T' + m[2] + 'Z');
  }
}
function _daysLeft() {
  return _tokenExpiry ? Math.floor((_tokenExpiry.getTime() - Date.now()) / 86400000) : null;
}
function _expiryWarning() {
  var days = _daysLeft();
  if (days === null || days >= 30) return '';
  return 'The publishing key expires on ' + _tokenExpiry.toISOString().slice(0, 10) +
         ' (' + Math.max(days, 0) + ' days). Ask your developer to renew it, or publishing will stop.';
}

/** Run by hand from the Apps Script toolbar after setup or after renewing the token.
    Reads only; changes nothing. */
function checkPublishSetup() {
  var props = PropertiesService.getScriptProperties();
  var lines = [];
  ['GITHUB_TOKEN', 'FB_API_KEY', 'FB_EMAIL'].forEach(function (k) {
    lines.push(k + ': ' + (props.getProperty(k) ? 'set' : 'MISSING'));
  });
  var token = props.getProperty('GITHUB_TOKEN');
  if (token) {
    try {
      var repo = _gh(token, 'get', '/repos/' + GITHUB_REPO);
      var push = repo.permissions && repo.permissions.push;
      _gh(token, 'get', '/repos/' + GITHUB_REPO + '/git/ref/heads/' + GITHUB_BRANCH);
      lines.push('GitHub: token works, can ' + (push ? '' : 'NOT ') + 'write to ' + GITHUB_REPO +
                 ' (branch ' + GITHUB_BRANCH + ')');
      var days = _daysLeft();
      lines.push(days === null ? 'Token expiry: none reported (classic token without expiry)'
                 : 'Token expires: ' + _tokenExpiry.toISOString().slice(0, 10) + ' — ' + days + ' days left' +
                   (days < 30 ? '  ← RENEW SOON' : ''));
    } catch (e) {
      lines.push('GitHub: FAILED — ' + String(e).slice(0, 200));
    }
  }
  var report = lines.join('\n');
  Logger.log(report);
  return report;
}

/* ---------- who is asking ---------- */

/** True only for a signed-in session belonging to the clinic's own account. */
function _verifyClinic(idToken) {
  var props = PropertiesService.getScriptProperties();
  var key = props.getProperty('FB_API_KEY'), want = props.getProperty('FB_EMAIL');
  if (!key || !want) return { ok: false, error: 'FB_API_KEY / FB_EMAIL are not set in Script Properties.' };
  if (!idToken) return { ok: false, error: 'Not signed in.' };

  try {
    var res = UrlFetchApp.fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + encodeURIComponent(key),
      { method: 'post', contentType: 'application/json', muteHttpExceptions: true,
        payload: JSON.stringify({ idToken: idToken }) });
    if (res.getResponseCode() !== 200) return { ok: false, error: 'Your sign-in has expired. Sign in again.' };
    var users = (JSON.parse(res.getContentText()) || {}).users || [];
    var email = users.length ? String(users[0].email || '') : '';
    if (!email) return { ok: false, error: 'Your sign-in has expired. Sign in again.' };
    if (email.toLowerCase() !== String(want).toLowerCase())
      return { ok: false, error: 'That account may not publish.' };
    return { ok: true, email: email };
  } catch (e) {
    return { ok: false, error: 'Could not check the sign-in: ' + e };
  }
}

/** Only the content file and the photo folders. Nothing may escape them. */
function _pathAllowed(p) {
  p = String(p || '');
  if (!p) return 'A file had no path.';
  if (p.indexOf('..') > -1 || p.charAt(0) === '/') return 'Bad path: ' + p;
  if (p === 'assets/content.js') return '';
  if (/^assets\/services\/(cards\/|thumbs\/)?[a-z0-9-]{1,40}\.jpg$/.test(p)) return '';
  /* Doctor portraits. A separate folder from services/ so the treatment photo picker
     does not offer someone's face as a card image. Two sizes only — full and card —
     because there is no thumbnail strip for doctors. */
  if (/^assets\/doctors\/(cards\/)?[a-z0-9-]{1,40}\.jpg$/.test(p)) return '';
  return 'This publish tried to write somewhere it should not: ' + p;
}

/** What is inside each file, not just where it goes. content.js is loaded as a script on
    every page, so it must be exactly what the editor writes — a comment and
    `window.OMEGA_CONTENT = <JSON>;` — and nothing that could run. Photos must really be
    JPEGs of a sane size. Even a stolen dashboard login cannot publish code this way. */
var MAX_JPG_BYTES = 3 * 1024 * 1024, MAX_CONTENT_BYTES = 400 * 1024;
function _contentAllowed(f) {
  var bytes;
  try { bytes = Utilities.base64Decode(String(f.content || '')); }
  catch (e) { return 'A file was not valid base64: ' + f.path; }
  if (!bytes.length) return 'A file was empty: ' + f.path;

  if (/\.jpg$/.test(f.path)) {
    if (bytes.length > MAX_JPG_BYTES) return 'Photo too large (max 3 MB): ' + f.path;
    // JPEG files start FF D8 FF; Apps Script bytes are signed, so that is -1, -40, -1
    if (bytes[0] !== -1 || bytes[1] !== -40 || bytes[2] !== -1) return 'Not a JPEG photo: ' + f.path;
    return '';
  }

  if (f.path === 'assets/content.js') {
    if (bytes.length > MAX_CONTENT_BYTES) return 'content.js is unexpectedly large.';
    var text = Utilities.newBlob(bytes).getDataAsString('UTF-8');
    var m = /^\s*\/\*[\s\S]*?\*\/\s*window\.OMEGA_CONTENT = ([\s\S]*);\s*$/.exec(text);
    if (!m) return 'content.js is not in the editor\'s format.';
    var data;
    try { data = JSON.parse(m[1]); } catch (e) { return 'content.js data is not valid JSON.'; }
    if (!data || typeof data !== 'object' || !Array.isArray(data.prices) || !Array.isArray(data.services))
      return 'content.js is missing prices or services.';
    /* Every price row carries a fixed id that the service pages and treatments page
       link to (tools/sync-prices.js). A draft without them was started from the price
       list as it was before 18 Oct 2026; publishing it would put old prices back. */
    var seen = {};
    for (var i = 0; i < data.prices.length; i++) {
      var id = data.prices[i] && data.prices[i].id;
      if (typeof id !== 'string' || !/^[a-z0-9-]{1,60}$/.test(id) || seen[id])
        return 'This draft was made from an older copy of the price list, so publishing it would ' +
               'undo newer prices. Reload the editor, press "Start fresh from the live website" and ' +
               'make the change again.';
      seen[id] = 1;
    }
    return '';
  }
  return 'Unexpected file: ' + f.path;
}

/* ---------- one atomic commit ---------- */

function _gh(token, method, path, payload) {
  var opts = {
    method: method, muteHttpExceptions: true,
    headers: { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json',
               'User-Agent': 'omega-dental-content-editor' }
  };
  if (payload) { opts.contentType = 'application/json'; opts.payload = JSON.stringify(payload); }
  var res = UrlFetchApp.fetch(GITHUB_API + path, opts);
  _readExpiry(res);
  var code = res.getResponseCode(), text = res.getContentText();
  if (code < 200 || code >= 300) throw new Error('GitHub ' + code + ' on ' + path + ': ' + text.slice(0, 200));
  return JSON.parse(text || '{}');
}

/* Blobs → tree → commit → move the branch. One commit for every file, so the site is
   never rebuilt from a half-written state. */
function _commit(token, files, message) {
  var repo = '/repos/' + GITHUB_REPO;
  var ref  = _gh(token, 'get', repo + '/git/ref/heads/' + GITHUB_BRANCH);
  var headSha = ref.object.sha;
  var head = _gh(token, 'get', repo + '/git/commits/' + headSha);

  var tree = [];
  for (var i = 0; i < files.length; i++) {
    var blob = _gh(token, 'post', repo + '/git/blobs',
      { content: files[i].content, encoding: 'base64' });
    tree.push({ path: files[i].path, mode: '100644', type: 'blob', sha: blob.sha });
  }

  var newTree = _gh(token, 'post', repo + '/git/trees', { base_tree: head.tree.sha, tree: tree });
  var commit  = _gh(token, 'post', repo + '/git/commits', {
    /* No email or name here: the repository is public, and so is every commit message. */
    message: message + '\n\nPublished from the content editor.',
    tree: newTree.sha, parents: [headSha]
  });
  _gh(token, 'patch', repo + '/git/refs/heads/' + GITHUB_BRANCH, { sha: commit.sha });

  return { ok: true, commit: commit.sha.slice(0, 7), files: files.length };
}
