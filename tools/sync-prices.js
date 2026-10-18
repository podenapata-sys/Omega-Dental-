#!/usr/bin/env node
/* Omega Dental — copy the price list from assets/content.js into every page that
   repeats it, so one change in the content editor reaches the whole site.

   Why this exists: the editor only rewrites content.js. The homepage price list,
   calculator and booking form read it live, but these copies were typed by hand
   and went stale the first time a price changed:
     - services/*.html  comparison tables  <td class="cmp-omega" data-price="<price id>">
     - services/*.html  headline price     <div class="prod-price">   (service `pr`)
     - treatments.html  card prices        <span class="svc-price" data-svc="<slug>">
     - treatments.html  JSON-LD ItemList   (what Google reads; one Offer per price row)

   A cell is linked to a price row by the row's `id`, which never changes when the
   clinic renames a treatment. A cell with no data-price is left alone on purpose
   (prices still waiting for the clinic's answer). An unknown id is reported and the
   cell is left as it is: this runs inside the deploy, and a deploy must never fail
   because of one bad row.

   The deploy workflow runs it before upload, so every editor publish goes live with
   all pages in step. Run it by hand after editing content.js locally, and commit.

   Usage:  node tools/sync-prices.js            rewrite the pages
           node tools/sync-prices.js --check    report differences, exit 1 if any
           node tools/sync-prices.js --content other.js   read prices from another file */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://omegadentalbd.com";
const args = process.argv.slice(2);
const CHECK = args.includes("--check");
const ci = args.indexOf("--content");
const CONTENT = ci >= 0 ? path.resolve(args[ci + 1]) : path.join(ROOT, "assets/content.js");

const warnings = [];
const warn = (m) => warnings.push(m);

function loadContent(file) {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file, timeout: 2000 });
  const c = sandbox.window.OMEGA_CONTENT;
  if (!c || !Array.isArray(c.prices) || !Array.isArray(c.services)) {
    throw new Error(file + " does not set window.OMEGA_CONTENT with prices and services");
  }
  return c;
}

/* 120000 -> "1,20,000" (Indian grouping, same as the homepage). Done by hand so the
   result does not depend on which ICU data the deploy machine's Node carries. */
function fmt(n) {
  const s = String(Math.round(Math.abs(n)));
  if (s.length <= 3) return s;
  let head = s.slice(0, -3);
  const parts = [];
  while (head.length > 2) { parts.unshift(head.slice(-2)); head = head.slice(0, -2); }
  if (head) parts.unshift(head);
  return parts.join(",") + "," + s.slice(-3);
}

const BN = "০১২৩৪৫৬৭৮৯";
const toBn = (s) => String(s).replace(/[0-9]/g, (d) => BN.charAt(+d));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
  .replace(/</g, "&lt;").replace(/>/g, "&gt;");

const isNum = (v) => typeof v === "number" && isFinite(v) && v >= 0;

/* Comparison-cell text, in the tables' own style: "৳4,000–5,000", "৳12,000".
   Orthodontics carries its monthly fee in the row's note ("+ Monthly 6,000"),
   which the table has always shown as "৳25,000 + ৳6,000/mo". */
function cellText(p) {
  let t = "৳" + fmt(p.min) + (p.max > p.min ? "–" + fmt(p.max) : "");
  const m = /^\+\s*Monthly\s+([\d,]+)\s*$/i.exec(p.note || "");
  if (m) t += " + ৳" + m[1] + "/mo";
  return t;
}

/* Service headline, exactly as assets/service-content.js sets it at runtime, so a
   visitor without JavaScript sees the same thing as everyone else. */
function headline(pr) {
  const en = String(pr).replace(/৳\s*/g, "৳ ");
  const m = /^From\s+(.*)$/.exec(en);
  const bn = m ? toBn(m[1]) + " থেকে" : toBn(en);
  return { en, bn };
}

/* JSON-LD ItemList: one Offer per price row, the shape the page has always had. */
function itemList(prices) {
  const items = prices.filter((p) => isNum(p.min) && isNum(p.max)).map((p, i) => {
    const proc = { "@type": "MedicalProcedure", name: p.n };
    if (p.slug) proc.url = `${SITE}/services/${p.slug}.html`;
    const offer = { "@type": "Offer", priceCurrency: "BDT", itemOffered: proc };
    if (p.min === p.max) offer.price = String(p.min);
    else offer.priceSpecification = { "@type": "PriceSpecification", priceCurrency: "BDT",
      minPrice: String(p.min), maxPrice: String(p.max) };
    return { "@type": "ListItem", position: i + 1, item: offer };
  });
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dental treatment prices — Omega Dental, Dhaka",
    description: "Published price list for every treatment at Omega Dental, West Kazipara, Dhaka.",
    url: `${SITE}/treatments.html`,
    numberOfItems: items.length,
    itemListElement: items,
  };
  // "<" escaped so a name can never close the <script> element early
  return JSON.stringify(list, null, 1).replace(/</g, "\\u003c");
}

