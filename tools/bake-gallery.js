#!/usr/bin/env node
/* Bake the gallery grid and filter tabs into gallery/index.html as static HTML.
 *
 * Why: the grid is built entirely by renderGallery() from window.OMEGA_CONTENT, so with
 * JavaScript off (or content.js failing to load) the page renders its heading and then
 * nothing — 53 before/after photos, which are the entire point of the page, vanish. The
 * clinic is shared over WhatsApp and Facebook in-app browsers, where a blocked or slow
 * script is a real outcome, not a hypothetical.
 *
 * The baked markup is byte-identical in shape to what renderGallery() produces, in Bangla
 * (the site default). On load the IIFE rebuilds the tabs and renderGallery() replaces the
 * grid's innerHTML, so behaviour with JS on is unchanged — the bake is purely a floor.
 *
 * Idempotent: sentinel comments bound the baked region, so re-running replaces it.
 * Run after any change to GALLERY / GALLERY_CATS in assets/content.js.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PAGE = path.join(ROOT, "gallery", "index.html");

global.window = {};
require(path.join(ROOT, "assets", "content.js"));
const C = global.window.OMEGA_CONTENT || {};
const CATS = C.galleryCats || {};
const GAL = C.gallery || [];

// Attribute-safe escape. Captions carry "&" ("Scaling & Polishing"), which must not be
// left bare in a baked attribute even though innerHTML tolerates it at runtime.
const esc = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function filterHtml() {
  let h = '<button class="gal-tag active" data-cat="all" data-en="All" data-bn="সব">সব</button>';
  for (const k of Object.keys(CATS)) {
    const c = CATS[k];
    h += '<button class="gal-tag" data-cat="' + esc(k) + '" data-en="' + esc(c.en) +
         '" data-bn="' + esc(c.bn) + '">' + esc(c.bn) + "</button>";
  }
  return h;
}

function gridHtml() {
  return GAL.map((g) => {
    const src = "../assets/services/" + g.photo + ".jpg";
    const thumb = src.replace("/assets/services/", "/assets/services/cards/");
    const cap = esc(g.bn || g.en);
    let h = '<div class="gal-item" data-cat="' + esc(g.cat) + '">';
    h += '<div class="gal-head">';
    h += '<span class="gal-avatar"><img src="../assets/mark-square.png?v=1" alt="Omega Dental"></span>';
    h += '<span class="gal-user">omega_dental</span>';
    h += '<span class="gal-more">&#8943;</span>';
    h += "</div>";
    h += '<div class="gal-photo" title="' + cap + '">';
    h += '<img src="' + esc(thumb) + '" alt="' + cap + '" loading="lazy" decoding="async"' +
         ' data-full="' + esc(src) + '"' +
         " onerror=\"if(this.dataset.fb){this.closest('.gal-item').style.display='none'}" +
         "else{this.dataset.fb=1;this.src=this.dataset.full}\">";
    h += '<span class="gal-wm" aria-hidden="true"><img src="../assets/mark-square.png?v=1" alt="">' +
         '<span class="gal-wm-tx">OMEGA<b>DENTAL</b></span></span>';
    h += "</div>";
    h += '<div class="gal-caption"><b>omega_dental</b>' +
         '<span data-en="' + esc(g.en) + '" data-bn="' + esc(g.bn) + '">' + cap + "</span></div>";
    h += "</div>";
    return h;
  }).join("\n");
}

function bake(html, id, inner) {
  const open = new RegExp('(<div class="[^"]*" id="' + id + '">)' +
                          "(?:<!--baked-->[\\s\\S]*?<!--/baked-->)?(</div>)");
  if (!open.test(html)) throw new Error("could not find #" + id + " in " + PAGE);
  return html.replace(open, "$1<!--baked-->\n" + inner + "\n<!--/baked-->$2");
}

let html = fs.readFileSync(PAGE, "utf8");
const before = html;
html = bake(html, "galFilter", filterHtml());
html = bake(html, "galGrid", gridHtml());

if (html === before) {
  console.log("gallery: already up to date");
} else {
  fs.writeFileSync(PAGE, html);
  console.log("gallery: baked " + GAL.length + " photos and " +
              (Object.keys(CATS).length + 1) + " filter tabs into gallery/index.html");
}
