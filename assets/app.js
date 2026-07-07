/* ============================================================
   OMEGA DENTAL — data, i18n and interactions (no build step)
   ============================================================ */

/* ---------- Contact constants ---------- */
const OMEGA = {
  phone: "01706-516868",
  phoneIntl: "+8801706516868",
  whatsapp: "8801713241670",
  email: "omegadental@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61586889212076",
  maps: "https://www.google.com/maps/place/OMEGA+Dental/@23.8018173,90.370624,16z/data=!3m1!4b1!4m7!3m6!1s0x3755c144389f4e91:0xf69deedb238d0bb7!8m2!3d23.8018173!4d90.370624!16s%2Fg%2F11ms4g6xnd",
  mapDir: "https://www.google.com/maps/dir/?api=1&destination=23.8018173,90.370624",
  mapEmbed: "https://www.google.com/maps?q=23.8018173,90.370624&z=16&output=embed",
};

/* ---------- Price list (single source of truth) ----------
   min/max in BDT used by the cost calculator.
   perTooth => quantity selector shown.                       */
// Ordered to mirror the homepage service-menu serial.
const CATS = {
  general:   { en: "Scaling, Polishing & Filling", bn: "স্কেলিং, পলিশিং ও ফিলিং" },
  cosmetic:  { en: "Veneer & Cosmetic",     bn: "ভিনিয়ার ও কসমেটিক" },
  endo:      { en: "Root Canal (Endodontics)", bn: "রুট ক্যানেল (এন্ডোডন্টিক্স)" },
  crown:     { en: "Bridge & Crown",        bn: "ব্রিজ ও ক্রাউন" },
  denture:   { en: "Denture",               bn: "ডেনচার" },
  implant:   { en: "Dental Implant",        bn: "ডেন্টাল ইমপ্লান্ট" },
  surgery:   { en: "Extraction & Oral Surgery", bn: "দাঁত তোলা ও ওরাল সার্জারি" },
  ortho:     { en: "Orthodontic & Aligner", bn: "অর্থোডন্টিক ও অ্যালাইনার" },
  kids:      { en: "Kids Dentistry",          bn: "শিশু দন্তচিকিৎসা" },
};

const PRICES = [
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
  { c:"cosmetic", slug:"veneers", n:"Composite Veneer — Advance", nb:"কম্পোজিট ভিনিয়ার — অ্যাডভান্স", note:"Warranty 5 Yrs · 3 Times", noteb:"ওয়ারেন্টি ৫ বছর · ৩ বার", per:true, min:5500, max:7500 },
  { c:"cosmetic", slug:"veneers", n:"Composite Veneer — General", nb:"কম্পোজিট ভিনিয়ার — সাধারণ", note:"Warranty 3 Yrs · 3 Times", noteb:"ওয়ারেন্টি ৩ বছর · ৩ বার", per:true, min:3500, max:4000 },
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
  { c:"denture", slug:"dentures", n:"Flexible Denture", nb:"ফ্লেক্সিবল ডেনচার", per:true, min:8000, max:8000 },
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

  // Kids Dentistry
  { c:"kids", slug:"kids-dentistry", n:"Kids Check-up & Cleaning", nb:"শিশুর চেকআপ ও পরিষ্কার", min:1000, max:1000 },
  { c:"kids", slug:"kids-dentistry", n:"Milk Tooth Filling (Premium)", nb:"দুধ দাঁতের ফিলিং (প্রিমিয়াম)", per:true, min:1500, max:1500 },
  { c:"kids", slug:"kids-dentistry", n:"Milk Tooth Extraction", nb:"দুধ দাঁত তোলা", per:true, min:1500, max:1500 },
  { c:"kids", slug:"kids-dentistry", n:"Pulpectomy (Advance)", nb:"পালপেক্টমি (অ্যাডভান্স)", per:true, min:5000, max:5000 },
];

/* ---------- Services (homepage grid) ---------- */
const SERVICES = [
  { icon:"🦷", img:"scaling-polishing", vid:"scaling-animation-sm", slug:"scaling-polishing", pr:"৳1,500–2,500", dur:"30–40 min", durbn:"৩০–৪০ মিনিট", en:"Scaling & Polishing", bn:"স্কেলিং ও পলিশিং", cne:"Teeth cleaning", cn:"দাঁত পরিষ্কার", de:"Professional cleaning to remove plaque, tartar and stains for healthy gums.", db:"দাঁতের ময়লা, পাথর ও দাগ তুলে মাড়ি সুস্থ রাখার পরিষ্কার।", gal:["scaling-ba","scaling-stained","scaling-clean"] },
  { icon:"💎", img:"veneers-before", img2:"veneers-after", slug:"veneers", pr:"৳3,500–7,500/tooth", dur:"1 Session", durbn:"১ সিটিং", en:"Composite Veneer", bn:"কম্পোজিট ভিনিয়ার", cne:"Tooth gap treatment", cn:"দাঁতের ফাঁক চিকিৎসা", de:"Composite veneer to reshape and perfect your front teeth.", db:"সামনের দাঁত সুন্দর ও নিখুঁত করতে পাতলা আবরণ।", gal:["veneers","cosmetic-veneers"],
    sub:[{en:"General",bn:"সাধারণ",slug:"veneers"},{en:"Advanced",bn:"অ্যাডভান্স",slug:"veneers"}] },
  { icon:"🌱", img:"root-canal-rct", vid:"root-canal-animation-sm", slug:"root-canal", pr:"৳5,000–8,000", dur:"1–2 Sessions", durbn:"১–২ সিটিং", en:"Root Canal Treatment (RCT)", bn:"রুট ক্যানেল চিকিৎসা (RCT)", cne:"Tooth-root treatment", cn:"দাঁতের শিকড়ের চিকিৎসা", de:"Save an infected tooth with gentle single & multi-visit root canal therapy.", db:"ব্যথা ছাড়াই সংক্রমিত দাঁত না তুলে বাঁচানোর চিকিৎসা।", gal:["root-canal-steps","root-canal-grid","root-canal-xray"] },
  { icon:"🪥", img:"tooth-fillings-before", img2:"tooth-fillings-after", slug:"tooth-fillings", pr:"৳1,000–3,000", dur:"~30 min", durbn:"~৩০ মিনিট", en:"Advance Tooth Filling", bn:"অ্যাডভান্স দাঁতের ফিলিং", cne:"Cavity filling", cn:"দাঁত বাঁধাই", de:"Tooth-coloured filling that restores a decayed tooth painlessly.", db:"পোকা ধরা বা ক্ষয়ে যাওয়া দাঁত ব্যথা ছাড়াই ভরাট করে ঠিক করা।", gal:["tooth-fillings","filling-composite","filling-gi"],
    sub:[ {en:"Composite Filling",bn:"কম্পোজিট ফিলিং",slug:"tooth-fillings"}, {en:"GI Filling",bn:"জিআই ফিলিং",slug:"tooth-fillings"}, {en:"Temporary Filling",bn:"অস্থায়ী ফিলিং",slug:"tooth-fillings"} ] },
  { icon:"🌉", img:"fiber-bridge-2", img2:"fiber-bridge-1", slug:"fiber-bridge", pr:"৳22,000–24,000", dur:"1 Session", durbn:"১ সিটিং", en:"Fiber Bridge", bn:"ফাইবার ব্রিজ", de:"Fixed fiber bridge to replace a missing tooth in a single session.", db:"এক সিটিংয়েই হারানো দাঁতের জায়গায় স্থায়ী নকল দাঁত।", gal:["fiber-bridge-3","fiber-bridge-4"],
    sub:[{en:"Premium · 2yr Warranty",bn:"প্রিমিয়াম · ২ বছরের ওয়ারেন্টি",slug:"fiber-bridge"}] },
  { icon:"👑", img:"zirconia-crown", img2:"pfm-crown", slug:"crowns-bridges", pr:"৳5,000–15,000", per:true, dur:"2 Sessions", durbn:"২ সিটিং", en:"Zirconia & PFM Crown", bn:"জিরকোনিয়া ও পিএফএম ক্রাউন", cne:"Tooth cap", cn:"দাঁতের ক্যাপ", de:"Zirconia, PFM and composite crown to rebuild strength and beauty.", db:"ভাঙা বা দুর্বল দাঁত ঢেকে শক্ত ও সুন্দর করতে দাঁতের ক্যাপ।", gal:["crowns-bridges","crowns-diagram","crown-bridge-overview"] },
  { icon:"🦿", img:"dentures-flexible", vid:"dentures-animation-sm", slug:"dentures", pr:"৳4,000–22,000", dur:"3–4 Visits", durbn:"৩–৪ ভিজিট", en:"Flexible Denture", bn:"ফ্লেক্সিবল ডেনচার", cne:"Removable teeth set", cn:"বাঁধানো দাঁত", de:"Removable denture for comfortable chewing and a confident smile.", db:"আরামে চিবানো ও সুন্দর হাসির জন্য খুলে-লাগানো যায় এমন নকল দাঁত।", gal:["dentures","dentures-partial"],
    sub:[ {en:"Flexible Denture",bn:"ফ্লেক্সিবল ডেনচার",slug:"dentures"}, {en:"Partial Denture",bn:"পার্শিয়াল ডেনচার",slug:"dentures"}, {en:"Complete Denture",bn:"কমপ্লিট ডেনচার",slug:"dentures"} ] },
  { icon:"🔩", img:"dental-implants", slug:"dental-implants", pr:"৳1,20,000+", dur:"Multi-stage", durbn:"একাধিক ধাপ", en:"Dental Implant", bn:"ডেন্টাল ইমপ্লান্ট", cne:"Permanent new tooth", cn:"নতুন দাঁত বসানো", de:"Permanent, natural-looking replacement for a missing tooth.", db:"হারানো দাঁতের জায়গায় চিরস্থায়ী, আসল দাঁতের মতো নতুন দাঁত।", gal:["implant-single","implant-double","crowns-implant-bridge"] },
  { icon:"✨", img:"whitening-stained", img2:"teeth-whitening", slug:"teeth-whitening", pr:"৳12,000", dur:"1 Session", durbn:"১ সিটিং", en:"Laser Teeth Whitening", bn:"লেজার দাঁত সাদা করা", cne:"Laser teeth whitening", cn:"লেজার দাঁত সাদা করা", de:"Brighten your smile several shades with safe professional whitening.", db:"নিরাপদে দাঁতের হলদে ভাব দূর করে কয়েক শেড উজ্জ্বল হাসি।", gal:["whitening-compare","cosmetic-ba"] },
  { icon:"🩺", img:"extractions-surgery", slug:"extractions", pr:"৳5,000–8,000", dur:"20–30 min", durbn:"২০–৩০ মিনিট", en:"Painless Extraction & Surgery", bn:"ব্যথাহীন দাঁত তোলা ও সার্জারি", cne:"Tooth removal", cn:"দাঁত ফেলা", de:"Painless simple and surgical extraction including wisdom teeth.", db:"আক্কেল দাঁতসহ যেকোনো দাঁত ব্যথা ছাড়াই তুলে ফেলা।", gal:["extraction-front","frenectomy"] },
  { icon:"🧒", img:"kids-dentistry", slug:"kids-dentistry", pr:"৳1,000–1,500", dur:"20–30 min", durbn:"২০–৩০ মিনিট", en:"Kids Dentistry", bn:"শিশু দন্তচিকিৎসা", cne:"Children's dental care", cn:"শিশুদের দাঁতের যত্ন", de:"Gentle paediatric care, milk-tooth treatment and check-ups for children.", db:"শিশুদের দুধ দাঁতের চিকিৎসা, কোমল যত্ন ও নিয়মিত চেকআপ।", gal:["kids-checkup","kids-extraction"] },
  { icon:"💖", img:"cosmetic-dentistry", slug:"cosmetic-dentistry", pr:"৳3,500–9,000", dur:"Varies", durbn:"পরিবর্তনশীল", en:"Cosmetic Dentistry", bn:"কসমেটিক ডেন্টিস্ট্রি", cne:"Smile makeover", cn:"দাঁতের সৌন্দর্য চিকিৎসা", de:"Smile makeovers combining whitening, veneer and reshaping.", db:"হাসি সুন্দর করতে দাঁত সাদা করা, আবরণ ও শেপ ঠিক করা।", gal:["cosmetic-ba","cosmetic-veneers"] },
  { icon:"📏", img:"braces-aligners", slug:"braces-aligners", pr:"From ৳25,000", dur:"12–24 months", durbn:"১২–২৪ মাস", en:"Orthodontic Treatment", bn:"অর্থোডন্টিক চিকিৎসা", cne:"Teeth straightening", cn:"দাঁত সোজা করা (তার/ব্রেস)", de:"Straighten misaligned teeth and correct your bite with orthodontic care.", db:"আঁকাবাঁকা দাঁত ও কামড় ঠিক করতে তার (ব্রেস) লাগিয়ে চিকিৎসা।", gal:["aligner-tray"],
    sub:[ {en:"Braces",bn:"ব্রেসেস",slug:"braces-aligners"} ] },
  { icon:"😁", img:"aligner", slug:"aligners", pr:"From ৳1,50,000", dur:"6–18 months", durbn:"৬–১৮ মাস", en:"Aligner", bn:"অ্যালাইনার", cne:"Invisible aligner", cn:"অদৃশ্য তার", de:"Near-invisible clear aligner to straighten teeth discreetly.", db:"প্রায় অদৃশ্য স্বচ্ছ কভারে দাঁত গোপনে সোজা করা।", gal:["aligner"] },
];

