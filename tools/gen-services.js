/* Generates static per-service SEO pages into /services and a sitemap.xml.
   Product-detail layout: image gallery + price + feature boxes + CTAs.
   Run: node tools/gen-services.js   */
const fs = require("fs");
const path = require("path");

const SITE = "https://podenapata-sys.github.io/Omega-Dental-";
const VER = "20260618j";
const esc = s => String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const bl = (en,bn) => `data-en="${esc(en)}" data-bn="${esc(bn)}"`;
const FACT_IC = ["💎","🕐","🛡️","🎖️"]; // procedure, visits, success, hygiene
const THUMB_POOL = ["teeth-whitening","scaling-polishing","tooth-fillings","crowns-bridges","dental-implants","braces-aligners","dentures","root-canal-rct"];

const SERVICES = [
  { slug:"root-canal", icon:"🌱", img:"root-canal-rct",
    en:{ name:"Root Canal Treatment (RCT)", tag:"Save your natural tooth, pain-free", price:"৳ 5,000",
      meta:"Painless root canal treatment (RCT) in Dhaka at Omega Dental. Single & multi-visit RCT from ৳5,000. Book with Dr. Afsana Haque.",
      desc:"Save your natural tooth with our painless, fully sterile treatment. Get fast relief from pain and return to your daily routine quickly.",
      facts:[["Procedure","Pain-free treatment"],["Visits","1–2 sessions only"],["Success Rate","Long-lasting result"],["Hygiene","100% sterile tools"]],
      overview:"A root canal removes infected pulp from inside a damaged tooth, relieves pain and lets you keep your natural tooth instead of extracting it. At Omega Dental we use gentle, modern techniques — including single-visit RCT — so most patients feel little to no discomfort.",
      process:["Digital X-ray & diagnosis","Gentle numbing of the area","Cleaning & sealing the canal","Filling or crown to protect the tooth"] },
    bn:{ name:"রুট ক্যানেল চিকিৎসা (RCT)", tag:"ব্যথাহীনভাবে আপনার আসল দাঁত বাঁচান", price:"৳ ৫,০০০",
      desc:"আমাদের ব্যথাহীন, সম্পূর্ণ জীবাণুমুক্ত চিকিৎসায় আপনার আসল দাঁত বাঁচান। দ্রুত ব্যথা থেকে মুক্তি পান এবং দ্রুত স্বাভাবিক জীবনে ফিরুন।",
      facts:[["পদ্ধতি","ব্যথাহীন চিকিৎসা"],["ভিজিট","মাত্র ১–২ সেশন"],["সাফল্যের হার","দীর্ঘস্থায়ী ফল"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"রুট ক্যানেল ক্ষতিগ্রস্ত দাঁতের ভেতরের সংক্রমিত পাল্প সরিয়ে ব্যথা কমায় এবং দাঁত তুলে ফেলার বদলে আসল দাঁত রক্ষা করে। ওমেগা ডেন্টালে আমরা কোমল, আধুনিক পদ্ধতি ব্যবহার করি — সিঙ্গেল-ভিজিট সহ — তাই বেশিরভাগ রোগী প্রায় কোনো ব্যথা অনুভব করেন না।",
      process:["ডিজিটাল এক্স-রে ও রোগ নির্ণয়","কোমলভাবে অবশ করা","ক্যানেল পরিষ্কার ও সিল করা","দাঁত রক্ষায় ফিলিং বা ক্রাউন"] } },

  { slug:"dental-implants", icon:"🔩", img:"dental-implants",
    en:{ name:"Dental Implants", tag:"Permanent, natural-looking new teeth", price:"৳ 1,20,000",
      meta:"Dental implants in Dhaka at Omega Dental — permanent replacement for missing teeth from ৳1,20,000. Book with Dr. Afsana Haque.",
      desc:"A permanent, natural-looking replacement for missing teeth that looks, feels and functions just like your own — built to last for decades.",
      facts:[["Procedure","Minor surgery"],["Visits","Multi-stage"],["Success Rate","95%+ long-term"],["Hygiene","100% sterile tools"]],
      overview:"A dental implant is a titanium root placed in the jaw to support a natural-looking replacement tooth. Implants are the gold-standard solution for missing teeth — they protect your jawbone and don't damage neighbouring teeth.",
      process:["Consultation & 3D assessment","Implant placement","Healing & integration","Final crown fitted on top"] },
    bn:{ name:"ডেন্টাল ইমপ্লান্ট", tag:"স্থায়ী, প্রাকৃতিক দেখতে নতুন দাঁত", price:"৳ ১,২০,০০০",
      desc:"হারানো দাঁতের স্থায়ী, প্রাকৃতিক দেখতে প্রতিস্থাপন যা দেখতে, অনুভবে ও কাজে একদম আসল দাঁতের মতো — কয়েক দশক টেকে।",
      facts:[["পদ্ধতি","ছোট সার্জারি"],["ভিজিট","একাধিক ধাপ"],["সাফল্যের হার","৯৫%+ দীর্ঘমেয়াদি"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"ডেন্টাল ইমপ্লান্ট হলো চোয়ালে স্থাপিত টাইটানিয়াম রুট যা প্রাকৃতিক দেখতে নকল দাঁত ধরে রাখে। হারানো দাঁতের জন্য ইমপ্লান্ট সেরা সমাধান — এটি চোয়ালের হাড় রক্ষা করে ও পাশের দাঁতের ক্ষতি করে না।",
      process:["পরামর্শ ও থ্রিডি মূল্যায়ন","ইমপ্লান্ট স্থাপন","নিরাময় ও সংযুক্তি","উপরে চূড়ান্ত ক্রাউন বসানো"] } },

  { slug:"braces-aligners", icon:"📏", img:"braces-aligners",
    en:{ name:"Braces & Clear Aligners", tag:"Straighten your smile with confidence", price:"৳ 25,000",
      meta:"Orthodontic braces & invisible clear aligners in Dhaka at Omega Dental. Braces from ৳25,000. Book with Dr. Afsana Haque.",
      desc:"Gently move misaligned teeth into a straight, healthy position with traditional braces or near-invisible clear aligners.",
      facts:[["Procedure","Non-surgical"],["Visits","Monthly check-ups"],["Duration","12–24 months"],["Hygiene","100% sterile tools"]],
      overview:"Braces and clear aligners gradually move misaligned teeth into a straight, healthy position. We offer traditional orthodontic braces as well as near-invisible clear aligners for a discreet option.",
      process:["Orthodontic assessment","Custom treatment plan","Fit braces or aligners","Regular adjustments to final result"] },
    bn:{ name:"ব্রেসেস ও ক্লিয়ার অ্যালাইনার", tag:"আত্মবিশ্বাসে দাঁত সোজা করুন", price:"৳ ২৫,০০০",
      desc:"সাধারণ ব্রেসেস বা প্রায় অদৃশ্য ক্লিয়ার অ্যালাইনার দিয়ে আঁকাবাঁকা দাঁত কোমলভাবে সোজা ও সুস্থ অবস্থানে আনুন।",
      facts:[["পদ্ধতি","সার্জারিবিহীন"],["ভিজিট","মাসিক চেকআপ"],["সময়কাল","১২–২৪ মাস"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"ব্রেসেস ও ক্লিয়ার অ্যালাইনার ধীরে ধীরে আঁকাবাঁকা দাঁত সোজা ও সুস্থ অবস্থানে নিয়ে আসে। আমরা সাধারণ অর্থোডন্টিক ব্রেসেসের পাশাপাশি প্রায় অদৃশ্য ক্লিয়ার অ্যালাইনারও দিই।",
      process:["অর্থোডন্টিক মূল্যায়ন","কাস্টম চিকিৎসা পরিকল্পনা","ব্রেসেস বা অ্যালাইনার লাগানো","নিয়মিত সমন্বয়ে চূড়ান্ত ফল"] } },

  { slug:"teeth-whitening", icon:"✨", img:"teeth-whitening",
    en:{ name:"Teeth Whitening", tag:"A brighter smile in one visit", price:"৳ 12,000",
      meta:"Professional teeth whitening in Dhaka at Omega Dental for ৳12,000. Safe, fast and effective. Book with Dr. Afsana Haque.",
      desc:"Safely lighten years of stains and brighten your smile several shades in a single, comfortable visit.",
      facts:[["Procedure","Pain-free"],["Visits","1 session"],["Result","Several shades brighter"],["Hygiene","100% sterile tools"]],
      overview:"Professional teeth whitening safely lightens stains from tea, coffee, smoking and age — far more effective and safer than over-the-counter kits, with results you can see the same day.",
      process:["Cleaning & shade check","Gum protection applied","Whitening gel + light","Instant brighter result"] },
    bn:{ name:"দাঁত সাদা করা", tag:"এক ভিজিটেই উজ্জ্বল হাসি", price:"৳ ১২,০০০",
      desc:"বছরের জমা দাগ নিরাপদে দূর করে এক ভিজিটেই আপনার হাসি কয়েক শেড উজ্জ্বল করুন।",
      facts:[["পদ্ধতি","ব্যথাহীন"],["ভিজিট","১ সেশন"],["ফলাফল","কয়েক শেড উজ্জ্বল"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"পেশাদার হোয়াইটেনিং চা, কফি, ধূমপান ও বয়সজনিত দাগ নিরাপদে দূর করে — দোকানের কিটের চেয়ে অনেক বেশি কার্যকর ও নিরাপদ, একই দিনে দৃশ্যমান ফল।",
      process:["পরিষ্কার ও শেড পরীক্ষা","মাড়ি সুরক্ষা","হোয়াইটেনিং জেল + লাইট","তাৎক্ষণিক উজ্জ্বল ফল"] } },

  { slug:"crowns-bridges", icon:"👑", img:"crowns-bridges",
    en:{ name:"Crowns & Bridges", tag:"Rebuild strength and beauty", price:"৳ 5,000",
      meta:"Dental crowns & bridges in Dhaka at Omega Dental — Zirconia, PFM & composite crowns from ৳5,000. Book with Dr. Afsana Haque.",
      desc:"Restore the strength, shape and beauty of damaged or missing teeth with durable, natural-looking crowns and bridges.",
      facts:[["Procedure","Pain-free"],["Visits","2 sessions"],["Material","Zirconia / PFM"],["Hygiene","100% sterile tools"]],
      overview:"Crowns cap a damaged or root-treated tooth to restore its strength and shape, while bridges replace one or more missing teeth. We offer durable Zirconia, PFM and composite options matched to your natural teeth.",
      process:["Tooth preparation","Precise digital impression","Custom crown/bridge made","Fitting & final polish"] },
    bn:{ name:"ক্রাউন ও ব্রিজ", tag:"শক্তি ও সৌন্দর্য ফিরিয়ে আনুন", price:"৳ ৫,০০০",
      desc:"টেকসই, প্রাকৃতিক দেখতে ক্রাউন ও ব্রিজ দিয়ে ক্ষতিগ্রস্ত বা হারানো দাঁতের শক্তি, আকৃতি ও সৌন্দর্য ফিরিয়ে আনুন।",
      facts:[["পদ্ধতি","ব্যথাহীন"],["ভিজিট","২ সেশন"],["উপাদান","জিরকোনিয়া / পিএফএম"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"ক্রাউন ক্ষতিগ্রস্ত বা রুট-ক্যানেল করা দাঁত ঢেকে শক্তি ও আকৃতি ফেরায়, আর ব্রিজ এক বা একাধিক হারানো দাঁত প্রতিস্থাপন করে। আমরা টেকসই জিরকোনিয়া, পিএফএম ও কম্পোজিট অপশন দিই।",
      process:["দাঁত প্রস্তুত করা","নিখুঁত ডিজিটাল ছাপ","কাস্টম ক্রাউন/ব্রিজ তৈরি","ফিটিং ও চূড়ান্ত পলিশ"] } },

  { slug:"dentures", icon:"🦿", img:"dentures",
    en:{ name:"Dentures", tag:"Comfortable, natural-looking replacements", price:"৳ 4,000",
      meta:"Partial, flexible & complete dentures in Dhaka at Omega Dental from ৳4,000. Book with Dr. Afsana Haque.",
      desc:"Chew, speak and smile with confidence again with custom partial, flexible and complete dentures.",
      facts:[["Procedure","Non-surgical"],["Visits","2–3 sessions"],["Fit","Custom-made"],["Hygiene","100% sterile tools"]],
      overview:"Dentures replace missing teeth so you can chew, speak and smile with confidence again. We craft partial, flexible and complete dentures with a comfortable, natural-looking fit.",
      process:["Oral assessment","Impressions & measurements","Custom denture crafted","Fitting & comfort adjustment"] },
    bn:{ name:"ডেনচার", tag:"আরামদায়ক, প্রাকৃতিক দেখতে প্রতিস্থাপন", price:"৳ ৪,০০০",
      desc:"কাস্টম পার্শিয়াল, ফ্লেক্সিবল ও কমপ্লিট ডেনচার দিয়ে আবার আত্মবিশ্বাসে চিবান, কথা বলুন ও হাসুন।",
      facts:[["পদ্ধতি","সার্জারিবিহীন"],["ভিজিট","২–৩ সেশন"],["ফিট","কাস্টম তৈরি"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"ডেনচার হারানো দাঁত প্রতিস্থাপন করে যাতে আপনি আবার আত্মবিশ্বাসে চিবাতে, কথা বলতে ও হাসতে পারেন। আমরা আরামদায়ক, প্রাকৃতিক ফিটের ডেনচার তৈরি করি।",
      process:["মুখ পরীক্ষা","ছাপ ও পরিমাপ","কাস্টম ডেনচার তৈরি","ফিটিং ও আরাম সমন্বয়"] } },

  { slug:"scaling-polishing", icon:"🦷", img:"scaling-polishing",
    en:{ name:"Scaling & Polishing", tag:"Healthy gums, fresh clean smile", price:"৳ 1,500",
      meta:"Professional teeth scaling & polishing in Dhaka at Omega Dental from ৳1,000. Book a cleaning with Dr. Afsana Haque.",
      desc:"Remove plaque and tartar and polish your teeth for healthy gums, fresh breath and a brighter smile.",
      facts:[["Procedure","Pain-free"],["Visits","1 session"],["Recommended","Every 6 months"],["Hygiene","100% sterile tools"]],
      overview:"Scaling removes plaque and hardened tartar that brushing can't, while polishing smooths and brightens your teeth. Regular cleaning prevents gum disease, bad breath and tooth loss.",
      process:["Gum & teeth check","Ultrasonic scaling","Polishing","Care & prevention tips"] },
    bn:{ name:"স্কেলিং ও পলিশিং", tag:"সুস্থ মাড়ি, পরিষ্কার সতেজ হাসি", price:"৳ ১,৫০০",
      desc:"প্লাক ও টার্টার দূর করে দাঁত পলিশ করুন — সুস্থ মাড়ি, সতেজ নিঃশ্বাস ও উজ্জ্বল হাসির জন্য।",
      facts:[["পদ্ধতি","ব্যথাহীন"],["ভিজিট","১ সেশন"],["প্রস্তাবিত","প্রতি ৬ মাসে"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"স্কেলিং প্লাক ও শক্ত টার্টার দূর করে যা ব্রাশে যায় না, আর পলিশিং দাঁত মসৃণ ও উজ্জ্বল করে। নিয়মিত পরিষ্কার মাড়ির রোগ, দুর্গন্ধ ও দাঁত পড়া রোধ করে।",
      process:["মাড়ি ও দাঁত পরীক্ষা","আল্ট্রাসনিক স্কেলিং","পলিশিং","যত্ন ও প্রতিরোধের পরামর্শ"] } },

  { slug:"tooth-fillings", icon:"🪥", img:"tooth-fillings",
    en:{ name:"Tooth Fillings", tag:"Restore decayed teeth, painlessly", price:"৳ 1,000",
      meta:"Tooth-coloured composite & GI fillings in Dhaka at Omega Dental from ৳1,000. Book with Dr. Afsana Haque.",
      desc:"Repair decayed teeth with natural, tooth-coloured fillings that stop pain and prevent further damage.",
      facts:[["Procedure","Pain-free"],["Visits","1 session"],["Finish","Tooth-coloured"],["Hygiene","100% sterile tools"]],
      overview:"A filling repairs a tooth damaged by decay, stopping pain and preventing further damage. We use tooth-coloured composite and GI fillings that blend in naturally and are placed gently and painlessly.",
      process:["Examine the cavity","Gentle cleaning","Tooth-coloured filling","Shaping & polish"] },
    bn:{ name:"দাঁতের ফিলিং", tag:"ব্যথাহীনভাবে ক্ষয়প্রাপ্ত দাঁত ঠিক করুন", price:"৳ ১,০০০",
      desc:"প্রাকৃতিক, দাঁতের রঙের ফিলিং দিয়ে ক্ষয়প্রাপ্ত দাঁত মেরামত করুন — ব্যথা বন্ধ করে ও আরও ক্ষতি রোধ করে।",
      facts:[["পদ্ধতি","ব্যথাহীন"],["ভিজিট","১ সেশন"],["ফিনিশ","দাঁতের রঙের"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"ফিলিং ক্ষয়ে ক্ষতিগ্রস্ত দাঁত মেরামত করে, ব্যথা বন্ধ করে ও আরও ক্ষতি রোধ করে। আমরা দাঁতের রঙের কম্পোজিট ও জিআই ফিলিং ব্যবহার করি যা প্রাকৃতিকভাবে মিশে যায়।",
      process:["ক্যাভিটি পরীক্ষা","কোমল পরিষ্কার","দাঁতের রঙের ফিলিং","আকৃতি ও পলিশ"] } },
];

function page(s){
  const url = `${SITE}/services/${s.slug}.html`;
  const thumbs = [s.img, ...THUMB_POOL.filter(x=>x!==s.img)].slice(0,4);
  const thumbHtml = thumbs.map((tg,i)=>`<button class="pthumb${i===0?' active':''}" type="button" data-src="../assets/services/${tg}.svg"><img src="../assets/services/${tg}.svg" alt=""></button>`).join("");
  const facts = s.en.facts.map((f,i)=>`
        <div class="fact"><span class="fact-ic">${FACT_IC[i]}</span>
          <div><strong ${bl(f[0],s.bn.facts[i][0])}></strong><span ${bl(f[1],s.bn.facts[i][1])}></span></div></div>`).join("");
  const steps = s.en.process.map((_,i)=>`<article class="step-card"><span class="step-num">${i+1}</span><h3 ${bl(s.en.process[i],s.bn.process[i])}></h3></article>`).join("");
  const jsonld=`{"@context":"https://schema.org","@type":"MedicalProcedure","name":"${esc(s.en.name)}","procedureType":"Dentistry","description":"${esc(s.en.meta)}","url":"${url}","provider":{"@type":"Dentist","name":"Omega Dental","telephone":"+8801706516868","address":{"@type":"PostalAddress","streetAddress":"1252/3, East Monipur, West Kazipara, Begum Rokeya Sarani","addressLocality":"Dhaka","addressCountry":"BD"}}}`;
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
<script type="application/ld+json">${jsonld}</script>
</head>
<body>
<div id="scrollbar"></div>
<div class="topbar"><span>Painless &amp; Cosmetic Dental Care · Sat–Thu 10am–8pm</span> · <a href="tel:+8801706516868">01706-516868</a></div>
<header class="header"><nav class="nav container">
  <a class="brand" href="../index.html"><span class="logo-anim"><img src="../assets/mark.png?v=2" alt="Omega Dental"></span><span>OMEGA<small>DENTAL</small></span></a>
  <div class="navlist" id="navlist">
    <a href="../index.html#why" ${bl("About Us","আমাদের সম্পর্কে")}></a>
    <a href="../treatments.html" ${bl("Our Services","আমাদের সেবা")}></a>
    <a href="../index.html#contact" ${bl("Branch","শাখা")}></a>
    <a href="../index.html#about" ${bl("Doctors","ডাক্তার")}></a>
    <a href="../index.html#pricing" ${bl("Price List","মূল্য তালিকা")}></a>
    <a href="../blog/index.html" ${bl("Blog","ব্লগ")}></a>
    <div class="nav-actions">
      <a class="btn btn-primary" href="../index.html#book" ${bl("Book Appointment","অ্যাপয়েন্টমেন্ট নিন")}></a>
      <button class="lang-toggle" id="langToggle"><span id="langText">বাংলা</span></button>
    </div>
  </div>
  <button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>

<section class="section"><div class="container">
  <div class="prod-card">
    <div class="prod-grid">
      <div class="prod-gallery">
        <div class="prod-main"><img id="pmain" src="../assets/services/${s.img}.svg" alt="${esc(s.en.name)}"></div>
        <div class="prod-thumbs">${thumbHtml}</div>
      </div>
      <div class="prod-info">
        <span class="eyebrow">${s.icon} <span ${bl("Our Services","আমাদের সেবা")}></span></span>
        <h1 ${bl(s.en.name,s.bn.name)}></h1>
        <div class="prod-price" ${bl(s.en.price,s.bn.price)}></div>
        <p class="prod-desc" ${bl(s.en.desc,s.bn.desc)}></p>
        <hr class="prod-div">
        <div class="prod-facts">${facts}</div>
        <div class="prod-cta">
          <a class="btn btn-red" href="../index.html#book" ${bl("Book Appointment","অ্যাপয়েন্টমেন্ট নিন")}></a>
          <a class="btn btn-wa" href="https://wa.me/8801713241670?text=${encodeURIComponent("I want to book: "+s.en.name)}" target="_blank" rel="noopener" ${bl("WhatsApp","হোয়াটসঅ্যাপ")}></a>
        </div>
      </div>
    </div>
  </div>
</div></section>

<section class="section soft"><div class="container" style="max-width:840px">
  <span class="eyebrow" ${bl("About this treatment","এই চিকিৎসা সম্পর্কে")}></span>
  <p ${bl(s.en.overview,s.bn.overview)} style="font-size:1.08rem;color:var(--muted);margin-top:10px"></p>
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
    <a class="btn btn-wa" href="https://wa.me/8801713241670" target="_blank" rel="noopener">💬 <span ${bl("WhatsApp","হোয়াটসঅ্যাপ")}></span></a>
  </div>
</div></section>

<footer class="footer"><div class="container" style="text-align:center">
  <div class="foot-logo" style="justify-content:center"><span class="logo-anim"><img src="../assets/mark.png?v=2" alt="Omega Dental" style="height:50px"></span><span style="font-family:var(--f-head);font-weight:800;color:#fff;font-size:1.25rem">OMEGA<small style="display:block;font-size:.62rem;letter-spacing:.34em;color:var(--orange)">DENTAL</small></span></div>
  <p style="color:#a9c2cd;margin:14px 0">1252/3, East Monipur, West Kazipara, Begum Rokeya Sarani, Dhaka · 01706-516868</p>
  <a class="btn btn-primary" href="../treatments.html" ${bl("← All treatments","← সব চিকিৎসা")}></a>
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
var sb=document.getElementById('scrollbar');addEventListener('scroll',function(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight;sb.style.width=(m>0?h.scrollTop/m*100:0)+'%';},{passive:true});
var main=document.getElementById('pmain');document.querySelectorAll('.pthumb').forEach(function(t){t.onclick=function(){main.src=t.getAttribute('data-src');document.querySelectorAll('.pthumb').forEach(function(x){x.classList.remove('active')});t.classList.add('active');};});
</script>
</body>
</html>`;
}

const outDir = path.join(__dirname,"..","services");
fs.mkdirSync(outDir,{recursive:true});
SERVICES.forEach(s=>fs.writeFileSync(path.join(outDir,`${s.slug}.html`), page(s)));

const urls = [`${SITE}/`, `${SITE}/treatments.html`, `${SITE}/blog/index.html`, ...SERVICES.map(s=>`${SITE}/services/${s.slug}.html`)];
fs.writeFileSync(path.join(__dirname,"..","sitemap.xml"),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u=>`  <url><loc>${u}</loc><changefreq>monthly</changefreq></url>`).join("\n")}
</urlset>
`);
console.log("Generated",SERVICES.length,"product-style service pages");
