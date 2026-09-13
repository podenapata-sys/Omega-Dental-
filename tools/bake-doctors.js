#!/usr/bin/env node
/* Bake the doctors section into index.html as static HTML.
 *
 * Why: index.html ships `<div class="why-doc" id="doctors" style="display:none">` with an
 * empty #doctorsGrid. renderDoctors() builds the card and removes the inline display:none
 * on load, so with JavaScript off — or content.js blocked, which happens in the WhatsApp
 * and Facebook in-app browsers this clinic is shared through — the clinic's only doctor
 * does not appear on the site at all. Her name, degrees and BMDC registration are the
 * strongest credibility the page has; they should not depend on a script running.
 *
 * The baked markup matches what renderDoctors() emits (assets/app.js), in Bangla, and the
 * section ships visible when the list is non-empty. On load renderDoctors() still replaces
 * innerHTML, so behaviour with JS on is unchanged — this is a floor, not a second path.
 *
 * Idempotent: sentinel comments bound the baked region, so re-running replaces it.
 * Run after any change to DOCTORS in assets/content.js.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PAGE = path.join(ROOT, "index.html");

global.window = {};
require(path.join(ROOT, "assets", "content.js"));
const DOCTORS = (global.window.OMEGA_CONTENT || {}).doctors || [];

const esc = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Mirrors docInitials() in assets/app.js — first and last initial, "Dr." stripped.
function initials(name) {
  const parts = String(name || "").replace(/^Dr\.?\s*/i, "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "⚕";
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

/* Same rule as the gallery: follow the page's declared language, never a hard-coded one. */
const PAGE_LANG = (/<html[^>]*\sdata-lang="(en|bn)"/.exec(fs.readFileSync(PAGE, "utf8")) || [, "en"])[1];

const list = DOCTORS.filter((d) => (d.en || "").trim() || (d.bn || "").trim());

function cardHtml(d) {
  const pick = (bn, en) => PAGE_LANG === "bn"
    ? ((d[bn] || "").trim() || (d[en] || "").trim())
    : ((d[en] || "").trim() || (d[bn] || "").trim());
  const name = pick("bn", "en");
  const role = pick("rolebn", "role");
  const deg  = pick("degbn", "deg");
  const exp  = pick("expbn", "exp");
  const bio  = pick("biobn", "bio");
  const bmdc = (d.bmdc || "").trim();
  const tags = (PAGE_LANG === "bn" ? (d.tagsbn || d.tags) : (d.tags || d.tagsbn)) || [];
  const photo = (d.photo || "").trim();

  const art = photo
    ? '<img class="doc-photo" src="assets/doctors/cards/' + esc(photo) + '.jpg"' +
      ' alt="' + esc(name) + '" loading="lazy" decoding="async"' +
      " onerror=\"this.onerror=null;this.src='assets/doctors/" + esc(photo) + ".jpg'\">"
    : '<div class="doc-photo doc-initials" aria-hidden="true">' +
      esc(initials(d.en || d.bn)) + "</div>";

  let h = '<article class="doc-card">' + art + '<div class="doc-body">';
  h += '<h3 class="doc-name">' + esc(name) + "</h3>";
  if (role) h += '<p class="doc-role">' + esc(role) + "</p>";
  if (deg)  h += '<p class="doc-deg">' + esc(deg) + "</p>";
  if (exp)  h += '<p class="doc-exp">' + esc(exp) + "</p>";
  if (bmdc) h += '<p class="doc-bmdc">BMDC Reg. No. ' + esc(bmdc) + "</p>";
  if (bio)  h += '<p class="doc-bio">' + esc(bio) + "</p>";
  if (tags.length)
    h += '<div class="doc-tags">' +
         tags.map((t) => '<span class="doc-tag">' + esc(t) + "</span>").join("") +
         "</div>";
  return h + "</div></article>";
}

let html = fs.readFileSync(PAGE, "utf8");
const before = html;

// The section hides itself when there is no doctor; with one baked in, it ships visible.
const SECTION = /(<div class="why-doc" id="doctors")([^>]*)(>)/;
if (!SECTION.test(html)) throw new Error('could not find the #doctors section in index.html');
html = html.replace(SECTION, (m, open, attrs, close) =>
  open + (list.length ? attrs.replace(/\s*style="display:none"/, "") : attrs) + close);

const GRID = /(<div class="doc-grid" id="doctorsGrid">)(?:<!--baked-->[\s\S]*?<!--\/baked-->)?(<\/div>)/;
if (!GRID.test(html)) throw new Error("could not find #doctorsGrid in index.html");
html = html.replace(GRID, "$1<!--baked-->\n" + list.map(cardHtml).join("\n") + "\n<!--/baked-->$2");

if (html === before) {
  console.log("doctors: already up to date");
} else {
  fs.writeFileSync(PAGE, html);
  console.log("doctors [" + PAGE_LANG + "]: baked " + list.length + " doctor card(s) into index.html");
}