/* ---------- i18n strings ---------- */
const I18N = {
  en: {
    nav_home:"Home", nav_about:"About", nav_services:"Services", nav_pricing:"Pricing",
    nav_calc:"Estimate", nav_ba:"Before & After", nav_contact:"Contact",
    book:"Book Appointment", call:"Call Now",
    topbar:"Painless & Cosmetic Dental Care · Sat–Thu 10:00 AM–9:30 PM · Fri 11:00 AM–9:30 PM",
    hero_eyebrow:"Trusted Dental Clinic in Dhaka",
    hero_title:"Keep your smile <span>healthy</span> & bright",
    hero_text:"Modern, painless and affordable dental care at Omega Dental. From routine check-ups to implants and smile makeovers — your comfort comes first.",
    hero_b1:"Painless Treatment", hero_b2:"Modern Technology", hero_b3:"Affordable Pricing", hero_b4:"Expert Surgeon",
    g_reviews:"Google Reviews",
    tb_addr:"West Kazipara, Dhaka", tb_hours:"Sat–Thu: 10:00 AM – 9:00 PM",
    rev_us:"Review Us", hp_label:"Happy Patients",
    fb1_t:"Modern Technology", fb1_s:"Latest equipment for accurate treatment",
    fb2_t:"Experienced Doctors", fb2_s:"Skilled & friendly dental specialists",
    fb3_t:"Safe & Hygienic", fb3_s:"Highest standards of sterilization",
    fb4_t:"Patient Comfort", fb4_s:"Painless & comfortable dental care",
    hero_badge_t:"Trusted by 5,000+ patients", hero_badge_s:"Gentle, expert care",
    stat1:"Happy Patients", stat2:"Years Experience", stat3:"Treatments", stat4:"Satisfaction",
    services_eyebrow:"Our Services",
    services_title:"Complete dental care under one roof",
    services_text:"Every treatment you need, delivered gently with modern technology and clear, honest pricing.",
    why_eyebrow:"Why Omega Dental",
    why_title:"Gentle care you can trust",
    why_text:"We combine advanced equipment with a genuinely painless approach, so every visit feels easy.",
    why1:"Painless, anxiety-free treatment", why2:"Strict sterilization & safety", why3:"Transparent, affordable pricing",
    why4:"Experienced, friendly dental surgeon", why5:"Modern equipment & techniques", why6:"Same-day & emergency care",
    calc_eyebrow:"Cost Estimator",
    calc_title:"Estimate your treatment cost",
    calc_text:"Pick a treatment to see an instant price estimate. Final cost is confirmed after your check-up.",
    calc_service:"Select treatment", calc_qty:"No. of Teeth / Units", calc_result:"Estimated Cost",
    calc_category:"Treatment Category", calc_serviceopt:"Service Option",
    calc_head1:"Treatment", calc_head2:"Price Calculator",
    calc_note:"This is an indicative estimate in BDT. Book a check-up for an exact quote.",
    calc_book:"Book this treatment",
    pricing_eyebrow:"Transparent Pricing",
    pricing_title:"Treatment price list",
    pricing_text:"Clear, upfront pricing for every treatment. Prices in Bangladeshi Taka (৳).",
    pricing_th1:"Treatment", pricing_th2:"Price (BDT)", per_tooth:"Per Tooth",
    ba_eyebrow:"Real Results",
    ba_title:"Before & after smiles",
    ba_text:"Drag the slider to see the transformation our patients enjoy.",
    ba_before:"Before", ba_after:"After",
    ba_f_all:"All", ba_f_whitening:"Whitening", ba_f_braces:"Braces", ba_f_veneers:"Veneers", ba_f_implants:"Implants",
    doc_eyebrow:"Meet the Doctor",
    doc_name:"Dr. Afsana Haque",
    doc_role:"Chief Dental Surgeon, Omega Dental",
    doc_text:"Dr. Afsana Haque leads Omega Dental with a focus on painless and cosmetic dentistry, helping patients of all ages achieve healthy, confident smiles.",
    doc_c1:"BDS (DU), BMDC Reg. No. 11071",
    doc_c2:"PGT in Oral & Maxillofacial Surgery — Dhaka Dental College",
    doc_c3:"PGT in Paediatrics — Dhaka Dental College",
    doc_c4:"Specially trained in Painless & Cosmetic Treatment",
    doc_book:"Book with Dr. Afsana",
    test_eyebrow:"Patient Stories",
    test_title:"Loved by our patients",
    contact_eyebrow:"Visit Us",
    contact_title:"Find Omega Dental",
    contact_addr_l:"Address", contact_phone_l:"Phone", contact_wa_l:"WhatsApp", contact_email_l:"Email", contact_hours_l:"Hours",
    contact_phone_main_l:"Main", contact_phone_appt_l:"Appointments",
    contact_addr:"1252/3, East Monipur, Metro Pillar-267 (W), West Kazipara, Begum Rokeya Soroni, Dhaka",
    contact_hours:"Saturday – Thursday: 10:00 AM – 9:30 PM · Friday: 11:00 AM – 9:30 PM",
    contact_dir:"Get Directions",
    book_eyebrow:"Appointments",
    book_title:"Book your appointment",
    book_text:"Pick a treatment, date and time below — we'll confirm instantly on WhatsApp.",
    book_side_eyebrow:"Prefer to talk?",
    book_side_title:"Message or call us directly",
    book_side_text:"Send us a quick WhatsApp message, call the clinic, or get directions — whatever is easiest for you.",
    f_name:"Full name", f_phone:"Phone number", f_service:"Treatment needed",
    f_date:"Preferred date", f_time:"Preferred time", f_date_ph:"Type or pick a date", f_time_ph:"Type or pick a time", f_today:"Today", f_tomorrow:"Tomorrow", f_msg:"Where are you coming from? (optional)", f_msg_ph:"e.g. Mirpur, Kazipara, Uttara…",
    f_emerg:"This is an emergency / I need same-day care",
    f_select:"Select a treatment", f_submit:"Send via WhatsApp", f_wa:"Quick WhatsApp",
    f_success:"Opening WhatsApp with your appointment details…",
    foot_about:"Modern, painless and affordable dental care in Dhaka. Healthy smiles for the whole family.",
    foot_links:"Quick Links", foot_services:"Services", foot_contact:"Contact",
    foot_rights:"All rights reserved.",
    nav_tech:"Technology", nav_faq:"FAQ",
    nav_contact_link:"Contact",
    cb_title:"Request a Free Callback", cb_ph:"Enter Your Number", cb_wa:"WhatsApp",
    cb_success:"Thanks! Opening WhatsApp to confirm your callback…",
    nav_about_us:"About Us", nav_ourservices:"Our Services", nav_branch:"Branch",
    nav_doctors:"Doctors", nav_pricelist:"Price List", nav_blog:"Blog", nav_gallery:"Gallery", nav_careers:"Careers",
    srch_ph:"Search treatments, prices, FAQs…", srch_hint:"↑↓ navigate · Enter open · Esc close",
    srch_services:"Services", srch_pricing:"Pricing", srch_faq:"FAQ", srch_blog:"Blog", srch_tech:"Technology",
    srch_empty:"No results found. Try a different keyword.",
    svc_learn:"Learn more", book_now:"Book Now", view_all:"View All Treatments",
    dd_gapfill:"Teeth Gap Filling", dd_toothfill:"Tooth Filling", dd_implant:"Dental Implant",
    dd_ortho:"Orthodontic Treatment", dd_scaling:"Teeth Scaling & Polishing",
    dd_wisdom:"Wisdom Teeth Removal", dd_rct:"Root Canal Treatment (RCT)", dd_more:"More Services",
    steps_eyebrow:"How It Works", steps_title:"Your visit in 4 easy steps",
    steps_text:"From your first message to aftercare, we keep everything simple and stress-free.",
    step1_t:"Book", step1_d:"Request an appointment online, by phone or WhatsApp — same-day slots available.",
    step2_t:"Consult", step2_d:"Meet our doctors for a thorough check-up and a clear, honest treatment plan.",
    step3_t:"Treatment", step3_d:"Relax through gentle, painless treatment using modern equipment.",
    step4_t:"Aftercare", step4_d:"Go home with simple care tips and easy follow-up support.",
    tech_eyebrow:"Technology & Safety",
    tech_title:"Modern tools, 10x safer care",
    tech_text:"We invest in advanced equipment and strict hygiene, so every treatment is precise, comfortable and safe.",
    emerg_eyebrow:"Always Here For You",
    emerg_title:"Dental emergency? We're ready",
    emerg_text:"Same-day appointments for urgent pain, and online video consultations for patients living abroad (NRB).",
    emerg_b1:"Same-day emergency care", emerg_b2:"Online video consultation", emerg_b3:"Friendly support on WhatsApp",
    emerg_call:"Call for emergency", emerg_video:"Book a video consult",
    faq_eyebrow:"Questions", faq_title:"Frequently asked questions",
    tips_eyebrow:"Dental Tips", tips_title:"Healthy-smile tips & guides",
    tips_read:"Read more",
    wa_online:"● Online now", wa_greeting:"Hi! 👋 How can we help you today? We typically reply within minutes.",
    wa_chip_book:"📅 Book Appointment", wa_chip_price:"💰 Treatment Price?", wa_chip_q:"❓ Ask a Question",
    wa_start:"Start Chat on WhatsApp →",
    google_reviews_label:"Based on 230+ Google Reviews",
    qr_scan_label:"Scan to Review Us on Google",
    see_reviews:"See All Reviews →",
    hero_wa:"WhatsApp Us",
    lang_label:"বাংলা",
  },
  bn: {
    nav_home:"হোম", nav_about:"পরিচিতি", nav_services:"সেবা", nav_pricing:"মূল্য",
    nav_calc:"খরচ হিসাব", nav_ba:"আগে ও পরে", nav_contact:"যোগাযোগ",
    book:"অ্যাপয়েন্টমেন্ট নিন", call:"কল করুন",
    topbar:"ব্যথাহীন ও কসমেটিক ডেন্টাল কেয়ার · শনি–বৃহঃ সকাল ১০টা–রাত ৯:৩০ · শুক্র দুপুর ১১টা–রাত ৯:৩০",
    hero_eyebrow:"ঢাকার বিশ্বস্ত ডেন্টাল ক্লিনিক",
    hero_title:"আপনার হাসি রাখুন <span>সুস্থ</span> ও উজ্জ্বল",
    hero_text:"ওমেগা ডেন্টালে আধুনিক, ব্যথাহীন ও সাশ্রয়ী দন্তচিকিৎসা। সাধারণ চেকআপ থেকে ইমপ্লান্ট ও স্মাইল মেকওভার — সবার আগে আপনার স্বস্তি।",
    hero_b1:"ব্যথাহীন চিকিৎসা", hero_b2:"আধুনিক প্রযুক্তি", hero_b3:"সাশ্রয়ী মূল্য", hero_b4:"অভিজ্ঞ সার্জন",
    g_reviews:"গুগল রিভিউ",
    tb_addr:"পশ্চিম কাজীপাড়া, ঢাকা", tb_hours:"শনি–বৃহ: সকাল ১০টা – রাত ৯টা",
    rev_us:"রিভিউ দিন", hp_label:"সন্তুষ্ট রোগী",
    fb1_t:"আধুনিক প্রযুক্তি", fb1_s:"নির্ভুল চিকিৎসার জন্য সর্বাধুনিক যন্ত্রপাতি",
    fb2_t:"অভিজ্ঞ চিকিৎসক", fb2_s:"দক্ষ ও বন্ধুত্বপূর্ণ ডেন্টাল বিশেষজ্ঞ",
    fb3_t:"নিরাপদ ও স্বাস্থ্যকর", fb3_s:"সর্বোচ্চ জীবাণুমুক্ত পরিবেশ",
    fb4_t:"রোগীর স্বস্তি", fb4_s:"ব্যথাহীন ও আরামদায়ক দন্তসেবা",
    hero_badge_t:"৫,০০০+ রোগীর আস্থা", hero_badge_s:"কোমল, দক্ষ সেবা",
    stat1:"সন্তুষ্ট রোগী", stat2:"বছরের অভিজ্ঞতা", stat3:"চিকিৎসা", stat4:"সন্তুষ্টি",
    services_eyebrow:"আমাদের সেবা",
    services_title:"এক ছাদের নিচে সম্পূর্ণ দন্তসেবা",
    services_text:"আপনার প্রয়োজনীয় প্রতিটি চিকিৎসা — আধুনিক প্রযুক্তিতে কোমলভাবে ও স্বচ্ছ মূল্যে।",
    why_eyebrow:"কেন ওমেগা ডেন্টাল",
    why_title:"আস্থা রাখার মতো কোমল সেবা",
    why_text:"আধুনিক যন্ত্রপাতির সঙ্গে সত্যিকারের ব্যথাহীন পদ্ধতি — প্রতিটি ভিজিট হয় সহজ।",
    why1:"ব্যথাহীন, উদ্বেগমুক্ত চিকিৎসা", why2:"কঠোর স্টেরিলাইজেশন ও নিরাপত্তা", why3:"স্বচ্ছ, সাশ্রয়ী মূল্য",
    why4:"অভিজ্ঞ, বন্ধুত্বপূর্ণ ডেন্টাল সার্জন", why5:"আধুনিক যন্ত্রপাতি ও কৌশল", why6:"একই দিনে ও জরুরি সেবা",
    calc_eyebrow:"খরচ হিসাবকারী",
    calc_title:"আপনার চিকিৎসার খরচ হিসাব করুন",
    calc_text:"একটি চিকিৎসা বেছে নিয়ে তাৎক্ষণিক খরচের ধারণা নিন। চূড়ান্ত খরচ চেকআপের পর নিশ্চিত হয়।",
    calc_service:"চিকিৎসা নির্বাচন করুন", calc_qty:"দাঁত / ইউনিট সংখ্যা", calc_result:"আনুমানিক খরচ",
    calc_category:"চিকিৎসার ধরন", calc_serviceopt:"সেবা নির্বাচন",
    calc_head1:"ট্রিটমেন্ট", calc_head2:"প্রাইস ক্যালকুলেটর",
    calc_note:"এটি টাকায় একটি আনুমানিক হিসাব। সঠিক মূল্যের জন্য চেকআপ বুক করুন।",
    calc_book:"এই চিকিৎসা বুক করুন",
    pricing_eyebrow:"স্বচ্ছ মূল্য",
    pricing_title:"চিকিৎসার মূল্য তালিকা",
    pricing_text:"প্রতিটি চিকিৎসার স্পষ্ট, আগাম মূল্য। মূল্য বাংলাদেশি টাকায় (৳)।",
    pricing_th1:"চিকিৎসা", pricing_th2:"মূল্য (টাকা)", per_tooth:"প্রতি দাঁত",
    ba_eyebrow:"সত্যিকারের ফলাফল",
    ba_title:"আগে ও পরের হাসি",
    ba_text:"পরিবর্তন দেখতে স্লাইডারটি টেনে দেখুন।",
    ba_before:"আগে", ba_after:"পরে",
    ba_f_all:"সব", ba_f_whitening:"হোয়াইটেনিং", ba_f_braces:"ব্রেসেস", ba_f_veneers:"ভিনিয়ার", ba_f_implants:"ইমপ্লান্ট",
    doc_eyebrow:"আমাদের চিকিৎসক",
    doc_name:"ডা. আফসানা হক",
    doc_role:"চিফ ডেন্টাল সার্জন, ওমেগা ডেন্টাল",
    doc_text:"ডা. আফসানা হক ব্যথাহীন ও কসমেটিক দন্তচিকিৎসায় বিশেষ মনোযোগ দিয়ে ওমেগা ডেন্টাল পরিচালনা করেন, সব বয়সের রোগীকে সুস্থ ও আত্মবিশ্বাসী হাসি দিতে সাহায্য করেন।",
    doc_c1:"বিডিএস (ঢাবি), বিএমডিসি রেজি. নং ১১০৭১",
    doc_c2:"পিজিটি ইন ওরাল ও ম্যাক্সিলোফেসিয়াল সার্জারি — ঢাকা ডেন্টাল কলেজ",
    doc_c3:"পিজিটি ইন পেডিয়াট্রিক্স — ঢাকা ডেন্টাল কলেজ",
    doc_c4:"ব্যথাহীন ও কসমেটিক চিকিৎসায় বিশেষ প্রশিক্ষিত",
    doc_book:"ডা. আফসানার অ্যাপয়েন্টমেন্ট",
    test_eyebrow:"রোগীদের কথা",
    test_title:"রোগীদের ভালোবাসায়",
    contact_eyebrow:"আমাদের কাছে আসুন",
    contact_title:"ওমেগা ডেন্টাল খুঁজুন",
    contact_addr_l:"ঠিকানা", contact_phone_l:"ফোন", contact_wa_l:"হোয়াটসঅ্যাপ", contact_email_l:"ইমেইল", contact_hours_l:"সময়",
    contact_phone_main_l:"মূল", contact_phone_appt_l:"অ্যাপয়েন্টমেন্ট",
    contact_addr:"১২৫২/৩, পূর্ব মনিপুর, মেট্রো পিলার-২৬৭ (ওয়াই), পশ্চিম কাজীপাড়া, বেগম রোকেয়া সরণি, ঢাকা",
    contact_hours:"শনিবার – বৃহস্পতিবার: সকাল ১০টা – রাত ৯:৩০ · শুক্রবার: দুপুর ১১টা – রাত ৯:৩০",
    contact_dir:"দিকনির্দেশ নিন",
    book_eyebrow:"অ্যাপয়েন্টমেন্ট",
    book_title:"আপনার অ্যাপয়েন্টমেন্ট বুক করুন",
    book_text:"নিচে চিকিৎসা, তারিখ ও সময় বেছে নিন — আমরা সঙ্গে সঙ্গে হোয়াটসঅ্যাপে নিশ্চিত করব।",
    book_side_eyebrow:"সরাসরি কথা বলবেন?",
    book_side_title:"মেসেজ বা কল করুন",
    book_side_text:"দ্রুত হোয়াটসঅ্যাপ মেসেজ দিন, ক্লিনিকে কল করুন, অথবা দিকনির্দেশ নিন — যেটি আপনার জন্য সহজ।",
    f_name:"পুরো নাম", f_phone:"ফোন নম্বর", f_service:"প্রয়োজনীয় চিকিৎসা",
    f_date:"পছন্দের তারিখ", f_time:"পছন্দের সময়", f_date_ph:"তারিখ লিখুন বা বেছে নিন", f_time_ph:"সময় লিখুন বা বেছে নিন", f_today:"আজ", f_tomorrow:"আগামীকাল", f_msg:"আপনি কোথা থেকে আসছেন? (ঐচ্ছিক)", f_msg_ph:"যেমন: মিরপুর, কাজীপাড়া, উত্তরা…",
    f_emerg:"এটি জরুরি / আমার একই দিনে সেবা দরকার",
    f_select:"একটি চিকিৎসা নির্বাচন করুন", f_submit:"হোয়াটসঅ্যাপে পাঠান", f_wa:"দ্রুত হোয়াটসঅ্যাপ",
    f_success:"আপনার অ্যাপয়েন্টমেন্টের তথ্যসহ হোয়াটসঅ্যাপ খোলা হচ্ছে…",
    foot_about:"ঢাকায় আধুনিক, ব্যথাহীন ও সাশ্রয়ী দন্তচিকিৎসা। পুরো পরিবারের সুস্থ হাসি।",
    foot_links:"দ্রুত লিংক", foot_services:"সেবা", foot_contact:"যোগাযোগ",
    foot_rights:"সর্বস্বত্ব সংরক্ষিত।",
    nav_tech:"প্রযুক্তি", nav_faq:"প্রশ্নোত্তর",
    nav_contact_link:"যোগাযোগ",
    cb_title:"ফ্রি কলব্যাক অনুরোধ করুন", cb_ph:"আপনার নম্বর লিখুন", cb_wa:"হোয়াটসঅ্যাপ",
    cb_success:"ধন্যবাদ! কলব্যাক নিশ্চিত করতে হোয়াটসঅ্যাপ খোলা হচ্ছে…",
    nav_about_us:"আমাদের সম্পর্কে", nav_ourservices:"আমাদের সেবা", nav_branch:"শাখা",
    nav_doctors:"ডাক্তার", nav_pricelist:"মূল্য তালিকা", nav_blog:"ব্লগ", nav_gallery:"গ্যালারি", nav_careers:"ক্যারিয়ার",
    srch_ph:"চিকিৎসা, মূল্য, প্রশ্নোত্তর খুঁজুন…", srch_hint:"↑↓ নেভিগেট · Enter খুলুন · Esc বন্ধ করুন",
    srch_services:"সেবা", srch_pricing:"মূল্য তালিকা", srch_faq:"প্রশ্নোত্তর", srch_blog:"ব্লগ", srch_tech:"প্রযুক্তি",
    srch_empty:"কোনো ফলাফল পাওয়া যায়নি। অন্য শব্দ চেষ্টা করুন।",
    svc_learn:"বিস্তারিত", book_now:"বুক করুন", view_all:"সব চিকিৎসা দেখুন",
    dd_gapfill:"দাঁতের ফাঁক ফিলিং", dd_toothfill:"দাঁতের ফিলিং", dd_implant:"ডেন্টাল ইমপ্লান্ট",
    dd_ortho:"অর্থোডন্টিক চিকিৎসা", dd_scaling:"স্কেলিং ও পলিশিং",
    dd_wisdom:"আক্কেল দাঁত তোলা", dd_rct:"রুট ক্যানেল চিকিৎসা (RCT)", dd_more:"আরও সেবা",
    steps_eyebrow:"যেভাবে কাজ করে", steps_title:"৪টি সহজ ধাপে আপনার ভিজিট",
    steps_text:"প্রথম বার্তা থেকে আফটারকেয়ার পর্যন্ত, আমরা সবকিছু সহজ ও চাপমুক্ত রাখি।",
    step1_t:"বুক করুন", step1_d:"অনলাইন, ফোন বা হোয়াটসঅ্যাপে অ্যাপয়েন্টমেন্ট নিন — একই দিনের স্লট আছে।",
    step2_t:"পরামর্শ", step2_d:"আমাদের ডাক্তারের সঙ্গে পূর্ণাঙ্গ চেকআপ ও স্পষ্ট, সৎ চিকিৎসা পরিকল্পনা।",
    step3_t:"চিকিৎসা", step3_d:"আধুনিক যন্ত্রপাতিতে কোমল, ব্যথাহীন চিকিৎসায় নিশ্চিন্ত থাকুন।",
    step4_t:"আফটারকেয়ার", step4_d:"সহজ যত্নের পরামর্শ ও সহজ ফলোআপ সহায়তা নিয়ে বাড়ি ফিরুন।",
    tech_eyebrow:"প্রযুক্তি ও নিরাপত্তা",
    tech_title:"আধুনিক যন্ত্র, ১০ গুণ নিরাপদ সেবা",
    tech_text:"আমরা উন্নত যন্ত্রপাতি ও কঠোর পরিচ্ছন্নতায় বিনিয়োগ করি, যাতে প্রতিটি চিকিৎসা সুনির্দিষ্ট, আরামদায়ক ও নিরাপদ হয়।",
    emerg_eyebrow:"সবসময় আপনার পাশে",
    emerg_title:"ডেন্টাল জরুরি অবস্থা? আমরা প্রস্তুত",
    emerg_text:"জরুরি ব্যথায় একই দিনের অ্যাপয়েন্টমেন্ট এবং প্রবাসী (এনআরবি) রোগীদের জন্য অনলাইন ভিডিও পরামর্শ।",
    emerg_b1:"একই দিনে জরুরি সেবা", emerg_b2:"অনলাইন ভিডিও পরামর্শ", emerg_b3:"হোয়াটসঅ্যাপে সহায়তা",
    emerg_call:"জরুরি কল করুন", emerg_video:"ভিডিও পরামর্শ বুক করুন",
    faq_eyebrow:"প্রশ্ন", faq_title:"সচরাচর জিজ্ঞাসিত প্রশ্ন",
    tips_eyebrow:"ডেন্টাল টিপস", tips_title:"সুস্থ হাসির টিপস ও গাইড",
    tips_read:"আরও পড়ুন",
    wa_online:"● এখন অনলাইন", wa_greeting:"হ্যালো! 👋 আপনাকে কীভাবে সাহায্য করতে পারি? আমরা কয়েক মিনিটের মধ্যে উত্তর দিই।",
    wa_chip_book:"📅 অ্যাপয়েন্টমেন্ট নিন", wa_chip_price:"💰 চিকিৎসার খরচ?", wa_chip_q:"❓ প্রশ্ন করুন",
    wa_start:"WhatsApp-এ চ্যাট শুরু করুন →",
    google_reviews_label:"২৩০+ গুগল রিভিউ এর ভিত্তিতে",
    qr_scan_label:"গুগলে রিভিউ দিতে স্ক্যান করুন",
    see_reviews:"সব রিভিউ দেখুন →",
    hero_wa:"WhatsApp করুন",
    lang_label:"EN",
  }
};

