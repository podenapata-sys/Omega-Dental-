/* Omega Dental — keep each services/*.html price in step with the shared content.

   Why this exists: every service page used to carry its own hard-coded price
   (e.g. veneers.html had `data-en="৳ 3,500–7,500"`) with no link to the price
   table or the homepage card. Editing a price in the admin editor would have
   updated the homepage, price table, calculator and booking form while the
   service page silently kept contradicting them.

   Two things are synced: the headline price (from the service's `pr`) and each
   comparison-table cell that names a price row with data-price="<row id>".
   tools/sync-prices.js bakes the same values into the HTML at deploy time; this
   covers a visitor whose cached page is older than content.js. Keep the two
   formats identical.

   Deliberately syncs the PRICE ONLY. The page's `.prod-desc` is longer,
   patient-facing copy written per page ("Have a chipped, stained or gappy front
   tooth?…"), whereas the card's `de`/`db` is a one-line blurb. Overwriting one
   with the other would lose the better copy, so page prose stays hand-written.

   Load AFTER assets/content.js. The page's own inline setLang() has already run
   by then, so this re-applies the language once the attributes are updated. */
(function () {
  var C = window.OMEGA_CONTENT;
  if (!C || !C.services) return;

  var slug = (location.pathname.split("/").pop() || "").replace(/\.html$/, "");
  if (!slug) return;

  var BN = "০১২৩৪৫৬৭৮৯";
  function toBn(s) {
    return String(s).replace(/[0-9]/g, function (d) { return BN.charAt(+d); });
  }
  function fmt(n) { return Number(n).toLocaleString("en-IN"); }   // 1,20,000

  /* Comparison cells, e.g. "৳4,000–5,000". A cell whose id is missing from the
     price list keeps the value baked into the page. */
  var byId = {};
  (C.prices || []).forEach(function (p) { if (p && p.id && !byId[p.id]) byId[p.id] = p; });
  var cells = document.querySelectorAll("td.cmp-omega[data-price]");
  for (var c = 0; c < cells.length; c++) {
    var p = byId[cells[c].getAttribute("data-price")];
    if (!p || typeof p.min !== "number" || typeof p.max !== "number") continue;
    var t = "৳" + fmt(p.min) + (p.max > p.min ? "–" + fmt(p.max) : "");
    var mo = /^\+\s*Monthly\s+([\d,]+)\s*$/i.exec(p.note || "");
    if (mo) t += " + ৳" + mo[1] + "/mo";
    cells[c].textContent = t;
  }

  var entry = null;
  for (var i = 0; i < C.services.length; i++) {
    if (C.services[i].slug === slug) { entry = C.services[i]; break; }
  }
  if (!entry || !entry.pr) return;

  var el = document.querySelector(".prod-price");
  if (!el) return;

  /* "From ৳25,000" -> EN "From ৳ 25,000" (page style has a space after ৳);
     BN gets Bengali digits and the qualifier after the amount, as Bangla reads. */
  var en = String(entry.pr).replace(/৳\s*/g, "৳ ");
  var m = /^From\s+(.*)$/.exec(en);
  el.setAttribute("data-en", en);
  el.setAttribute("data-bn", m ? toBn(m[1]) + " থেকে" : toBn(en));

  /* re-apply whichever language is active so the change is visible immediately */
  var lang = document.documentElement.getAttribute("data-lang") || "bn";
  el.textContent = el.getAttribute(lang === "bn" ? "data-bn" : "data-en");
})();
