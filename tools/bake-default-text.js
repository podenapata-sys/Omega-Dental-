/* Fill every empty bilingual element with its Bangla text.

   The pages are bilingual by attribute: <h1 data-en="Veneers" data-bn="ভিনেয়ার"></h1>,
   with JavaScript writing the right one in at runtime. That left the HTML itself with no
   text in it at all — so any JavaScript failure produced a completely blank page (which is
   exactly what happened to the clinic owner on a slow connection), and every crawler that
   does not run JavaScript — WhatsApp, Facebook, Bing — saw an empty document.

   So the default language goes into the markup, and JavaScript overwrites it as before.
   Every applier assigns with `textContent =`, so a pre-filled element cannot end up with
   duplicated text.

   Only elements that are EMPTY are touched: anything already carrying content was put there
   deliberately and is left alone. Void elements are skipped. The attribute value is already
   escaped for attribute context, and that same escaping is valid as element content, so it
   copies across unchanged.

   Used by the generators in this folder, and applied once to the committed pages. */
const VOID = new Set(["img","br","hr","input","meta","link","source","track",
                      "area","base","col","embed","param","wbr"]);

/* one attribute-aware pass: "..." may legally contain > and <, so quoted runs are matched
   whole rather than with a naive [^>]* */
const RX = /<(\w+)((?:[^<>"]|"[^"]*")*?\sdata-bn="([^"]*)"(?:[^<>"]|"[^"]*")*?)>\s*<\/\1>/g;

function bakeDefaultText(html) {
  return String(html).replace(RX, (whole, tag, attrs, bn) =>
    VOID.has(tag.toLowerCase()) ? whole : `<${tag}${attrs}>${bn}</${tag}>`);
}

module.exports = { bakeDefaultText };