/* ---------- Testimonials ---------- */
const GMAPS_REVIEW_URL="https://www.google.com/maps/place/OMEGA+Dental/@23.8018222,90.3680491,17z/data=!4m8!3m7!1s0x3755c144389f4e91:0xf69deedb238d0bb7!8m2!3d23.8018173!4d90.370624!9m1!1b1!16s%2Fg%2F11ms4g6xnd?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D";
const TESTIMONIALS = [
  { en:"This is a fantastic dental clinic. The service is excellent. The doctor is very professional, helpful and kind. She was on time for my appointment and everything was explained clearly.", name:"Khandaker Saif Karim", role:"Google Review" },
  { en:"I have experienced world-class dental care right here. Best services ever! Thank you so much Omega Dental for giving me comfort and good services ♥️ Highly recommended.", name:"Tasmia Nohor", role:"Google Review" },
  { en:"Very good dental service. The doctor is experienced and caring, and the staff are very cooperative. Clean environment and professional treatment. Highly recommended.", name:"Tanjida Islam", role:"Google Review" },
  { en:"I had a great experience. The dentist was very professional and provided excellent treatment. Highly recommended. ❣️", name:"Kazi Sabika", role:"Google Review" },
  { en:"Very good service. The dentist is very cooperative and understanding of my problems. Very responsive whenever I faced any issues, got an immediate solution. Alhamdulillah.", name:"Sharif Ahmed", role:"Google Review" },
  { en:"She's so good in treatment. Also nice service. Highly recommend! 😊", name:"Mahathir Rudro", role:"Google Review" },
  { en:"I had a great experience at Omega Dental. Dentist are very professional and caring, highly recommended. 😊", name:"Md Yousuf", role:"Google Review" },
  { en:"I am truly satisfied with their service. Nice behaviour and very carefully done their treatment with post treatment care.", name:"Tanzin Tamanna", role:"Google Review" },
];

