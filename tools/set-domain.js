#!/usr/bin/env node
/* Point the whole site at a domain.

     node tools/set-domain.js omegadentalbd.com

   The site's absolute URL appears in canonicals, og:image, og:url, JSON-LD url/image,
   sitemap.xml <loc>, robots.txt's Sitemap: line, and as a hardcoded SITE constant in each
   of the four page generators. Doing that by hand at cutover time is 100+ edits under
   time pressure, and missing a canonical is the expensive kind of mistake: Google would
   consolidate the new domain's ranking back into the old GitHub Pages URLs.

   It rewrites files IN PLACE rather than regenerating. That is deliberate — the
   generators have drifted from the committed pages (gen-services.js refuses to run at
   all, reporting 12 of 14 service pages no longer match it), so regenerating would revert
   real work. The SITE constants are updated so a future regeneration agrees.

   Idempotent: running it twice changes nothing the second time. Run with no arguments to
   see what the current domain is.

   Note the old base carries a repository subpath and the new one does not, so
   `.../Omega-Dental-/services/x.html` correctly becomes `https://<domain>/services/x.html`. */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
/* Where the site currently claims to live. The original GitHub Pages URL carries a
   repository subpath; a custom domain does not, which is why the whole base is swapped
   rather than just the host. CNAME is the record of the current domain, so reading it
   means this works for the second domain change as well as the first. */
const ORIGIN_BASES = [
  "https://podenapata-sys.github.io/Omega-Dental-",
  "http://podenapata-sys.github.io/Omega-Dental-",
];
function currentBases() {
  const c = path.join(__dirname, "..", "CNAME");
  if (fs.existsSync(c)) {
    const d = fs.readFileSync(c, "utf8").trim();
    if (d) return ["https://" + d, "http://" + d, ...ORIGIN_BASES];
  }
  return ORIGIN_BASES;
}
const OLD_BASES = currentBases();

const SKIP_DIRS = new Set([".git", "node_modules", "assets", ".github"]);
const EXTS = new Set([".html", ".xml", ".txt", ".js", ".md"]);

/* Skip this file. It necessarily contains the old base as a literal, and rewriting that
   would leave the tool unable to find anything the next time the domain changes — it would
   silently report success having matched nothing. */
const SELF = path.resolve(__filename);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") && e.name !== ".github") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(p, out); }
    else if (EXTS.has(path.extname(e.name)) && path.resolve(p) !== SELF) out.push(p);
  }
  return out;
}

const raw = (process.argv[2] || "").trim();
if (!raw) {
  const hits = walk(ROOT).filter(f => OLD_BASES.some(b => fs.readFileSync(f, "utf8").includes(b)));
  console.log(`Current base: ${OLD_BASES[0]}`);
  console.log(`${hits.length} file(s) still reference it.`);
  console.log(`\nUsage: node tools/set-domain.js <domain>      e.g. omegadentalbd.com`);
  process.exit(0);
}

/* Accept whatever shape it is typed in — with scheme, with www., with a trailing slash —
   and normalise, because the canonical must be exactly one string everywhere. */
let domain = raw.replace(/^https?:\/\//i, "").replace(/\/+$/, "").toLowerCase();
if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) {
  console.error(`Not a domain: "${raw}"`);
  process.exit(1);
}
const NEW_BASE = "https://" + domain;

let changedFiles = 0, changedRefs = 0;
const summary = [];
for (const file of walk(ROOT)) {
  const before = fs.readFileSync(file, "utf8");
  let after = before;
  for (const b of OLD_BASES) after = after.split(b).join(NEW_BASE);
  if (after === before) continue;
  /* Count what was actually replaced in THIS file, not occurrences of the original host —
     on a second domain change that pattern is gone and the summary read "0 references in
     34 files", which is a contradiction at exactly the wrong moment. */
  let n = 0;
  for (const b of OLD_BASES) { if (b === NEW_BASE) continue; n += before.split(b).length - 1; }
  fs.writeFileSync(file, after);
  changedFiles++; changedRefs += n;
  summary.push(`  ${path.relative(ROOT, file).padEnd(44)} ${n}`);
}

/* GitHub Pages needs this committed in the repo — setting the custom domain only in the
   repository settings works until the next deploy overwrites it. */
const cnamePath = path.join(ROOT, "CNAME");
const cnameBefore = fs.existsSync(cnamePath) ? fs.readFileSync(cnamePath, "utf8").trim() : null;
fs.writeFileSync(cnamePath, domain + "\n");

console.log(`Base URL -> ${NEW_BASE}\n`);
if (summary.length) { console.log("file                                         refs"); console.log(summary.join("\n")); }
else console.log("No files referenced the old base (already switched?).");
console.log(`\n${changedRefs} reference(s) in ${changedFiles} file(s).`);
console.log(cnameBefore === domain ? `CNAME already ${domain}` : `CNAME ${cnameBefore ? cnameBefore + " -> " : "written: "}${domain}`);

const left = walk(ROOT).filter(f => {
  const t = fs.readFileSync(f, "utf8");
  return OLD_BASES.some(b => b !== NEW_BASE && t.includes(b));
});
if (left.length) {
  console.log(`\nStill mentioning the old host (check these are deliberate):`);
  for (const f of left) console.log("  " + path.relative(ROOT, f));
} else console.log("\nNo references to the old host remain.");
