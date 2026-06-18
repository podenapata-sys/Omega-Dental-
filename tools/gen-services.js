/* Generates static per-service SEO pages into /services and a sitemap.xml.
   Run: node tools/gen-services.js   */
const fs = require("fs");
const path = require("path");

const SITE = "https://podenapata-sys.github.io/Omega-Dental-";
const VER = "20260618c";

const SERVICES = [
  { slug:"root-canal", icon:"🌱",
    en:{ name:"Root Canal Treatment (RCT)", tag:"Save your natural tooth, pain-free",
      meta:"Painless root canal treatment (RCT) in Dhaka at Omega Dental. Single & multi-visit RCT from ৳5,000. Book with Dr. Afsana Haque.",
      overview:"A root canal removes infected pulp from inside a damaged tooth, relieves pain and lets you keep your natural tooth instead of extracting it. At Omega Dental we perform gentle, modern root canal therapy — including single-visit RCT — so most patients feel little to no discomfort.",
      benefits:["Saves your natural tooth","Stops toothache and infection","Painless, modern technique","Single-visit option available"],
      process:["Digital X-ray & diagnosis","Gentle numbing of the area","Cleaning & sealing the canal","Filling or crown to protect the tooth"],
      price:"From ৳5,000 / tooth (Single-visit RCT ৳12,000)" },
    bn:{ name:"রুট ক্যানেল চিকিৎসা (RCT)", tag:"ব্যথাহীনভাবে আপনার আসল দাঁত বাঁচান",
      meta:"ঢাকায় ওমেগা ডেন্টালে ব্যথাহীন রুট ক্যানেল চিকিৎসা। সিঙ্গেল ও মাল্টি-ভিজিট RCT ৫,০০০ টাকা থেকে।",
      overview:"রুট ক্যানেল ক্ষতিগ্রস্ত দাঁতের ভেতরের সংক্রমিত পাল্প সরিয়ে ব্যথা কমায় এবং দাঁত তুলে ফেলার বদলে আপনার আসল দাঁত রক্ষা করে। ওমেগা ডেন্টালে আমরা কোমল, আধুনিক রুট ক্যানেল করি — সিঙ্গেল-ভিজিট সহ — তাই বেশিরভাগ রোগী প্রায় কোনো ব্যথা অনুভব করেন না।",
      benefits:["আসল দাঁত রক্ষা করে","দাঁতব্যথা ও সংক্রমণ বন্ধ করে","ব্যথাহীন, আধুনিক পদ্ধতি","সিঙ্গেল-ভিজিট সুবিধা"],
      process:["ডিজিটাল এক্স-রে ও রোগ নির্ণয়","কোমলভাবে অবশ করা","ক্যানেল পরিষ্কার ও সিল করা","দাঁত রক্ষায় ফিলিং বা ক্রাউন"],
      price:"৫,০০০ টাকা/দাঁত থেকে (সিঙ্গেল-ভিজিট RCT ১২,০০০ টাকা)" } },

  { slug:"dental-implants", icon:"🔩",
    en:{ name:"Dental Implants", tag:"Permanent, natural-looking new teeth",
      meta:"Dental implants in Dhaka at Omega Dental — permanent replacement for missing teeth from ৳1,20,000. Book a consultation with Dr. Afsana Haque.",
      overview:"A dental implant is a titanium root placed in the jaw to support a natural-looking replacement tooth. Implants are the gold-standard solution for missing teeth — they look, feel and function like real teeth and can last for decades.",
      benefits:["Permanent, fixed solution","Looks & feels natural","Protects your jawbone","No damage to nearby teeth"],
      process:["Consultation & 3D assessment","Implant placement","Healing & integration","Final crown fitted on top"],
      price:"৳1,20,000 – ৳1,50,000 per implant" },
    bn:{ name:"ডেন্টাল ইমপ্লান্ট", tag:"স্থায়ী, প্রাকৃতিক দেখতে নতুন দাঁত",
      meta:"ঢাকায় ওমেগা ডেন্টালে ডেন্টাল ইমপ্লান্ট — হারানো দাঁতের স্থায়ী প্রতিস্থাপন ১,২০,০০০ টাকা থেকে।",
      overview:"ডেন্টাল ইমপ্লান্ট হলো চোয়ালে স্থাপিত টাইটানিয়াম রুট যা প্রাকৃতিক দেখতে নকল দাঁত ধরে রাখে। হারানো দাঁতের জন্য ইমপ্লান্ট সেরা সমাধান — দেখতে, অনুভবে ও কাজে আসল দাঁতের মতো এবং কয়েক দশক টেকে।",
      benefits:["স্থায়ী, ফিক্সড সমাধান","দেখতে ও অনুভবে প্রাকৃতিক","চোয়ালের হাড় রক্ষা করে","পাশের দাঁতের ক্ষতি করে না"],
      process:["পরামর্শ ও থ্রিডি মূল্যায়ন","ইমপ্লান্ট স্থাপন","নিরাময় ও সংযুক্তি","উপরে চূড়ান্ত ক্রাউন বসানো"],
      price:"প্রতি ইমপ্লান্ট ১,২০,০০০ – ১,৫০,০০০ টাকা" } },

  { slug:"braces-aligners", icon:"📏",
    en:{ name:"Braces & Clear Aligners", tag:"Straighten your smile with confidence",
      meta:"Orthodontic braces & invisible clear aligners in Dhaka at Omega Dental. Braces from ৳25,000. Book with Dr. Afsana Haque.",
      overview:"Braces and clear aligners gradually move misaligned teeth into a straight, healthy position. We offer traditional orthodontic braces as well as near-invisible clear aligners for adults and teens who want a discreet option.",
      benefits:["Corrects crooked & gapped teeth","Improves bite and cleaning","Clear (invisible) option available","Boosts your confidence"],
      process:["Orthodontic assessment","Custom treatment plan","Fit braces or aligners","Regular adjustments to final result"],
      price:"Braces from ৳25,000 (+৳6,000/mo) · Aligners ৳1,50,000–2,50,000" },
    bn:{ name:"ব্রেসেস ও ক্লিয়ার অ্যালাইনার", tag:"আত্মবিশ্বাসে দাঁত সোজা করুন",
      meta:"ঢাকায় ওমেগা ডেন্টালে অর্থোডন্টিক ব্রেসেস ও ইনভিজিবল ক্লিয়ার অ্যালাইনার। ব্রেসেস ২৫,০০০ টাকা থেকে।",
      overview:"ব্রেসেস ও ক্লিয়ার অ্যালাইনার ধীরে ধীরে আঁকাবাঁকা দাঁত সোজা ও সুস্থ অবস্থানে নিয়ে আসে। আমরা সাধারণ অর্থোডন্টিক ব্রেসেসের পাশাপাশি প্রায় অদৃশ্য ক্লিয়ার অ্যালাইনারও দিই।",
      benefits:["আঁকাবাঁকা ও ফাঁকা দাঁত ঠিক করে","কামড় ও পরিচ্ছন্নতা উন্নত করে","ক্লিয়ার (অদৃশ্য) সুবিধা","আত্মবিশ্বাস বাড়ায়"],
      process:["অর্থোডন্টিক মূল্যায়ন","কাস্টম চিকিৎসা পরিকল্পনা","ব্রেসেস বা অ্যালাইনার লাগানো","নিয়মিত সমন্বয়ে চূড়ান্ত ফল"],
      price:"ব্রেসেস ২৫,০০০ টাকা থেকে (+৬,০০০/মাস) · অ্যালাইনার ১,৫০,০০০–২,৫০,০০০" } },

  { slug:"teeth-whitening", icon:"✨",
    en:{ name:"Teeth Whitening", tag:"A brighter smile in one visit",
      meta:"Professional teeth whitening in Dhaka at Omega Dental for ৳12,000. Safe, fast and effective. Book with Dr. Afsana Haque.",
      overview:"Professional teeth whitening safely lightens stains from tea, coffee, smoking and age, brightening your smile several shades in a single visit — far more effective and safer than over-the-counter kits.",
      benefits:["Visibly brighter in one session","Safe, dentist-supervised","Removes deep stains","Quick & comfortable"],
      process:["Cleaning & shade check","Gum protection applied","Whitening gel + light","Instant brighter result"],
      price:"৳12,000" },
    bn:{ name:"দাঁত সাদা করা", tag:"এক ভিজিটেই উজ্জ্বল হাসি",
      meta:"ঢাকায় ওমেগা ডেন্টালে পেশাদার দাঁত সাদা করা ১২,০০০ টাকায়। নিরাপদ, দ্রুত ও কার্যকর।",
      overview:"পেশাদার হোয়াইটেনিং চা, কফি, ধূমপান ও বয়সজনিত দাগ নিরাপদে দূর করে এক ভিজিটেই আপনার হাসি কয়েক শেড উজ্জ্বল করে — দোকানে কেনা কিটের চেয়ে অনেক বেশি কার্যকর ও নিরাপদ।",
      benefits:["এক সেশনেই দৃশ্যমান উজ্জ্বল","নিরাপদ, ডেন্টিস্ট-তত্ত্বাবধানে","গভীর দাগ দূর করে","দ্রুত ও আরামদায়ক"],
      process:["পরিষ্কার ও শেড পরীক্ষা","মাড়ি সুরক্ষা","হোয়াইটেনিং জেল + লাইট","তাৎক্ষণিক উজ্জ্বল ফল"],
      price:"১২,০০০ টাকা" } },

  { slug:"crowns-bridges", icon:"👑",
    en:{ name:"Crowns & Bridges", tag:"Rebuild strength and beauty",
      meta:"Dental crowns & bridges in Dhaka at Omega Dental — Zirconia, PFM & composite crowns from ৳5,000. Book with Dr. Afsana Haque.",
      overview:"Crowns cap a damaged or root-treated tooth to restore its strength and shape, while bridges replace one or more missing teeth. We offer durable Zirconia, PFM and composite options to match your natural teeth.",
      benefits:["Restores broken/weak teeth","Natural tooth-coloured finish","Replaces missing teeth (bridge)","Long-lasting & strong"],
      process:["Tooth preparation","Precise digital impression","Custom crown/bridge made","Fitting & final polish"],
      price:"PFM from ৳5,000 · Zirconia ৳12,000–15,000" },
    bn:{ name:"ক্রাউন ও ব্রিজ", tag:"শক্তি ও সৌন্দর্য ফিরিয়ে আনুন",
      meta:"ঢাকায় ওমেগা ডেন্টালে ডেন্টাল ক্রাউন ও ব্রিজ — জিরকোনিয়া, পিএফএম ও কম্পোজিট ৫,০০০ টাকা থেকে।",
      overview:"ক্রাউন ক্ষতিগ্রস্ত বা রুট-ক্যানেল করা দাঁত ঢেকে শক্তি ও আকৃতি ফেরায়, আর ব্রিজ এক বা একাধিক হারানো দাঁত প্রতিস্থাপন করে। আমরা টেকসই জিরকোনিয়া, পিএফএম ও কম্পোজিট অপশন দিই।",
      benefits:["ভাঙা/দুর্বল দাঁত ঠিক করে","প্রাকৃতিক দাঁতের রঙ","হারানো দাঁত প্রতিস্থাপন (ব্রিজ)","দীর্ঘস্থায়ী ও মজবুত"],
      process:["দাঁত প্রস্তুত করা","নিখুঁত ডিজিটাল ছাপ","কাস্টম ক্রাউন/ব্রিজ তৈরি","ফিটিং ও চূড়ান্ত পলিশ"],
      price:"পিএফএম ৫,০০০ টাকা থেকে · জিরকোনিয়া ১২,০০০–১৫,০০০" } },

  { slug:"dentures", icon:"🦿",
    en:{ name:"Dentures", tag:"Comfortable, natural-looking replacements",
      meta:"Partial, flexible & complete dentures in Dhaka at Omega Dental from ৳4,000. Book with Dr. Afsana Haque.",
      overview:"Dentures replace missing teeth so you can chew, speak and smile with confidence again. We craft partial, flexible and complete dentures with a comfortable, natural-looking fit.",
      benefits:["Restores chewing & speech","Natural appearance","Partial, flexible & complete","Affordable tooth replacement"],
      process:["Oral assessment","Impressions & measurements","Custom denture crafted","Fitting & comfort adjustment"],
      price:"Partial from ৳4,000 · Flexible ৳8,000 · Complete ৳22,000" },
    bn:{ name:"ডেনচার", tag:"আরামদায়ক, প্রাকৃতিক দেখতে প্রতিস্থাপন",
      meta:"ঢাকায় ওমেগা ডেন্টালে পার্শিয়াল, ফ্লেক্সিবল ও কমপ্লিট ডেনচার ৪,০০০ টাকা থেকে।",
      overview:"ডেনচার হারানো দাঁত প্রতিস্থাপন করে যাতে আপনি আবার আত্মবিশ্বাসে চিবাতে, কথা বলতে ও হাসতে পারেন। আমরা আরামদায়ক, প্রাকৃতিক ফিটের পার্শিয়াল, ফ্লেক্সিবল ও কমপ্লিট ডেনচার তৈরি করি।",
      benefits:["চিবানো ও কথা ফেরায়","প্রাকৃতিক চেহারা","পার্শিয়াল, ফ্লেক্সিবল ও কমপ্লিট","সাশ্রয়ী দাঁত প্রতিস্থাপন"],
      process:["মুখ পরীক্ষা","ছাপ ও পরিমাপ","কাস্টম ডেনচার তৈরি","ফিটিং ও আরাম সমন্বয়"],
      price:"পার্শিয়াল ৪,০০০ থেকে · ফ্লেক্সিবল ৮,০০০ · কমপ্লিট ২২,০০০" } },

  { slug:"scaling-polishing", icon:"🦷",
    en:{ name:"Scaling & Polishing", tag:"Healthy gums, fresh clean smile",
      meta:"Professional teeth scaling & polishing in Dhaka at Omega Dental from ৳1,000. Book a cleaning with Dr. Afsana Haque.",
      overview:"Scaling removes plaque and hardened tartar that brushing can't, while polishing smooths and brightens your teeth. Regular cleaning prevents gum disease, bad breath and tooth loss.",
      benefits:["Prevents gum disease","Removes plaque & tartar","Freshens breath","Brighter, smoother teeth"],
      process:["Gum & teeth check","Ultrasonic scaling","Polishing","Care & prevention tips"],
      price:"Scaling ৳1,500 · Polishing ৳1,000" },
    bn:{ name:"স্কেলিং ও পলিশিং", tag:"সুস্থ মাড়ি, পরিষ্কার সতেজ হাসি",
      meta:"ঢাকায় ওমেগা ডেন্টালে পেশাদার স্কেলিং ও পলিশিং ১,০০০ টাকা থেকে।",
      overview:"স্কেলিং প্লাক ও শক্ত টার্টার দূর করে যা ব্রাশে যায় না, আর পলিশিং দাঁত মসৃণ ও উজ্জ্বল করে। নিয়মিত পরিষ্কার মাড়ির রোগ, দুর্গন্ধ ও দাঁত পড়া রোধ করে।",
      benefits:["মাড়ির রোগ রোধ করে","প্লাক ও টার্টার দূর করে","নিঃশ্বাস সতেজ করে","উজ্জ্বল, মসৃণ দাঁত"],
      process:["মাড়ি ও দাঁত পরীক্ষা","আল্ট্রাসনিক স্কেলিং","পলিশিং","যত্ন ও প্রতিরোধের পরামর্শ"],
      price:"স্কেলিং ১,৫০০ · পলিশিং ১,০০০ টাকা" } },

  { slug:"tooth-fillings", icon:"🪥",
    en:{ name:"Tooth Fillings", tag:"Restore decayed teeth, painlessly",
      meta:"Tooth-coloured composite & GI fillings in Dhaka at Omega Dental from ৳1,000. Book with Dr. Afsana Haque.",
      overview:"A filling repairs a tooth damaged by decay, stopping pain and preventing further damage. We use tooth-coloured composite and GI fillings that blend in naturally and are placed gently and painlessly.",
      benefits:["Stops decay & sensitivity","Natural tooth colour","Painless treatment","Strengthens the tooth"],
      process:["Examine the cavity","Gentle cleaning","Tooth-coloured filling","Shaping & polish"],
      price:"Composite from ৳1,000 · GI ৳1,500–2,000" },
    bn:{ name:"দাঁতের ফিলিং", tag:"ব্যথাহীনভাবে ক্ষয়প্রাপ্ত দাঁত ঠিক করুন",
      meta:"ঢাকায় ওমেগা ডেন্টালে দাঁতের রঙের কম্পোজিট ও জিআই ফিলিং ১,০০০ টাকা থেকে।",
      overview:"ফিলিং ক্ষয়ে ক্ষতিগ্রস্ত দাঁত মেরামত করে, ব্যথা বন্ধ করে ও আরও ক্ষতি রোধ করে। আমরা দাঁতের রঙের কম্পোজিট ও জিআই ফিলিং ব্যবহার করি যা প্রাকৃতিকভাবে মিশে যায় এবং ব্যথাহীনভাবে বসানো হয়।",
      benefits:["ক্ষয় ও সংবেদনশীলতা বন্ধ করে","প্রাকৃতিক দাঁতের রঙ","ব্যথাহীন চিকিৎসা","দাঁত মজবুত করে"],
      process:["ক্যাভিটি পরীক্ষা","কোমল পরিষ্কার","দাঁতের রঙের ফিলিং","আকৃতি ও পলিশ"],
      price:"কম্পোজিট ১,০০০ থেকে · জিআই ১,৫০০–২,০০০ টাকা" } },
];