/* ---------- Process steps ---------- */
const STEPS = [
  { ic:"calendar", t:"step1_t", d:"step1_d" },
  { ic:"stethoscope", t:"step2_t", d:"step2_d" },
  { ic:"smile", t:"step3_t", d:"step3_d" },
  { ic:"heart", t:"step4_t", d:"step4_d" },
];

/* ---------- Technology & safety ---------- */
const TECH = [
  { ic:"shield", en:"4-Step Sterilization", bn:"৪-ধাপ স্টেরিলাইজেশন", de:"Every instrument is cleaned and sterilized through a strict 4-step protocol.", db:"প্রতিটি যন্ত্র কঠোর ৪-ধাপ প্রোটোকলে পরিষ্কার ও জীবাণুমুক্ত করা হয়।" },
  { ic:"scan", en:"Digital X-Ray", bn:"ডিজিটাল এক্স-রে", de:"Low-radiation digital imaging for fast, accurate diagnosis.", db:"দ্রুত ও নির্ভুল রোগ নির্ণয়ে কম-রেডিয়েশন ডিজিটাল ইমেজিং।" },
  { ic:"camera", en:"Intraoral Camera", bn:"ইন্ট্রাঅরাল ক্যামেরা", de:"See exactly what we see — clear images of your teeth on screen.", db:"আমরা যা দেখি তাই দেখুন — পর্দায় আপনার দাঁতের স্পষ্ট ছবি।" },
  { ic:"zap", en:"Painless Techniques", bn:"ব্যথাহীন কৌশল", de:"Gentle anaesthesia and modern methods keep treatment comfortable.", db:"কোমল অ্যানেস্থেসিয়া ও আধুনিক পদ্ধতিতে চিকিৎসা আরামদায়ক থাকে।" },
  { ic:"package", en:"Sterile Disposables", bn:"জীবাণুমুক্ত ডিসপোজেবল", de:"Single-use, sealed disposables for every patient.", db:"প্রতি রোগীর জন্য একবার-ব্যবহার্য, সিলড ডিসপোজেবল।" },
  { ic:"cpu", en:"Modern Equipment", bn:"আধুনিক যন্ত্রপাতি", de:"Up-to-date dental units and tools for better results.", db:"ভালো ফলাফলের জন্য হালনাগাদ ডেন্টাল ইউনিট ও যন্ত্র।" },
];

