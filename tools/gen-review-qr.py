#!/usr/bin/env python3
"""Generate the Google-review QR code as a static SVG.

The QR used to be drawn in the browser by a library loaded from cdnjs. That script is
what blanked the homepage for the clinic owner on a slow connection — deferred scripts
run in document order, so a stalled CDN request stopped the site's own JavaScript.

Generating it here removes the third-party script from the page altogether: nothing to
fetch, nothing to trust, nothing to fail. Re-run this if the Google Place ID changes.

    pip install segno && python3 tools/gen-review-qr.py
"""
import pathlib
import segno

PLACE_ID = "ChIJkU6fOETBVTcRtwuNI9vunfY"
URL = f"https://search.google.com/local/writereview?placeid={PLACE_ID}"
OUT = pathlib.Path(__file__).resolve().parent.parent / "assets" / "review-qr.svg"

# Error correction M: about 15% of the symbol can be damaged or obscured and it still
# reads. Enough for a printed card at reception, without inflating the module count.
qr = segno.make(URL, error="m")
qr.save(str(OUT), kind="svg", scale=8, dark="#13294e", light="#ffffff", border=2)
print(f"{OUT.name}: version {qr.version}, {len(qr.matrix)}x{len(qr.matrix)} modules")
print(f"encodes: {URL}")
