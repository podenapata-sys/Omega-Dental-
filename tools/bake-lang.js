#!/usr/bin/env node
/* Set the site's default language and re-bake the static text to match.
 *
 *     node tools/bake-lang.js en
 *     node tools/bake-lang.js bn
 *
 * The pages are bilingual at runtime, but the HTML itself has to ship ONE language: that
 * is what a visitor sees before any script runs, what WhatsApp and Facebook read when they
 * build a link preview, and what is left if JavaScript fails outright. Flipping the default
 * therefore is not one flag — it is four things that must agree, and this changes all four
 * together so they cannot drift apart:
 *
 *   1. <html lang data-lang>              on every page
 *   2. the LANG fallback in assets/app.js and the inline one in each generated page
 *   3. the text baked between the tags — from data-en/data-bn on generated pages, and from
 *      the I18N table in app.js on the pages that use data-i18n
 *   4. the <title> and meta description, which are plain markup and not translated at all
 *
 * Point 3 is the one that bites. Leave it and a no-JS visitor reads Bangla on a site whose
 * default is English, which is worse than either language chosen consistently.
 *
 * Idempotent, and it prints what it changed.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TARGET = (process.argv[2] || "").toLowerCase();
if (TARGET !== "en" && TARGET !== "bn") {
  console.error("Usage: node tools/bake-lang.js <en|bn>");
  process.exit(1);
}
const OTHER = TARGET === "en" ? "bn" : "en";

/* ---- the I18N table, read straight out of app.js so it cannot go stale ---- */
function loadI18N() {
  const src = fs.readFileSync(path.join(ROOT, "assets", "app.js"), "utf8");
  const start = src.indexOf("const I18N");
  if (start < 0) throw new Error("could not find I18N in assets/app.js");
  // walk braces from the first { after "const I18N" to its match
  const open = src.indexOf("{", start);
  let depth = 0, end = -1, inStr = null;
  for (let i = open; i < src.length; i++) {
    const c = src[i], prev = src[i - 1];
    if (inStr) { if (c === inStr && prev !== "\\") inStr = null; continue; }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end < 0) throw new Error("unbalanced I18N object in assets/app.js");
  // eslint-disable-next-line no-eval
  return eval("(" + src.slice(open, end + 1) + ")");
}

const I18N = loadI18N();
if (!I18N[TARGET]) throw new Error(`I18N has no "${TARGET}" table`);
console.log(`I18N loaded: ${Object.keys(I18N[TARGET]).length} keys in ${TARGET}`);

const VOID = new Set(["img","br","hr","input","meta","link","source","track",
                      "area","base","col","embed","param","wbr"]);

/* Escape for element content. The attribute values were already escaped for attribute
   context, which is a superset of what content needs, so those copy across unchanged —
   but I18N strings come from JavaScript and have not been escaped at all. */
const escText = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function bakePage(file) {
  const rel = path.relative(ROOT, file);
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  let n = { attr: 0, i18n: 0 };

  // 1. the root element
  html = html.replace(/<html\s+lang="(?:en|bn)"\s+data-lang="(?:en|bn)"\s*>/,
                      `<html lang="${TARGET}" data-lang="${TARGET}">`);

  // 2. inline default in the generated pages
  html = html.replace(/(var\s+L\s*=\s*)'(?:en|bn)'/g, `$1'${TARGET}'`)
             .replace(/(localStorage\.getItem\('omega_lang'\)\s*\|\|\s*)'(?:en|bn)'/g, `$1'${TARGET}'`);

  /* 3a. data-en / data-bn elements: replace the content with the target language.
     Matches an element whose content has no nested tags — those are the leaf text nodes
     the appliers write to with textContent, so replacing the whole content is exactly what
     the script would do at runtime. */
  const RX_ATTR = new RegExp(
    `<(\\w+)((?:[^<>"]|"[^"]*")*?\\sdata-${TARGET}="([^"]*)"(?:[^<>"]|"[^"]*")*?)>([^<]*)</\\1>`, "g");
  html = html.replace(RX_ATTR, (whole, tag, attrs, want, current) => {
    if (VOID.has(tag.toLowerCase())) return whole;
    if (current === want) return whole;
    n.attr++;
    return `<${tag}${attrs}>${want}</${tag}>`;
  });

  /* 3b. data-i18n elements: look the key up in the I18N table. data-i18n-html carries
     markup in the value and is written with innerHTML at runtime, so it is not escaped
     here either — matching what the page actually does. */
  const RX_I18N = new RegExp(
    `<(\\w+)((?:[^<>"]|"[^"]*")*?\\sdata-i18n="([\\w.-]+)"(?:[^<>"]|"[^"]*")*?)>([\\s\\S]*?)</\\1>`, "g");
  html = html.replace(RX_I18N, (whole, tag, attrs, key, current) => {
    if (VOID.has(tag.toLowerCase())) return whole;
    const val = I18N[TARGET][key];
    if (val == null) return whole;                    // key not in the table: leave it alone
    if (/<\w/.test(current) && !/data-i18n-html/.test(attrs)) return whole;  // has children
    const next = /data-i18n-html/.test(attrs) ? String(val) : escText(val);
    if (current === next) return whole;
    n.i18n++;
    return `<${tag}${attrs}>${next}</${tag}>`;
  });

  if (html !== before) {
    fs.writeFileSync(file, html);
    console.log(`  ${rel.padEnd(38)} ${String(n.attr).padStart(3)} attr  ${String(n.i18n).padStart(3)} i18n`);
    return 1;
  }
  return 0;
}

/* ---- app.js fallback ---- */
function bakeApp() {
  const f = path.join(ROOT, "assets", "app.js");
  let s = fs.readFileSync(f, "utf8");
  const before = s;
  s = s.replace(/let LANG = "(?:en|bn)";/, `let LANG = "${TARGET}";`);
  if (s !== before) { fs.writeFileSync(f, s); console.log(`  assets/app.js                          LANG default -> ${TARGET}`); return 1; }
  return 0;
}

/* ---- walk ---- */
const SKIP_DIRS = new Set([".git", "node_modules", "tools", ".github", "assets"]);
const SKIP_FILES = new Set(["dashboard.html", "admin-content.html"]);
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(p, out); }
    else if (e.name.endsWith(".html") && !SKIP_FILES.has(e.name)) out.push(p);
  }
  return out;
}

console.log(`Baking default language: ${TARGET} (was ${OTHER} where it differed)\n`);
let changed = bakeApp();
for (const f of walk(ROOT)) changed += bakePage(f);
console.log(`\n${changed} file(s) changed.`);
console.log("Run the bake tools afterwards so the gallery and doctor cards match:");
console.log("  node tools/bake-gallery.js && node tools/bake-doctors.js");