/* ---------- FAQs ---------- */
const FAQS = [
  { qe:"Is the treatment really painless?", ae:"Yes. Our doctors are specially trained in painless dentistry. We use gentle anaesthesia and modern techniques so most patients feel little to no discomfort.",
    qb:"চিকিৎসা কি সত্যিই ব্যথাহীন?", ab:"হ্যাঁ। আমাদের ডাক্তাররা ব্যথাহীন দন্তচিকিৎসায় বিশেষভাবে প্রশিক্ষিত। আমরা কোমল অ্যানেস্থেসিয়া ও আধুনিক কৌশল ব্যবহার করি, তাই বেশিরভাগ রোগী খুব কম বা কোনো অস্বস্তি অনুভব করেন না।" },
  { qe:"How much will my treatment cost?", ae:"Use our online cost estimator for an instant range, or see the full price list. The exact cost is confirmed after a quick check-up.",
    qb:"আমার চিকিৎসায় কত খরচ হবে?", ab:"তাৎক্ষণিক ধারণার জন্য আমাদের অনলাইন কস্ট এস্টিমেটর ব্যবহার করুন, অথবা সম্পূর্ণ মূল্য তালিকা দেখুন। সঠিক খরচ একটি দ্রুত চেকআপের পর নিশ্চিত হয়।" },
  { qe:"Do you offer same-day or emergency appointments?", ae:"Yes, we keep slots for urgent pain and dental emergencies. Call or WhatsApp us and we'll see you as soon as possible.",
    qb:"আপনারা কি একই দিনে বা জরুরি অ্যাপয়েন্টমেন্ট দেন?", ab:"হ্যাঁ, জরুরি ব্যথা ও ডেন্টাল ইমার্জেন্সির জন্য আমরা স্লট রাখি। কল বা হোয়াটসঅ্যাপ করুন, যত দ্রুত সম্ভব আপনাকে দেখব।" },
  { qe:"Can I consult from abroad?", ae:"Yes. We offer online video consultations for non-resident Bangladeshis and overseas patients who need advice before travelling or treatment.",
    qb:"আমি কি বিদেশ থেকে পরামর্শ নিতে পারি?", ab:"হ্যাঁ। ভ্রমণ বা চিকিৎসার আগে পরামর্শ প্রয়োজন এমন প্রবাসী বাংলাদেশি ও বিদেশি রোগীদের জন্য আমরা অনলাইন ভিডিও পরামর্শ দিই।" },
  { qe:"Do you treat children?", ae:"Absolutely. We provide gentle paediatric care including check-ups, milk-tooth treatment and fillings for kids of all ages.",
    qb:"আপনারা কি শিশুদের চিকিৎসা করেন?", ab:"অবশ্যই। আমরা সব বয়সের শিশুদের জন্য চেকআপ, দুধ দাঁতের চিকিৎসা ও ফিলিংসহ কোমল পেডিয়াট্রিক সেবা দিই।" },
  { qe:"Where is Omega Dental located?", ae:"We are at 1252/3, East Monipur, near Metro Pillar 267(W), West Kazipara, Begum Rokeya Sarani, Dhaka. Tap 'Get Directions' on the map for the route.",
    qb:"ওমেগা ডেন্টাল কোথায়?", ab:"আমরা ১২৫২/৩, পূর্ব মনিপুর, মেট্রো পিলার ২৬৭(ওয়াই)-এর কাছে, পশ্চিম কাজীপাড়া, বেগম রোকেয়া সরণি, ঢাকায় অবস্থিত। পথের জন্য ম্যাপে 'দিকনির্দেশ নিন' চাপুন।" },
];

/* ---------- Dental tips / blog ---------- */
const POSTS = [
  { ic:"🪥", slug:"five-habits-healthier-teeth", te:"5 daily habits for healthier teeth", ee:"Simple brushing, flossing and diet habits that protect your smile for life.",
    tb:"সুস্থ দাঁতের জন্য ৫টি দৈনিক অভ্যাস", eb:"সহজ ব্রাশ, ফ্লস ও খাদ্যাভ্যাস যা সারাজীবন আপনার হাসি রক্ষা করে।" },
  { ic:"🌱", slug:"when-you-need-root-canal", te:"When do you really need a root canal?", ee:"The warning signs of an infected tooth and how a root canal saves it painlessly.",
    tb:"কখন সত্যিই রুট ক্যানেল দরকার?", eb:"সংক্রমিত দাঁতের সতর্ক সংকেত এবং কীভাবে রুট ক্যানেল ব্যথাহীনভাবে তা বাঁচায়।" },
  { ic:"✨", slug:"teeth-whitening-what-to-expect", te:"Teeth whitening: what to expect", ee:"How professional whitening works, how long it lasts and how to keep results bright.",
    tb:"দাঁত সাদা করা: কী আশা করবেন", eb:"পেশাদার হোয়াইটেনিং কীভাবে কাজ করে, কতদিন থাকে এবং ফল উজ্জ্বল রাখার উপায়।" },
];

/* ---------- Before/After cases (SVG placeholders) ---------- */
const BA_CASES = [
  { type:"whitening", before:"#cdbfa3", after:"#f5f3ec", bImg:"assets/ba/whitening-before.jpg?v=3", aImg:"assets/ba/whitening-after.jpg?v=3" },
  { type:"veneers",   before:"#cdb196", after:"#f3f1ea", bImg:"assets/ba/veneers-before.jpg",   aImg:"assets/ba/veneers-after.jpg" },
  { type:"braces",    before:"#d8c7ad", after:"#f4f2ec", bImg:"assets/ba/braces-before.jpg",    aImg:"assets/ba/braces-after.jpg" },
  { type:"implants",  before:"#c9b79b", after:"#f1efe8", bImg:"assets/ba/implants-before.jpg",  aImg:"assets/ba/implants-after.jpg" },
];

/* ---------- WhatsApp chat pre-filled messages ---------- */
const WA_MSGS = {
  book:"Hi, I'd like to book an appointment at Omega Dental.",
  price:"Hi, I'd like to know the treatment prices at Omega Dental.",
  question:"Hi, I have a question about dental treatment at Omega Dental."
};
const WA_MSGS_BN = {
  book:"হ্যালো, আমি ওমেগা ডেন্টালে অ্যাপয়েন্টমেন্ট নিতে চাই।",
  price:"হ্যালো, আমি ওমেগা ডেন্টালের চিকিৎসার খরচ জানতে চাই।",
  question:"হ্যালো, ওমেগা ডেন্টালে চিকিৎসা সম্পর্কে আমার একটি প্রশ্ন আছে।"
};

/* ============================================================
   Rendering + interactions
   ============================================================ */
let LANG = localStorage.getItem("omega_lang") || "bn";  // Bangladeshi audience → Bangla first

function t(key){ return (I18N[LANG] && I18N[LANG][key]) ?? (I18N.en[key] ?? key); }
function fmt(n){ return n.toLocaleString("en-IN"); } // 1,20,000 style grouping

function applyI18n(){
  document.documentElement.lang = LANG;
  document.documentElement.setAttribute("data-lang", LANG);
  document.body.classList.toggle("bn", LANG === "bn");
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k = el.getAttribute("data-i18n");
    if (el.hasAttribute("data-i18n-html")) el.innerHTML = t(k);
    else el.textContent = t(k);
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el=>{
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
  });
  // dynamic blocks
  renderServices(); renderPricing(); renderCalcOptions(); renderTestimonials(); renderBookOptions(); renderBookSlots();
  renderSteps(); renderTech(); renderFaqs(); renderCalcBA(); renderMarquee();
  const tgl = document.getElementById("langText");
  if (tgl) tgl.textContent = t("lang_label");
}

function setLang(l){ LANG = l; localStorage.setItem("omega_lang", l); applyI18n(); }

/* ----- Inline SVG icons (Lucide-style, currentColor) ----- */
const ICONS = {
  calendar:'<path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>',
  stethoscope:'<path d="M4 3v6a5 5 0 0 0 10 0V3"/><path d="M9 18a4 4 0 0 0 8 0v-3"/><circle cx="20" cy="12" r="2"/>',
  smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/>',
  heart:'<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21l8.8-8.8a5 5 0 0 0 0-7.1z"/>',
  shield:'<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>',
  scan:'<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
  camera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  zap:'<path d="M13 2L3 14h9l-1 8 10-12h-9z"/>',
  package:'<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
  cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
  pin:'<path d="M12 22s8-5.5 8-12a8 8 0 1 0-16 0c0 6.5 8 12 8 12z"/><circle cx="12" cy="10" r="3"/>',
  phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9z"/>',
  mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7 10-7"/>',
  chat:'<path d="M21 11.5a8.4 8.4 0 0 1-12 7.6L3 21l1.9-6A8.4 8.4 0 1 1 21 11.5z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
};
function svgIcon(name){return `<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.check}</svg>`;}

