/* Omega Dental — website content.
   THIS FILE IS EDITED BY THE ADMIN CONTENT EDITOR (admin-content.html) and
   published straight to the repo, so keep it plain data: no logic, no comments
   that must survive, and the same shape every time.

   It is a .js file loaded with a normal <script> BEFORE assets/app.js — not JSON
   fetched at runtime — because app.js consumes this data synchronously when it
   renders. A fetch would force an async rewrite of the whole render path.

   Consumed by: the homepage service grid, the price table, the cost calculator,
   the booking form's treatment dropdown, and each services/*.html detail page
   (via assets/service-content.js). Edit it here and every one of those updates. */
window.OMEGA_CONTENT = (function () {

  const CATS = {
    consult:   { en: "Consultation",                 bn: "কনসালটেশন" },
    general:   { en: "Scaling, Polishing & Filling", bn: "স্কেলিং, পলিশিং ও ফিলিং" },
    cosmetic:  { en: "Veneer & Cosmetic",     bn: "ভিনেয়ার ও কসমেটিক" },
    endo:      { en: "Root Canal (Endodontics)", bn: "রুট ক্যানেল (এন্ডোডন্টিক্স)" },
    crown:     { en: "Bridge & Crown",        bn: "ব্রিজ ও ক্রাউন" },
    denture:   { en: "Denture",               bn: "ডেনচার" },
    implant:   { en: "Dental Implant",        bn: "ডেন্টাল ইমপ্লান্ট" },
    surgery:   { en: "Extraction & Oral Surgery", bn: "দাঁত তোলা ও ওরাল সার্জারি" },
    ortho:     { en: "Orthodontic & Aligner", bn: "অর্থোডন্টিক ও অ্যালাইনার" },
    kids:      { en: "Kids Dentistry",          bn: "শিশুদের দাঁতের চিকিৎসা" },
  };

  const PRICES = [
    // 0. Consultation
    { c:"consult", n:"Consultation", nb:"কনসালটেশন", note:"per consultation", noteb:"প্রতি কনসালটেশন", min:500, max:500 },
    // 1. Scaling & Polishing  +  4. Tooth Filling
    { c:"general", slug:"scaling-polishing", n:"Scaling", nb:"স্কেলিং", min:1500, max:2500 },
    { c:"general", slug:"scaling-polishing", n:"Polishing", nb:"পলিশিং", min:1000, max:1000 },
    { c:"general", slug:"scaling-polishing", n:"Gum Treatment", nb:"মাড়ির চিকিৎসা", min:8500, max:8500 },
    { c:"general", slug:"tooth-fillings", n:"Composite Filling — Advance", nb:"কম্পোজিট ফিলিং — অ্যাডভান্স", per:true, min:2500, max:3000 },
    { c:"general", slug:"tooth-fillings", n:"Composite Filling — General", nb:"কম্পোজিট ফিলিং — সাধারণ", per:true, min:1000, max:1000 },
    { c:"general", slug:"tooth-fillings", n:"GI Filling", nb:"জিআই ফিলিং", per:true, min:1500, max:2000 },
    { c:"general", slug:"tooth-fillings", n:"Temporary Filling", nb:"অস্থায়ী ফিলিং", per:true, min:500, max:500 },
    { c:"general", slug:"tooth-fillings", n:"Tooth Shaping", nb:"দাঁতের শেপিং", per:true, min:500, max:500 },
    { c:"general", slug:"tooth-fillings", n:"Dressing / Abscess Drainage", nb:"ড্রেসিং / পুঁজ বের করা", min:1000, max:1500 },
  
    // 2. Composite Veneer  +  9. Teeth Whitening
    { c:"cosmetic", slug:"veneers", n:"Composite Veneer — Advance", nb:"কম্পোজিট ভিনেয়ার — অ্যাডভান্স", note:"Warranty 5 Yrs · 3 Times", noteb:"ওয়ারেন্টি ৫ বছর · ৩ বার", per:true, min:5500, max:7500 },
    { c:"cosmetic", slug:"veneers", n:"Composite Veneer — General", nb:"কম্পোজিট ভিনেয়ার — সাধারণ", note:"Warranty 3 Yrs · 3 Times", noteb:"ওয়ারেন্টি ৩ বছর · ৩ বার", per:true, min:3500, max:4000 },
    { c:"cosmetic", slug:"teeth-whitening", n:"Laser Teeth Whitening", nb:"লেজার দাঁত সাদা করা", min:12000, max:12000 },
  
    // 3. Root Canal Treatment (RCT)
    { c:"endo", slug:"root-canal", n:"Root Canal Treatment (RCT)", nb:"রুট ক্যানেল চিকিৎসা (RCT)", per:true, min:5000, max:8000 },
    { c:"endo", slug:"root-canal", n:"RCT — Wisdom Tooth", nb:"রুট ক্যানেল — আক্কেল দাঁত", per:true, min:8000, max:8000 },
    { c:"endo", slug:"root-canal", n:"Re-RCT", nb:"পুনরায় রুট ক্যানেল", per:true, min:6500, max:6500 },
    { c:"endo", slug:"root-canal", n:"Single Visit RCT with Filling", nb:"এক ভিজিটে রুট ক্যানেল ও ফিলিং", per:true, min:12000, max:12000 },
    { c:"endo", slug:"root-canal", n:"Pulpectomy", nb:"পাল্পেকটমি", min:5500, max:5500 },
    { c:"endo", slug:"root-canal", n:"Fiber Post — Advance", nb:"ফাইবার পোস্ট — অ্যাডভান্স", per:true, min:4500, max:4500 },
    { c:"endo", slug:"root-canal", n:"Fiber Post — General", nb:"ফাইবার পোস্ট — সাধারণ", per:true, min:3500, max:3500 },
    { c:"endo", slug:"root-canal", n:"Apisectomy", nb:"অ্যাপিসেকটমি", min:20000, max:25000 },
  
    // 5. Fiber Bridge  +  6. Zirconia & PFM Crown
    { c:"crown", slug:"fiber-bridge", n:"Fiber Bridge — Premium", nb:"ফাইবার ব্রিজ — প্রিমিয়াম", note:"Warranty 2 Yrs · 2 Times", noteb:"ওয়ারেন্টি ২ বছর · ২ বার", per:true, min:22000, max:24000 },
    { c:"crown", slug:"crowns-bridges", n:"Zirconia Crown", nb:"জিরকোনিয়া ক্রাউন", per:true, min:12000, max:15000 },
    { c:"crown", slug:"crowns-bridges", n:"PFM Crown — Advance", nb:"পিএফএম ক্রাউন — অ্যাডভান্স", per:true, min:8000, max:8000 },
    { c:"crown", slug:"crowns-bridges", n:"PFM Crown — General", nb:"পিএফএম ক্রাউন — সাধারণ", per:true, min:5000, max:5000 },
    { c:"crown", slug:"crowns-bridges", n:"Composite Crown", nb:"কম্পোজিট ক্রাউন", per:true, min:6500, max:6500 },
    { c:"crown", slug:"crowns-bridges", n:"Immediate Crown", nb:"ইমিডিয়েট ক্রাউন", per:true, min:3000, max:3000 },
  
    // 7. Denture
    { c:"denture", slug:"dentures", n:"Flexible Denture", nb:"ফ্লেক্সিবল ডেনচার", per:true, min:5000, max:8000 },
    { c:"denture", slug:"dentures", n:"Partial Denture", nb:"পার্শিয়াল ডেনচার", per:true, min:4000, max:5000 },
    { c:"denture", slug:"dentures", n:"Complete Denture", nb:"কমপ্লিট ডেনচার", per:true, min:22000, max:22000 },
  
    // 8. Dental Implant
    { c:"implant", slug:"dental-implants", n:"USA Premium Implant", nb:"ইউএসএ প্রিমিয়াম ইমপ্লান্ট", per:true, min:120000, max:120000 },
    { c:"implant", slug:"dental-implants", n:"German Premium Implant", nb:"জার্মান প্রিমিয়াম ইমপ্লান্ট", per:true, min:140000, max:160000 },
  
    // 10. Painless Extraction & Surgery  (+ 11. Kids: milk-tooth)
    { c:"surgery", slug:"extractions", n:"Deciduous (Milk) Tooth Extraction", nb:"দুধ দাঁত তোলা", min:1000, max:1000 },
    { c:"surgery", slug:"extractions", n:"Permanent Tooth Extraction", nb:"স্থায়ী দাঁত তোলা", min:2000, max:5000 },
    { c:"surgery", slug:"extractions", n:"Surgical Tooth Extraction", nb:"সার্জিক্যাল দাঁত তোলা", min:8000, max:12000 },
    { c:"surgery", slug:"extractions", n:"Frenectomy", nb:"ফ্রেনেকটমি", min:3000, max:3000 },
    { c:"surgery", slug:"extractions", n:"Operculectomy", nb:"অপারকুলেকটমি", min:3000, max:3000 },
    { c:"surgery", slug:"extractions", n:"Cyst/Tumor Removal", nb:"সিস্ট/টিউমার অপসারণ", per:true, min:10000, max:18000 },
  
    // 13. Orthodontic Treatment  +  14. Aligner
    { c:"ortho", slug:"braces-aligners", n:"Orthodontic Treatment", nb:"অর্থোডন্টিক চিকিৎসা", note:"+ Monthly 6,000", noteb:"+ মাসিক ৬,০০০", min:25000, max:25000 },
    { c:"ortho", slug:"aligners", n:"Aligner Treatment", nb:"অ্যালাইনার চিকিৎসা", min:150000, max:250000 },
    { c:"ortho", slug:"braces-aligners", n:"Night Guard", nb:"নাইট গার্ড", min:8000, max:10000 },
  
    // Kids Dentistry
    { c:"kids", slug:"kids-dentistry", n:"Kids Check-up & Cleaning", nb:"শিশুর চেকআপ ও পরিষ্কার", min:1000, max:1000 },
    { c:"kids", slug:"kids-dentistry", n:"Milk Tooth Filling (Premium)", nb:"দুধ দাঁতের ফিলিং (প্রিমিয়াম)", per:true, min:1500, max:1500 },
    { c:"kids", slug:"kids-dentistry", n:"Milk Tooth Extraction", nb:"দুধ দাঁত তোলা", per:true, min:1500, max:1500 },
    { c:"kids", slug:"kids-dentistry", n:"Pulpectomy (Advance)", nb:"পালপেক্টমি (অ্যাডভান্স)", per:true, min:5000, max:5000 },
  ];

  const SERVICES = [
    { icon:"🦷", img:"scaling-polishing", vid:"scaling-animation-wm", slug:"scaling-polishing", pr:"৳1,500–2,500", dur:"30–40 min", durbn:"৩০–৪০ মিনিট", en:"Scaling & Polishing", bn:"স্কেলিং ও পলিশিং", cne:"Teeth cleaning", cn:"দাঁত পরিষ্কার", de:"Professional cleaning to remove plaque, tartar and stains for healthy gums.", db:"দাঁতের ময়লা, পাথর ও দাগ তুলে মাড়ি সুস্থ রাখার পরিষ্কার।", gal:["scaling-ba","scaling-stained","scaling-clean","scaling-case-1"] },
    { icon:"💎", img:"veneers-before", img2:"veneers-after", slug:"veneers", pr:"৳3,500–7,500", per:true, dur:"1 Session", durbn:"১ সিটিং", en:"Composite Veneer", bn:"কম্পোজিট ভিনেয়ার", cne:"Tooth gap treatment", cn:"দাঁতের ফাঁক চিকিৎসা", de:"Composite veneer to reshape and perfect your front teeth.", db:"সামনের দাঁত সুন্দর ও নিখুঁত করতে পাতলা আবরণ।", gal:["veneers","cosmetic-veneers","veneer-case-1","veneer-case-2"],
      sub:[{en:"General",bn:"সাধারণ",slug:"veneers"},{en:"Advanced",bn:"অ্যাডভান্স",slug:"veneers"}] },
    { icon:"🌱", img:"root-canal-rct", vid:"root-canal-animation-wm", slug:"root-canal", pr:"৳5,000–8,000", per:true, dur:"1–2 Sessions", durbn:"১–২ সিটিং", en:"Root Canal Treatment (RCT)", bn:"রুট ক্যানেল চিকিৎসা (RCT)", cne:"Tooth-root treatment", cn:"দাঁতের শিকড়ের চিকিৎসা", de:"Save an infected tooth with gentle single & multi-visit root canal therapy.", db:"ব্যথা ছাড়াই পোকা ধরা দাঁত না তুলে বাঁচানোর চিকিৎসা।", gal:["root-canal-steps","root-canal-grid","root-canal-xray","root-canal-case-1"] },
    { icon:"🪥", img:"tooth-fillings-before", img2:"tooth-fillings-after", slug:"tooth-fillings", pr:"৳1,000–3,000", per:true, dur:"~30 min", durbn:"~৩০ মিনিট", en:"Advance Tooth Filling", bn:"অ্যাডভান্স দাঁতের ফিলিং", cne:"Cavity filling", cn:"দাঁত বাঁধাই", de:"Tooth-coloured filling that restores a decayed tooth painlessly.", db:"পোকা ধরা বা ক্ষয়ে যাওয়া দাঁত ব্যথা ছাড়াই ভরাট করে ঠিক করা।", gal:["tooth-fillings","filling-composite","filling-gi","filling-case-1","filling-case-2","filling-case-3"],
      sub:[ {en:"Composite Filling",bn:"কম্পোজিট ফিলিং",slug:"tooth-fillings"}, {en:"GI Filling",bn:"জিআই ফিলিং",slug:"tooth-fillings"}, {en:"Temporary Filling",bn:"অস্থায়ী ফিলিং",slug:"tooth-fillings"} ] },
    { icon:"🌉", img:"fiber-bridge-2", img2:"fiber-bridge-1", slug:"fiber-bridge", pr:"৳22,000–24,000", per:true, dur:"1 Session", durbn:"১ সিটিং", en:"Fiber Bridge", bn:"ফাইবার ব্রিজ", de:"Fixed fiber bridge to replace a missing tooth in a single session.", db:"এক সিটিংয়েই হারানো দাঁতের জায়গায় স্থায়ী নকল দাঁত।", gal:["fiber-bridge-3","fiber-bridge-4","fiber-bridge-case-1","fiber-bridge-case-2","fiber-bridge-case-3"],
      sub:[{en:"Premium · 2yr Warranty",bn:"প্রিমিয়াম · ২ বছরের ওয়ারেন্টি",slug:"fiber-bridge"}] },
    { icon:"👑", img:"zirconia-crown", img2:"pfm-crown", slug:"crowns-bridges", pr:"৳5,000–15,000", per:true, dur:"2 Sessions", durbn:"২ সিটিং", en:"Zirconia & PFM Crown", bn:"জিরকোনিয়া ও পিএফএম ক্রাউন", cne:"Tooth cap", cn:"দাঁতের ক্যাপ", de:"Zirconia, PFM and composite crown to rebuild strength and beauty.", db:"ভাঙা বা দুর্বল দাঁত ঢেকে শক্ত ও সুন্দর করতে দাঁতের ক্যাপ।", gal:["crowns-bridges","crowns-diagram","crown-bridge-overview","crown-case-1","crown-case-2"] },
    { icon:"🦿", img:"dentures-flexible", vid:"dentures-animation-wm", slug:"dentures", pr:"৳5,000–8,000", per:true, dur:"2–3 Sessions", durbn:"২–৩ সেশন", en:"Flexible Denture", bn:"ফ্লেক্সিবল ডেনচার", cne:"Removable teeth set", cn:"বাঁধানো দাঁত", de:"Removable denture for comfortable chewing and a confident smile.", db:"আরামে চিবানো ও সুন্দর হাসির জন্য খুলে-লাগানো যায় এমন নকল দাঁত।", gal:["dentures","dentures-partial","denture-case-1","denture-case-2"],
      sub:[ {en:"Flexible Denture",bn:"ফ্লেক্সিবল ডেনচার",slug:"dentures"}, {en:"Partial Denture",bn:"পার্শিয়াল ডেনচার",slug:"dentures"}, {en:"Complete Denture",bn:"কমপ্লিট ডেনচার",slug:"dentures"} ] },
    { icon:"🔩", img:"dental-implants", img2:"implant-double", slug:"dental-implants", pr:"৳1,20,000+", per:true, dur:"Multi-stage", durbn:"একাধিক ধাপ", en:"Dental Implant", bn:"ডেন্টাল ইমপ্লান্ট", cne:"Permanent new tooth", cn:"নতুন দাঁত বসানো", de:"Permanent, natural-looking replacement for a missing tooth.", db:"হারানো দাঁতের জায়গায় চিরস্থায়ী, আসল দাঁতের মতো নতুন দাঁত।", gal:["implant-single","implant-double","crowns-implant-bridge"] },
    { icon:"✨", img:"laser-whitening-card", img2:"whitening-compare", slug:"teeth-whitening", pr:"৳12,000", dur:"1 Session", durbn:"১ সিটিং", en:"Laser Teeth Whitening", bn:"লেজার দাঁত সাদা করা", cne:"Laser teeth whitening", cn:"লেজার দাঁত সাদা করা", de:"Brighten your smile several shades with safe professional whitening.", db:"নিরাপদে দাঁতের হলদে ভাব দূর করে কয়েক শেড উজ্জ্বল হাসি।", gal:["whitening-compare","cosmetic-ba","whitening-case-1","whitening-case-2"] },
    { icon:"🩺", img:"extractions-surgery", img2:"extraction-front", slug:"extractions", pr:"৳5,000–8,000", per:true, dur:"20–30 min", durbn:"২০–৩০ মিনিট", en:"Painless Extraction & Surgery", bn:"ব্যথাহীন দাঁত তোলা ও সার্জারি", cne:"Tooth removal", cn:"দাঁত ফেলা", de:"Painless simple and surgical extraction including wisdom teeth.", db:"আক্কেল দাঁতসহ যেকোনো দাঁত ব্যথা ছাড়াই তুলে ফেলা।", gal:["extraction-front","frenectomy","extraction-case-1","extraction-case-2"] },
    { icon:"🧒", img:"kids-dentistry", img2:"kids-checkup", slug:"kids-dentistry", pr:"৳1,000–1,500", dur:"20–30 min", durbn:"২০–৩০ মিনিট", en:"Kids Dentistry", bn:"শিশুদের দাঁতের চিকিৎসা", cne:"Children's dental care", cn:"শিশুদের দাঁতের যত্ন", de:"Gentle paediatric care, milk-tooth treatment and check-ups for children.", db:"শিশুদের দুধ দাঁতের চিকিৎসা, কোমল যত্ন ও নিয়মিত চেকআপ।", gal:["kids-checkup","kids-extraction","kids-case-1"] },
    { icon:"💖", img:"cosmetic-tooth-jewelry", img2:"cosmetic-hollywood-smile", slug:"cosmetic-dentistry", pr:"৳3,500–9,000", dur:"Varies", durbn:"পরিবর্তনশীল", en:"Cosmetic Dentistry", bn:"কসমেটিক ডেন্টিস্ট্রি", cne:"Smile makeover", cn:"দাঁতের সৌন্দর্য চিকিৎসা", de:"Smile makeovers combining whitening, veneer and reshaping.", db:"হাসি সুন্দর করতে দাঁত সাদা করা, আবরণ ও শেপ ঠিক করা।", gal:["cosmetic-ba","cosmetic-veneers"] },
    { icon:"📏", img:"braces-aligners", img2:"braces-treatment", slug:"braces-aligners", pr:"From ৳25,000", dur:"12–24 months", durbn:"১২–২৪ মাস", en:"Orthodontic Treatment", bn:"অর্থোডন্টিক চিকিৎসা", cne:"Teeth straightening", cn:"দাঁত সোজা করা (তার/ব্রেস)", de:"Straighten misaligned teeth and correct your bite with orthodontic care.", db:"আঁকাবাঁকা দাঁত ও কামড় ঠিক করতে তার (ব্রেস) লাগিয়ে চিকিৎসা।", gal:["braces-aligners"],
      sub:[ {en:"Braces",bn:"ব্রেসেস",slug:"braces-aligners"}, {en:"Night Guard",bn:"নাইট গার্ড",slug:"braces-aligners"} ] },
    { icon:"😁", img:"aligner", img2:"aligner-tray", slug:"aligners", pr:"From ৳1,50,000", dur:"6–18 months", durbn:"৬–১৮ মাস", en:"Aligner", bn:"অ্যালাইনার", cne:"Invisible aligner", cn:"অদৃশ্য তার", de:"Near-invisible clear aligner to straighten teeth discreetly.", db:"প্রায় অদৃশ্য স্বচ্ছ কভারে দাঁত গোপনে সোজা করা।", gal:["aligner","aligner-case-1","aligner-case-2"] },
    { icon:"🩺", img:"consultation", img2:"consultation-2", pr:"৳500", dur:"15–20 min", durbn:"১৫–২০ মিনিট", en:"Consultation", bn:"কনসালটেশন", cne:"Doctor visit", cn:"ডাক্তার দেখানো", de:"Full check-up with the dentist and a clear treatment plan — ৳500 per consultation.", db:"ডাক্তারের সম্পূর্ণ চেকআপ ও পরিষ্কার চিকিৎসা পরিকল্পনা — প্রতি কনসালটেশন ৫০০ টাকা।" },
  ];

  return { cats: CATS, prices: PRICES, services: SERVICES };
})();