function syncServicePage(html, file, byId, svc) {
  let cells = 0;
  html = html.replace(/(<td class="cmp-omega" data-price=")([^"]*)(">)([^<]*)(<\/td>)/g,
    (all, a, id, b, text, c) => {
      const p = byId.get(id);
      if (!p) { warn(`${file}: no price row with id "${id}" — cell left as "${text}"`); return all; }
      if (!isNum(p.min) || !isNum(p.max)) { warn(`${file}: price "${id}" has no valid min/max — cell left`); return all; }
      cells++;
      return a + id + b + cellText(p) + c;
    });
  if (svc && svc.pr) {
    const h = headline(svc.pr);
    html = html.replace(/<div class="prod-price" data-en="[^"]*" data-bn="[^"]*">[^<]*<\/div>/,
      `<div class="prod-price" data-en="${esc(h.en)}" data-bn="${esc(h.bn)}">${esc(h.en)}</div>`);
  }
  return { html, cells };
}

function syncTreatments(html, bySlug, prices) {
  let cards = 0;
  html = html.replace(/(<span class="svc-price" data-svc=")([^"]*)(">)([^<]*)(<\/span>)/g,
    (all, a, slug, b, text, c) => {
      const s = bySlug.get(slug);
      if (!s || !s.pr) { warn(`treatments.html: no service "${slug}" with a price — card left as "${text}"`); return all; }
      cards++;
      return a + slug + b + esc(s.pr) + c;
    });
  let ld = false;
  html = html.replace(/(<script type="application\/ld\+json">\n)(\{\n "@context": "https:\/\/schema\.org",\n "@type": "ItemList",[\s\S]*?)(\n<\/script>)/,
    (all, a, body, c) => { ld = true; return a + itemList(prices) + c; });
  if (!ld) warn("treatments.html: JSON-LD ItemList not found — left as it is");
  return { html, cards };
}

function main() {
  const C = loadContent(CONTENT);
  const byId = new Map();
  for (const p of C.prices) {
    if (!p.id) { warn(`price "${p.n}" has no id — nothing can link to it`); continue; }
    if (byId.has(p.id)) warn(`duplicate price id "${p.id}" — the first row wins`);
    else byId.set(p.id, p);
  }
  const bySlug = new Map(C.services.filter((s) => s.slug).map((s) => [s.slug, s]));

  const changed = [];
  let cells = 0, cards = 0;
  const write = (rel, before, after) => {
    if (before === after) return;
    changed.push(rel);
    if (!CHECK) fs.writeFileSync(path.join(ROOT, rel), after);
  };

  const dir = path.join(ROOT, "services");
  for (const name of fs.readdirSync(dir).filter((f) => f.endsWith(".html")).sort()) {
    const rel = "services/" + name;
    const before = fs.readFileSync(path.join(ROOT, rel), "utf8");
    const r = syncServicePage(before, rel, byId, bySlug.get(name.replace(/\.html$/, "")));
    cells += r.cells;
    write(rel, before, r.html);
  }

  const tBefore = fs.readFileSync(path.join(ROOT, "treatments.html"), "utf8");
  const t = syncTreatments(tBefore, bySlug, C.prices);
  cards = t.cards;
  write("treatments.html", tBefore, t.html);

  // On GitHub Actions a "::warning::" line shows up on the run's summary page.
  const tag = process.env.GITHUB_ACTIONS ? "::warning::" : "warning: ";
  for (const w of warnings) console.warn(tag + w);
  console.log(`${cells} table prices, ${cards} treatment cards, ${C.prices.length} JSON-LD offers checked.`);
  if (CHECK) {
    if (changed.length) {
      console.log("Out of step with content.js:\n  " + changed.join("\n  ") +
        "\nRun: node tools/sync-prices.js");
      process.exit(1);
    }
    console.log("All pages match content.js.");
  } else {
    console.log(changed.length ? "Updated:\n  " + changed.join("\n  ") : "Nothing to update.");
  }
}

main();