/* ----- Services grid ----- */
const SVC_SLUG = {
  "Scaling & Polishing":"scaling-polishing",
  "Tooth Fillings":"tooth-fillings",
  "Root Canal (RCT)":"root-canal",
  "Crowns & Bridges":"crowns-bridges",
  "Teeth Whitening":"teeth-whitening",
  "Dentures":"dentures",
  "Braces & Aligners":"braces-aligners",
  "Dental Implants":"dental-implants",
  "Veneers":"veneers",
  "Extractions & Surgery":"extractions",
  "Kids Dentistry":"kids-dentistry",
  "Cosmetic Dentistry":"cosmetic-dentistry",
};
const SVC_TONE = ["#dff3ee","#cfe0f7","#ffe7cf","#e3f7f1","#e7ecfb","#fde7d6"];
function renderServices(){
  const wrap = document.getElementById("servicesGrid");
  if(!wrap) return;
  wrap.innerHTML = SERVICES.map((s)=>{
    const href = s.slug ? `services/${s.slug}.html` : "book.html";
    const name = LANG==="bn"?s.bn:s.en;
    const common = LANG==="bn"?s.cn:s.cne;
    const sub = (s.sub||[]).map(o=>`<a class="svc-sub-chip" href="services/${o.slug}.html">${LANG==="bn"?o.bn:o.en}</a>`).join("");
    const dur = s.dur ? `<span class="svc-dur"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${LANG==="bn"?s.durbn:s.dur}</span>` : "";
    const media = s.vid
      ? `<img class="svc-static" src="assets/services/${s.img}.jpg?v=2" onerror="this.onerror=null;this.src='assets/services/${s.img}.svg?v=3'" alt="${name}" loading="lazy"><video class="svc-anim" muted loop playsinline preload="metadata"><source src="assets/services/${s.vid}.mp4?v=2" type="video/mp4"></video>`
      : s.img2
        ? `<img class="svc-static" src="assets/services/${s.img}.jpg?v=2" onerror="this.onerror=null;this.src='assets/services/${s.img}.svg?v=3'" alt="${name}" loading="lazy"><img class="svc-anim svc-anim-img" src="assets/services/${s.img2}.jpg?v=2" onerror="this.onerror=null;this.src='assets/services/${s.img2}.svg?v=3'" alt="${name}" loading="lazy">`
        : `<img src="assets/services/${s.img}.jpg?v=2" onerror="this.onerror=null;this.src='assets/services/${s.img}.svg?v=3'" alt="${name}" loading="lazy">`;
    const galSrcs=[s.img,...(s.img2?[s.img2]:[]),...(s.gal||[])];
    const galHtml=galSrcs.length>1?`<div class="svc-gal">${galSrcs.map((t,i)=>`<button class="sgal-thumb${i===0?' active':''}" type="button" data-src="assets/services/${t}.jpg?v=2"><img src="assets/services/${t}.jpg?v=2" alt="" loading="lazy" onerror="this.parentNode.style.display='none'"></button>`).join('')}</div>`:'';
    return `
    <article class="svc-card${s.vid||s.img2?' svc-has-vid':''}">
      <a class="svc-img" href="${href}" aria-label="${name}">${media}</a>${galHtml}
      <div class="svc-body">
        <div class="svc-top"><span class="svc-price">${s.pr}</span>${dur}</div>
        <h3><a href="${href}">${name}</a></h3>
        ${common?`<span class="svc-common">${common}</span>`:""}
        <p>${LANG==="bn"?s.db:s.de}</p>
        ${sub?`<div class="svc-sub">${sub}</div>`:""}
        <a class="btn btn-primary svc-book" href="book.html?service=${encodeURIComponent(s.en)}">${t("book_now")}</a>
      </div>
    </article>`;}).join("");
  wrap.querySelectorAll(".svc-has-vid").forEach(function(card){
    var img=card.querySelector(".svc-static");
    var vid=card.querySelector(".svc-anim");
    if(!img||!vid) return;
    function showVid(){img.style.opacity="0";vid.style.opacity="1";if(vid.tagName==="VIDEO")vid.play().catch(function(){});}
    function showImg(){img.style.opacity="1";vid.style.opacity="0";if(vid.tagName==="VIDEO")vid.pause();}
    card.addEventListener("mouseenter",showVid);
    card.addEventListener("mouseleave",showImg);
    card.addEventListener("touchstart",function(){card.classList.add("touch-active");showVid();},{passive:true});
    card.addEventListener("touchend",function(){card.classList.remove("touch-active");showImg();},{passive:true});
    var svcIO=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting)showVid();else showImg();});},{threshold:0.3});
    svcIO.observe(card);
  });
  wrap.querySelectorAll(".svc-gal").forEach(function(gal){
    var card=gal.closest(".svc-card");
    var staticImg=card.querySelector(".svc-static")||card.querySelector(".svc-img img");
    gal.querySelectorAll(".sgal-thumb").forEach(function(btn){
      btn.addEventListener("click",function(e){
        e.preventDefault();e.stopPropagation();
        gal.querySelectorAll(".sgal-thumb").forEach(function(b){b.classList.remove("active");});
        btn.classList.add("active");
        if(staticImg){
          var animEl=card.querySelector(".svc-anim");
          if(animEl){animEl.style.opacity="0";if(animEl.tagName==="VIDEO")animEl.pause();}
          staticImg.style.opacity="1";
          staticImg.src=btn.dataset.src;
        }
      });
    });
  });
}

/* ----- Pricing table (grouped by category) ----- */
function renderPricing(){
  const wrap = document.getElementById("pricingBody");
  if(!wrap) return;
  let html = "";
  Object.keys(CATS).forEach(cat=>{
    const items = PRICES.filter(p=>p.c===cat);
    if(!items.length) return;
    html += `<tr class="price-cat"><td colspan="2">${LANG==="bn"?CATS[cat].bn:CATS[cat].en}</td></tr>`;
    items.forEach(p=>{
      const price = p.min===p.max ? `৳ ${fmt(p.min)}` : `৳ ${fmt(p.min)} – ${fmt(p.max)}`;
      const pname = LANG==="bn" && p.nb ? p.nb : p.n;
      const noteTxt = LANG==="bn" && p.noteb ? p.noteb : p.note;
      const noteTag = noteTxt ? ` <span class="tag tag-soft">${noteTxt}</span>` : "";
      const perLabel = p.per ? `<span class="pprice-per">${t("per_tooth")}</span>` : "";
      const nameCell = p.slug
        ? `<a class="pname-link" href="services/${p.slug}.html"><span class="pname">${pname}</span>${noteTag}<span class="plink-arr">→</span></a>`
        : `<span class="pname">${pname}</span>${noteTag}`;
      html += `<tr${p.slug?' class="price-row-link"':''}>
        <td>${nameCell}</td>
        <td class="pprice">${price}${perLabel}</td></tr>`;
    });
  });
  wrap.innerHTML = html;
}

/* ----- Cost calculator ----- */
function renderCalcOptions(){            // categories + services + qty
  const cat = document.getElementById("calcCategory");
  const qty = document.getElementById("calcQty");
  if(cat){
    const cur = cat.value;
    cat.innerHTML = Object.keys(CATS).map(c=>`<option value="${c}">${LANG==="bn"?CATS[c].bn:CATS[c].en}</option>`).join("");
    if(cur) cat.value = cur;
  }
  if(qty && !qty.options.length){
    qty.innerHTML = Array.from({length:20},(_,i)=>`<option value="${i+1}">${i+1}</option>`).join("");
  }
  renderCalcServices();
}
function renderCalcServices(){
  const catSel = document.getElementById("calcCategory");
  const sel = document.getElementById("calcService");
  if(!sel) return;
  const cat = catSel ? catSel.value : null;
  const cur = sel.value;
  const opts = PRICES.map((p,i)=>({p,i})).filter(o=>!cat || o.p.c===cat);
  sel.innerHTML = opts.map(o=>`<option value="${o.i}">${o.p.n}</option>`).join("");
  if(cur && opts.some(o=>String(o.i)===cur)) sel.value = cur;
  updateCalc();
}
let _calcAnim;
function updateCalc(){
  const sel = document.getElementById("calcService");
  const qtyWrap = document.getElementById("calcQtyWrap");
  const qtyEl = document.getElementById("calcQty");
  const out = document.getElementById("calcResult");
  if(!sel||!out) return;
  const p = PRICES[+sel.value] || PRICES[0];
  const per = !!p.per;
  if(qtyWrap) qtyWrap.style.display = per ? "" : "none";
  const qty = per ? Math.max(1, parseInt((qtyEl&&qtyEl.value)||"1",10)) : 1;
  const min = p.min*qty, max = p.max*qty;
  cancelAnimationFrame(_calcAnim);
  const dur = 650, t0 = performance.now();
  const step = (now)=>{
    const k = Math.min(1,(now-t0)/dur), e = 1-Math.pow(1-k,3);
    const cMin = Math.round(min*e), cMax = Math.round(max*e);
    const amt = min===max ? `৳ ${fmt(cMax)}` : `৳ ${fmt(cMin)} – ${fmt(cMax)}`;
    out.innerHTML = `<span class="calc-amt">${amt}</span>${p.note?`<span class="calc-sub">${p.note}</span>`:""}`;
    if(k<1) _calcAnim = requestAnimationFrame(step);
  };
  out.classList.remove("pop"); void out.offsetWidth; out.classList.add("pop");
  _calcAnim = requestAnimationFrame(step);
  const btn = document.getElementById("calcBook");
  if(btn) btn.dataset.service = p.n;
}
function renderCalcBA(){
  const el = document.getElementById("calcBa");
  if(!el) return;
  const c = BA_CASES[0];
  el.innerHTML = `<div class="ba">
      <img class="ba-after" src="${c.aImg}" data-fbcolor="${c.after}" data-fblabel="ba_after" alt="after">
      <img class="ba-before" src="${c.bImg}" data-fbcolor="${c.before}" data-fblabel="ba_before" alt="before">
      <input class="ba-range" type="range" min="0" max="100" value="50" aria-label="before after slider">
      <span class="ba-tag ba-tag-l">${t('ba_before')}</span>
      <span class="ba-tag ba-tag-r">${t('ba_after')}</span>
      <span class="ba-handle"></span>
    </div>`;
  el.querySelectorAll(".ba").forEach(initBA);
}

/* ----- Testimonials ----- */
function renderTestimonials(){
  const wrap = document.getElementById("testGrid");
  if(!wrap) return;
  wrap.innerHTML = TESTIMONIALS.map(x=>`
    <a class="test-card" href="${GMAPS_REVIEW_URL}" target="_blank" rel="noopener noreferrer" aria-label="Read review on Google Maps">
      <div class="stars">★★★★★</div>
      <p>"${LANG==="bn"&&x.bn?x.bn:x.en}"</p>
      <div class="test-meta"><span class="avatar">${x.name.charAt(0)}</span>
        <div><strong>${x.name}</strong><small>${x.role}</small></div></div>
    </a>`).join("");
}

/* ----- Process steps ----- */
function renderSteps(){
  const wrap = document.getElementById("stepsGrid");
  if(!wrap) return;
  wrap.innerHTML = STEPS.map((s,i)=>`
    <article class="step-card">
      <span class="step-num">${i+1}</span>
      <div class="step-ic">${svgIcon(s.ic)}</div>
      <h3>${t(s.t)}</h3>
      <p>${t(s.d)}</p>
    </article>`).join("");
}

/* ----- Technology & safety ----- */
function renderTech(){
  const wrap = document.getElementById("techGrid");
  if(!wrap) return;
  wrap.innerHTML = TECH.map(x=>`
    <article class="tech-card">
      <div class="tech-ic">${svgIcon(x.ic)}</div>
      <div><h3>${LANG==="bn"?x.bn:x.en}</h3><p>${LANG==="bn"?x.db:x.de}</p></div>
    </article>`).join("");
}