const esc = s => String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const bl = (en,bn) => `data-en="${esc(en)}" data-bn="${esc(bn)}"`; // bilingual text element

function page(s){
  const url = `${SITE}/services/${s.slug}.html`;
  const li = (arr,key)=>arr.map((_,i)=>`<li><span class="ck">✓</span><span ${bl(s.en[key][i],s.bn[key][i])}></span></li>`).join("");
  const steps = s.en.process.map((_,i)=>`<article class="step-card"><span class="step-num">${i+1}</span><h3 ${bl(s.en.process[i],s.bn.process[i])}></h3></article>`).join("");
  return `<!DOCTYPE html>
<html lang="en" data-lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(s.en.name)} in Dhaka | Omega Dental</title>
<meta name="description" content="${esc(s.en.meta)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(s.en.name)} | Omega Dental">
<meta property="og:description" content="${esc(s.en.meta)}">
<meta property="og:image" content="${SITE}/assets/logo.png">
<meta name="theme-color" content="#57C3AD">
<link rel="icon" type="image/png" href="../assets/mark.png?v=2">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/styles.css?v=${VER}">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"MedicalProcedure","name":"${esc(s.en.name)}","procedureType":"Dentistry",
"description":"${esc(s.en.meta)}","url":"${url}",
"provider":{"@type":"Dentist","name":"Omega Dental","telephone":"+8801706516868","address":{"@type":"PostalAddress","streetAddress":"1252/3, East Monipur, West Kazipara, Begum Rokeya Sarani","addressLocality":"Dhaka","addressCountry":"BD"}}}
</script>
</head>
<body>
<div class="topbar"><span>Painless &amp; Cosmetic Dental Care · Sat–Thu 10am–8pm</span> · <a href="tel:+8801706516868">01706-516868</a></div>
<header class="header"><nav class="nav container">
  <a class="brand" href="../index.html">
    <span class="logo-anim"><img src="../assets/mark.png?v=2" alt="Omega Dental"></span>
    <span>OMEGA<small>DENTAL</small></span>
  </a>
  <div class="navlist" id="navlist">
    <a href="../index.html#why" ${bl("About Us","আমাদের সম্পর্কে")}></a>
    <a href="../index.html#services" ${bl("Our Services","আমাদের সেবা")}></a>
    <a href="../index.html#contact" ${bl("Branch","শাখা")}></a>
    <a href="../index.html#about" ${bl("Doctors","ডাক্তার")}></a>
    <a href="../index.html#pricing" ${bl("Price List","মূল্য তালিকা")}></a>
    <a href="../index.html#tips" ${bl("Blog","ব্লগ")}></a>
    <div class="nav-actions">
      <a class="btn btn-primary" href="../index.html#book" ${bl("Book Appointment","অ্যাপয়েন্টমেন্ট নিন")}></a>
      <button class="lang-toggle" id="langToggle"><span id="langText">বাংলা</span></button>
    </div>
  </div>
  <button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>

<section class="hero"><span class="blob b1"></span><span class="blob b2"></span>
  <div class="container" style="position:relative;z-index:1;padding:64px 0 56px;text-align:center;max-width:820px">
    <span class="eyebrow">${s.icon} <span ${bl("Our Services","আমাদের সেবা")}></span></span>
    <h1 ${bl(s.en.name,s.bn.name)} style="font-size:clamp(2rem,4.4vw,3.1rem)"></h1>
    <p class="lead" ${bl(s.en.tag,s.bn.tag)} style="color:#3f5a66;font-size:1.15rem;margin:16px auto 26px"></p>
    <div class="hero-cta" style="justify-content:center">
      <a class="btn btn-primary" href="../index.html#book" ${bl("Book Appointment","অ্যাপয়েন্টমেন্ট নিন")}></a>
      <a class="btn btn-ghost" href="tel:+8801706516868" ${bl("Call Now","কল করুন")}></a>
    </div>
  </div>
</section>

<section class="section"><div class="container" style="max-width:840px">
  <span class="eyebrow" ${bl("Overview","সংক্ষিপ্ত বিবরণ")}></span>
  <p ${bl(s.en.overview,s.bn.overview)} style="font-size:1.1rem;color:var(--muted);margin-top:10px"></p>
</div></section>

<section class="section soft"><div class="container why-grid">
  <div class="left">
    <span class="eyebrow" ${bl("Benefits","সুবিধা")}></span>
    <h2 ${bl("Why choose this treatment","কেন এই চিকিৎসা বেছে নেবেন")}></h2>
    <ul class="why-list" style="margin-top:20px">${li(s.en.benefits,"benefits")}</ul>
  </div>
  <div class="calc-out" style="align-self:center">
    <div class="lbl" ${bl("Starting price","শুরুর মূল্য")}></div>
    <span class="calc-amt" ${bl(s.en.price,s.bn.price)} style="font-size:1.5rem"></span>
    <a class="btn" href="../index.html#book" ${bl("Book this treatment","এই চিকিৎসা বুক করুন")}></a>
  </div>
</div></section>

<section class="section"><div class="container">
  <div class="sec-head"><span class="eyebrow" ${bl("How It Works","যেভাবে কাজ করে")}></span>
    <h2 ${bl("Your treatment in 4 steps","৪ ধাপে আপনার চিকিৎসা")}></h2></div>
  <div class="steps-grid">${steps}</div>
</div></section>

<section class="emerg-band"><div class="container emerg-grid">
  <div><h2 ${bl("Ready to book your "+s.en.name+"?","আপনার "+s.bn.name+" বুক করতে প্রস্তুত?")}></h2>
    <p ${bl("Same-day appointments available. Call us or message on WhatsApp and our team will help you right away.","একই দিনের অ্যাপয়েন্টমেন্ট আছে। কল করুন বা হোয়াটসঅ্যাপে মেসেজ দিন, আমাদের টিম সাথে সাথে সাহায্য করবে।")}></p></div>
  <div class="emerg-cta">
    <a class="btn btn-orange" href="tel:+8801706516868">📞 <span ${bl("Call Now","কল করুন")}></span></a>
    <a class="btn btn-wa" href="https://wa.me/8801713241670?text=${encodeURIComponent("I want to book: "+s.en.name)}" target="_blank" rel="noopener">💬 <span ${bl("WhatsApp","হোয়াটসঅ্যাপ")}></span></a>
  </div>
</div></section>

<footer class="footer"><div class="container" style="text-align:center">
  <div class="foot-logo" style="justify-content:center"><span class="logo-anim"><img src="../assets/mark.png?v=2" alt="Omega Dental" style="height:50px"></span><span style="font-family:var(--f-head);font-weight:800;color:#fff;font-size:1.25rem">OMEGA<small style="display:block;font-size:.62rem;letter-spacing:.34em;color:var(--orange)">DENTAL</small></span></div>
  <p style="color:#a9c2cd;margin:14px 0">1252/3, East Monipur, West Kazipara, Begum Rokeya Sarani, Dhaka · 01706-516868</p>
  <a class="btn btn-primary" href="../index.html" ${bl("← Back to home","← হোমে ফিরুন")}></a>
  <div class="foot-bottom">© <span id="yr"></span> OMEGA DENTAL</div>
</div></footer>

<a class="fab" href="https://wa.me/8801713241670" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
<script>
document.getElementById('yr').textContent=new Date().getFullYear();
function setLang(l){document.documentElement.setAttribute('data-lang',l);document.body.classList.toggle('bn',l==='bn');try{localStorage.setItem('omega_lang',l)}catch(e){}
document.querySelectorAll('[data-en]').forEach(function(el){el.textContent=(l==='bn'?el.getAttribute('data-bn'):el.getAttribute('data-en'));});
var t=document.getElementById('langText');if(t)t.textContent=(l==='bn'?'EN':'বাংলা');}
var L='en';try{L=localStorage.getItem('omega_lang')||'en'}catch(e){}
setLang(L);
document.getElementById('langToggle').onclick=function(){setLang(document.documentElement.getAttribute('data-lang')==='en'?'bn':'en');};
var b=document.getElementById('burger'),n=document.getElementById('navlist');if(b)b.onclick=function(){n.classList.toggle('open');};
</script>
</body>
</html>`;
}

const outDir = path.join(__dirname,"..","services");
fs.mkdirSync(outDir,{recursive:true});
SERVICES.forEach(s=>fs.writeFileSync(path.join(outDir,`${s.slug}.html`), page(s)));

// sitemap
const urls = [`${SITE}/`, ...SERVICES.map(s=>`${SITE}/services/${s.slug}.html`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u=>`  <url><loc>${u}</loc><changefreq>monthly</changefreq></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(__dirname,"..","sitemap.xml"), sitemap);

console.log("Generated",SERVICES.length,"service pages + sitemap.xml");