/* ----- FAQ accordion ----- */
function renderFaqs(){
  const wrap = document.getElementById("faqList");
  if(!wrap) return;
  wrap.innerHTML = FAQS.map((f,i)=>`
    <div class="faq-item">
      <button class="faq-q" aria-expanded="false">${LANG==="bn"?f.qb:f.qe}<span class="faq-ic">+</span></button>
      <div class="faq-a"><p>${LANG==="bn"?f.ab:f.ae}</p></div>
    </div>`).join("");
  wrap.querySelectorAll(".faq-q").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const open = btn.getAttribute("aria-expanded")==="true";
      btn.setAttribute("aria-expanded", String(!open));
      btn.parentElement.classList.toggle("open", !open);
    });
  });
}

/* ----- Dental tips ----- */
function renderTips(){
  const wrap = document.getElementById("tipsGrid");
  if(!wrap) return;
  wrap.innerHTML = POSTS.map(p=>`
    <article class="tip-card">
      <a class="tip-img" href="blog/${p.slug}.html">${p.ic}</a>
      <div class="tip-body">
        <h3>${LANG==="bn"?p.tb:p.te}</h3>
        <p>${LANG==="bn"?p.eb:p.ee}</p>
        <a class="svc-link" href="blog/${p.slug}.html">${t("tips_read")} →</a>
      </div>
    </article>`).join("");
}

/* ----- Before/After ----- */
function baSvg(color, label){
  return `data:image/svg+xml;utf8,`+encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='420'>
      <rect width='600' height='420' fill='${color}'/>
      <rect x='150' y='120' width='300' height='150' rx='20' fill='#fff' opacity='0.85'/>
      <g fill='${color}'>
        ${[0,1,2,3,4,5].map(i=>`<rect x='${175+i*42}' y='150' width='34' height='90' rx='10'/>`).join("")}
      </g>
      <text x='300' y='370' font-family='sans-serif' font-size='26' fill='#fff' text-anchor='middle' opacity='0.9'>${label}</text>
    </svg>`);
}
function renderBA(filter="all"){
  const wrap = document.getElementById("baGrid");
  if(!wrap) return;
  const list = BA_CASES.filter(c=>filter==="all"||c.type===filter);
  wrap.innerHTML = list.map((c,i)=>`
    <div class="ba" data-i="${i}">
      <img class="ba-after" src="${c.aImg}" data-fbcolor="${c.after}" data-fblabel="ba_after" alt="after">
      <img class="ba-before" src="${c.bImg}" data-fbcolor="${c.before}" data-fblabel="ba_before" alt="before">
      <input class="ba-range" type="range" min="0" max="100" value="50" aria-label="before after slider">
      <span class="ba-tag ba-tag-l">${t('ba_before')}</span>
      <span class="ba-tag ba-tag-r">${t('ba_after')}</span>
      <span class="ba-handle"></span>
    </div>`).join("");
  wrap.querySelectorAll(".ba").forEach(initBA);
}
function initBA(el){
  // fall back to colour placeholder if a before/after photo is missing
  el.querySelectorAll("img[data-fbcolor]").forEach(img=>{
    img.onerror = function(){ this.onerror=null; this.src = baSvg(this.dataset.fbcolor, t(this.dataset.fblabel)); };
  });
  const range = el.querySelector(".ba-range");
  const before = el.querySelector(".ba-before");
  const handle = el.querySelector(".ba-handle");
  const set = v=>{ before.style.clipPath="inset(0 "+(100-v)+"% 0 0)"; handle.style.left=v+"%"; };
  range.addEventListener("input", e=>set(e.target.value));
  set(50);
  // one-time auto-sweep when first scrolled into view (signals it's draggable)
  if(!window.matchMedia || !matchMedia("(prefers-reduced-motion: reduce)").matches){
    const demo = ()=>{
      el.classList.add("ba-anim");
      const steps = [82,22,50]; let i=0;
      const next = ()=>{ if(i>=steps.length){ el.classList.remove("ba-anim"); return; }
        const v=steps[i++]; range.value=v; set(v); setTimeout(next, 760); };
      setTimeout(next, 400);
    };
    if("IntersectionObserver" in window){
      const io = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ io.disconnect(); demo(); } }); }, {threshold:.4});
      io.observe(el);
    } else demo();
  }
}

/* ----- Booking ----- */
function renderBookOptions(){
  const sel = document.getElementById("f_service");
  if(!sel) return;
  const cur = sel.value;
  sel.innerHTML = `<option value="">${t("f_select")}</option>` +
    PRICES.map(p=>`<option value="${p.n}">${p.n}</option>`).join("");
  if(cur) sel.value = cur;
}
function renderBookSlots(){
  // upcoming dates — "type or select" datalist
  const dl = document.getElementById("dateList");
  if(dl){
    const loc = LANG==="bn" ? "bn-BD" : "en-GB";
    let opts = "";
    for(let i=0;i<14;i++){
      const d = new Date(); d.setDate(d.getDate()+i);
      const label = d.toLocaleDateString(loc,{weekday:"short",day:"numeric",month:"short",year:"numeric"});
      const prefix = i===0 ? t("f_today")+" — " : i===1 ? t("f_tomorrow")+" — " : "";
      opts += `<option value="${prefix}${label}"></option>`;
    }
    dl.innerHTML = opts;
  }
  // clinic time slots (10:00 AM – 9:30 PM, 30-min)
  const tl = document.getElementById("timeList");
  if(tl){
    let opts = "";
    for(let m=600;m<=1290;m+=30){              // minutes from midnight
      let h=Math.floor(m/60), mi=m%60, ap=h<12?"AM":"PM", h12=h%12||12;
      opts += `<option value="${h12}:${String(mi).padStart(2,"0")} ${ap}"></option>`;
    }
    tl.innerHTML = opts;
  }
}
function submitBooking(e){
  e.preventDefault();
  const f = e.target;
  const data = {
    name: f.f_name.value.trim(),
    phone: f.f_phone.value.trim(),
    service: f.f_service.value,
    date: f.f_date.value ? fmtPickedDate(f.f_date.value) : "",
    time: f.f_time.value ? fmtPickedTime(f.f_time.value) : "",
    msg: f.f_msg.value.trim(),
    emerg: f.f_emerg.checked,
  };
  let lines = [
    "🦷 *Omega Dental — Appointment Request*",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.service ? `Treatment: ${data.service}` : "",
    data.date ? `Preferred date: ${data.date}` : "",
    data.time ? `Preferred time: ${data.time}` : "",
    data.emerg ? "⚠️ EMERGENCY / same-day requested" : "",
    data.msg ? `Coming from: ${data.msg}` : "",
  ].filter(Boolean);
  const url = `https://wa.me/${OMEGA.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  const note = document.getElementById("bookSuccess");
  if(note){ note.textContent = t("f_success"); note.style.display="block"; }
  window.open(url, "_blank");
}

/* ----- Marquee ----- */
function renderMarquee(){
  const el = document.getElementById("marqueeTrack");
  if(!el) return;
  const items = SERVICES.map(s=>`<span>${LANG==="bn"?s.bn:s.en}</span>`).join("");
  el.innerHTML = items + items; // duplicate for seamless loop
}

/* ----- Counters ----- */
function animateCounters(){
  document.querySelectorAll(".stat-num").forEach(el=>{
    const target = +el.dataset.target; const suffix = el.dataset.suffix||"";
    let n = 0; const step = Math.max(1, Math.ceil(target/60));
    const tick = ()=>{ n=Math.min(target,n+step); el.textContent = fmt(n)+suffix;
      if(n<target) requestAnimationFrame(tick); };
    tick();
  });
}

/* ----- Calendar + clock pickers on the booking date/time fields ----- */
function fmtPickedDate(v){            // v = "2026-06-28"
  try{ const d = new Date(v+"T00:00:00");
    return d.toLocaleDateString(LANG==="bn"?"bn-BD":"en-GB",{weekday:"short",day:"numeric",month:"short",year:"numeric"});
  }catch(e){ return v; }
}
function fmtPickedTime(v){            // v = "14:30" → "2:30 PM"
  const p=v.split(":"); let h=+p[0]; const m=p[1]||"00";
  const ap=h<12?"AM":"PM"; h=h%12; if(h===0)h=12;
  return `${h}:${m} ${ap}`;
}
/* Lazy-load the heavy hero background video so it never blocks first paint.
   Skipped on reduced-motion and on slow / data-saver connections. */
function initHeroVideo(){
  const v = document.querySelector(".hero-video"); if(!v) return;
  const src = v.querySelector("source[data-src]"); if(!src) return;
  try{ if(matchMedia("(prefers-reduced-motion: reduce)").matches) return; }catch(e){}
  try{ const c=navigator.connection; if(c && (c.saveData || /(^|-)(2g|slow-2g)$/.test(c.effectiveType||""))) return; }catch(e){}
  const load = ()=>{ src.src = src.getAttribute("data-src"); v.load(); const p=v.play(); if(p&&p.catch) p.catch(()=>{}); };
  if("requestIdleCallback" in window) requestIdleCallback(load, {timeout:3000});
  else setTimeout(load, 1500);
}
function initBookPickers(){
  // native date/time inputs — block past dates on the calendar
  const d=document.getElementById("f_date");
  if(d && d.type==="date"){
    try{ const t=new Date();
      d.min = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;
    }catch(e){}
  }
}

/* ----- Wire up ----- */
document.addEventListener("DOMContentLoaded", ()=>{
  applyI18n();
  initBookPickers();
  initHeroVideo();
  // prefill booking-page treatment from ?service=
  try{ const q=new URLSearchParams(location.search).get("service"); const sel=document.getElementById("f_service");
    if(q&&sel&&[...sel.options].some(o=>o.value===q)) sel.value=q; }catch(e){}
  renderBA("all");

  document.getElementById("langToggle")?.addEventListener("click", ()=> setLang(LANG==="en"?"bn":"en"));
  // service catalog "Book Now" → prefill booking
  document.getElementById("servicesGrid")?.addEventListener("click", (e)=>{
    const a = e.target.closest(".svc-book");
    if(!a) return;
    const sel = document.getElementById("f_service");
    if(sel && a.dataset.service) sel.value = a.dataset.service;
  });

  document.getElementById("calcCategory")?.addEventListener("change", renderCalcServices);
  document.getElementById("calcService")?.addEventListener("change", updateCalc);
  document.getElementById("calcQty")?.addEventListener("change", updateCalc);
  document.getElementById("calcBook")?.addEventListener("click", function(){
    const svc = this.dataset.service ? "?service="+encodeURIComponent(this.dataset.service) : "";
    window.location.href = "book.html"+svc;
  });
  document.getElementById("bookForm")?.addEventListener("submit", submitBooking);
  document.getElementById("callbackForm")?.addEventListener("submit", (e)=>{
    e.preventDefault();
    const num = document.getElementById("cbNumber").value.trim();
    const msg = `📞 Omega Dental — Callback request\nPlease call me back at: ${num}`;
    const note = document.getElementById("cbSuccess");
    if(note){ note.textContent = t("cb_success"); note.style.display = "block"; }
    window.open(`https://wa.me/${OMEGA.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  });

  document.querySelectorAll(".ba-filter").forEach(b=>{
    b.addEventListener("click", ()=>{
      document.querySelectorAll(".ba-filter").forEach(x=>x.classList.remove("active"));
      b.classList.add("active"); renderBA(b.dataset.filter);
    });
  });

  // mobile nav
  const burger = document.getElementById("burger");
  const navlist = document.getElementById("navlist");
  burger?.addEventListener("click", ()=> navlist.classList.toggle("open"));
  navlist?.querySelectorAll("a:not(.dd-toggle)").forEach(a=>a.addEventListener("click", ()=>navlist.classList.remove("open")));
  navlist?.querySelectorAll(".dd-menu a").forEach(a=>a.addEventListener("click", ()=>navlist.classList.remove("open")));
  // services dropdown toggle (click on mobile, hover on desktop)
  const hasDD = document.querySelector(".has-dd");
  const ddToggle = document.querySelector(".dd-toggle");
  ddToggle?.addEventListener("click", e => {
    if(window.innerWidth <= 760){ e.preventDefault(); hasDD.classList.toggle("open"); }
  });
  document.addEventListener("click", e => { if(hasDD && !hasDD.contains(e.target)) hasDD.classList.remove("open"); });

  // counters when visible
  const stats = document.getElementById("stats");
  if(stats){
    const ob = new IntersectionObserver((ent)=>{ if(ent[0].isIntersecting){ animateCounters(); ob.disconnect(); }},{threshold:.4});
    ob.observe(stats);
  }

  // scroll progress bar + back-to-top
  const bar = document.getElementById("scrollbar");
  const toTop = document.getElementById("toTop");
  const onScroll = ()=>{
    const h = document.documentElement;
    const sc = h.scrollTop || document.body.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    if(bar) bar.style.width = (max>0 ? (sc/max*100) : 0) + "%";
    if(toTop) toTop.classList.toggle("show", sc > 600);
  };
  window.addEventListener("scroll", onScroll, {passive:true}); onScroll();
  toTop?.addEventListener("click", ()=> window.scrollTo({top:0, behavior:"smooth"}));

  // scroll reveal — above-fold elements animate immediately; below-fold on scroll
  const revealEls = document.querySelectorAll(".sec-head, .svc-card, .step-card, .tech-card, .test-card, .tip-card, .ci-row, .why-art, .doc-photo, .hero-photo, .calc-card, .calc-ba");
  revealEls.forEach(el=>el.classList.add("reveal"));
  const rob = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); rob.unobserve(e.target); }});
  },{threshold:.12});
  let stagger = 0;
  revealEls.forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight){
      setTimeout(()=>el.classList.add("in"), stagger);
      stagger += 80;
    } else {
      rob.observe(el);
    }
  });

  // WhatsApp Live Chat Widget
  (function initWaChat(){
    const bubble = document.getElementById("waBubble");
    const popup  = document.getElementById("waPopup");
    const closeBtn = document.getElementById("waClose");
    const start  = document.getElementById("waStart");
    if(!bubble||!popup) return;
    function openPopup(){ popup.classList.add("open"); popup.setAttribute("aria-hidden","false"); bubble.classList.add("active"); }
    function closePopup(){ popup.classList.remove("open"); popup.setAttribute("aria-hidden","true"); bubble.classList.remove("active"); }
    bubble.addEventListener("click", ()=> popup.classList.contains("open") ? closePopup() : openPopup());
    closeBtn?.addEventListener("click", closePopup);
    popup.querySelectorAll(".wcp-chip").forEach(chip=>{
      chip.addEventListener("click", ()=>{
        const key = chip.dataset.msg;
        const msgs = LANG==="bn" ? WA_MSGS_BN : WA_MSGS;
        if(start) start.href = "https://wa.me/8801713241670?text=" + encodeURIComponent(msgs[key]||"");
        start?.click();
      });
    });
  })();

  // ── Site-wide search ─────────────────────────────────────────────────────
  (function initSearch(){
    var srchOverlay = document.getElementById("srch-overlay");
    var srchInput   = document.getElementById("srch-input");
    var srchResults = document.getElementById("srch-results");
    var srchBtn     = document.getElementById("srch-btn");
    var srchClose   = document.getElementById("srch-close");
    if(!srchOverlay) return;

    var ROOT = (document.querySelector('meta[name="page-root"]')||{}).content || "";
    var searchIdx = null;
    var debTimer  = null;
    var activeIdx = -1;

    function buildIndex(){
      var idx = [];
      SERVICES.forEach(function(s){
        idx.push({type:"service",icon:s.icon,label:LANG==="bn"?s.bn:s.en,sub:LANG==="bn"?(s.cn||s.cne||""):(s.cne||s.cn||""),price:s.pr,url:ROOT+"services/"+s.slug+".html",kw:[s.en,s.bn,s.cne||"",s.cn||"",s.de,s.db].join(" ")});
      });
      PRICES.forEach(function(p){
        var pr = "৳"+p.min+(p.max&&p.max!==p.min?"–"+p.max:"");
        idx.push({type:"price",label:LANG==="bn"?p.nb:p.n,price:pr,url:ROOT+"index.html#pricing",kw:[p.n,p.nb,p.note||"",p.noteb||""].join(" ")});
      });
      FAQS.forEach(function(f){
        idx.push({type:"faq",label:LANG==="bn"?f.qb:f.qe,sub:(LANG==="bn"?f.ab:f.ae).substring(0,90)+"…",url:ROOT+"index.html#faq",kw:[f.qe,f.ae,f.qb,f.ab].join(" ")});
      });
      POSTS.forEach(function(p){
        idx.push({type:"blog",label:LANG==="bn"?p.tb:p.te,sub:LANG==="bn"?p.eb:p.ee,url:ROOT+"blog/"+p.slug+".html",kw:[p.te,p.ee,p.tb,p.eb].join(" ")});
      });
      TECH.forEach(function(tc){
        idx.push({type:"tech",label:LANG==="bn"?tc.bn:tc.en,sub:LANG==="bn"?tc.db:tc.de,url:ROOT+"index.html#tech",kw:[tc.en,tc.bn,tc.de,tc.db].join(" ")});
      });
      return idx;
    }

    function runSearch(q){
      if(!q.trim()) return [];
      var ql = q.toLowerCase();
      return searchIdx.filter(function(r){
        return r.label.toLowerCase().includes(ql) || r.kw.toLowerCase().includes(ql);
      }).sort(function(a,b){
        return (a.label.toLowerCase().includes(ql)?0:1)-(b.label.toLowerCase().includes(ql)?0:1);
      }).slice(0,18);
    }

    var TYPE_ICONS = {service:"🦷",price:"💰",faq:"❓",blog:"📄",tech:"⚙️"};
    var TYPE_KEY   = {service:"srch_services",price:"srch_pricing",faq:"srch_faq",blog:"srch_blog",tech:"srch_tech"};

    function renderResults(results){
      activeIdx = -1;
      if(!results.length){
        srchResults.innerHTML = '<div class="srch-empty">'+t("srch_empty")+'</div>';
        return;
      }
      var grouped = {};
      results.forEach(function(r){ (grouped[r.type]=grouped[r.type]||[]).push(r); });
      var html = "";
      Object.keys(grouped).forEach(function(type){
        html += '<div class="srch-group-label">'+t(TYPE_KEY[type]||type)+'</div>';
        grouped[type].forEach(function(r,i){
          var dataIdx = results.indexOf(r);
          html += '<a class="srch-item" href="'+r.url+'" data-idx="'+dataIdx+'">'
               +'<span class="srch-item-icon">'+(r.icon||TYPE_ICONS[r.type]||"•")+'</span>'
               +'<span class="srch-item-body">'
               +'<span class="srch-item-label">'+r.label+'</span>'
               +(r.sub?'<span class="srch-item-sub">'+r.sub+'</span>':'')
               +'</span>'
               +(r.price?'<span class="srch-item-price">'+r.price+'</span>':'')
               +'</a>';
        });
      });
      srchResults.innerHTML = html;
    }

    function openSearch(){
      if(!searchIdx) searchIdx = buildIndex();
      srchOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
      srchInput.value = "";
      srchResults.innerHTML = "";
      srchInput.focus();
      srchInput.placeholder = t("srch_ph");
      document.getElementById("srch-hint-txt") && (document.getElementById("srch-hint-txt").textContent = t("srch_hint"));
    }
    function closeSearch(){
      srchOverlay.classList.remove("open");
      document.body.style.overflow = "";
    }

    srchBtn && srchBtn.addEventListener("click", openSearch);
    srchClose && srchClose.addEventListener("click", closeSearch);
    srchOverlay.addEventListener("click", function(e){ if(e.target===srchOverlay) closeSearch(); });

    srchInput && srchInput.addEventListener("input", function(){
      clearTimeout(debTimer);
      debTimer = setTimeout(function(){
        if(!searchIdx) searchIdx = buildIndex();
        renderResults(runSearch(srchInput.value));
      }, 180);
    });

    // keyboard navigation
    document.addEventListener("keydown", function(e){
      if((e.ctrlKey||e.metaKey) && e.key==="k"){ e.preventDefault(); openSearch(); return; }
      if(!srchOverlay.classList.contains("open")) return;
      var items = srchResults.querySelectorAll(".srch-item");
      if(e.key==="Escape"){ closeSearch(); return; }
      if(e.key==="ArrowDown"){ e.preventDefault(); activeIdx=Math.min(activeIdx+1,items.length-1); }
      else if(e.key==="ArrowUp"){ e.preventDefault(); activeIdx=Math.max(activeIdx-1,-1); }
      else if(e.key==="Enter" && activeIdx>=0){ e.preventDefault(); items[activeIdx]?.click(); return; }
      else return;
      items.forEach(function(it,i){ it.classList.toggle("srch-active",i===activeIdx); });
      items[activeIdx]?.scrollIntoView({block:"nearest"});
    });
  })();

  // Google Review QR Code
  setTimeout(()=>{
    const qrEl = document.getElementById("reviewQRCode");
    if(qrEl && window.QRCode){
      new QRCode(qrEl, {
        text:"https://www.google.com/maps/place/OMEGA+Dental/@23.8018173,90.370624,16z",
        width:128, height:128,
        colorDark:"#13294e", colorLight:"#ffffff"
      });
    }
  }, 600);
});
