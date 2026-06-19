/* Generates /treatments.html — a full bilingual treatment catalog page.
   Run: node tools/gen-treatments.js */
const fs = require("fs");
const path = require("path");
const SITE = "https://podenapata-sys.github.io/Omega-Dental-";
const VER = "20260618r";
const esc = s => String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const bl = (en,bn) => `data-en="${esc(en)}" data-bn="${esc(bn)}"`;

// name_en, name_bn, price, imgSlug, detailSlug|null, desc_en, desc_bn
const T = [
  ["Scaling & Polishing","স্কেলিং ও পলিশিং","৳1,000–1,500","scaling-polishing","scaling-polishing","Professional cleaning for healthy gums.","সুস্থ মাড়ির জন্য পেশাদার পরিষ্কার।"],
  ["Tooth Fillings","দাঁতের ফিলিং","৳1,000–3,000","tooth-fillings","tooth-fillings","Tooth-coloured composite & GI fillings.","দাঁতের রঙের কম্পোজিট ও জিআই ফিলিং।"],
  ["Root Canal (RCT)","রুট ক্যানেল","From ৳5,000","root-canal-rct","root-canal","Gentle single & multi-visit root canal.","কোমল সিঙ্গেল ও মাল্টি-ভিজিট রুট ক্যানেল।"],
  ["Crowns & Bridges","ক্রাউন ও ব্রিজ","From ৳5,000","crowns-bridges","crowns-bridges","Zirconia, PFM & composite crowns.","জিরকোনিয়া, পিএফএম ও কম্পোজিট ক্রাউন।"],
  ["Teeth Whitening","দাঁত সাদা করা","৳12,000","teeth-whitening","teeth-whitening","Brighten your smile several shades.","হাসি কয়েক শেড উজ্জ্বল করুন।"],
  ["Veneers","ভিনিয়ার","৳3,500–7,500","veneers","veneers","Composite veneers to perfect front teeth.","সামনের দাঁত নিখুঁত করতে ভিনিয়ার।"],
  ["Dentures","ডেনচার","৳4,000–22,000","dentures","dentures","Partial, flexible & complete dentures.","পার্শিয়াল, ফ্লেক্সিবল ও কমপ্লিট ডেনচার।"],
  ["Braces & Aligners","ব্রেসেস ও অ্যালাইনার","From ৳25,000","braces-aligners","braces-aligners","Braces & clear aligners to straighten teeth.","দাঁত সোজা করতে ব্রেসেস ও অ্যালাইনার।"],
  ["Dental Implants","ডেন্টাল ইমপ্লান্ট","৳1,20,000+","dental-implants","dental-implants","Permanent replacement for missing teeth.","হারানো দাঁতের স্থায়ী প্রতিস্থাপন।"],
  ["Extractions & Surgery","দাঁত তোলা ও সার্জারি","৳1,000–12,000","extractions-surgery","extractions","Painless simple & surgical extractions.","ব্যথাহীন সাধারণ ও সার্জিক্যাল দাঁত তোলা।"],
  ["Kids Dentistry","শিশু দন্তচিকিৎসা","From ৳1,000","kids-dentistry","kids-dentistry","Gentle paediatric care for children.","শিশুদের জন্য কোমল যত্ন।"],
  ["Cosmetic Dentistry","কসমেটিক ডেন্টিস্ট্রি","From ৳3,500","cosmetic-dentistry","cosmetic-dentistry","Smile makeovers: whitening, veneers, reshaping.","স্মাইল মেকওভার: হোয়াইটেনিং, ভিনিয়ার, রিশেপিং।"],
];

const cards = T.map(([en,bn,price,img,detail,de,db])=>{
  const href = detail ? `services/${detail}.html` : "#book";
  return `
      <article class="svc-card">
        <a class="svc-img" href="${href}"><img src="assets/services/${img}.svg?v=2" alt="${esc(en)}" loading="lazy"></a>
        <div class="svc-body">
          <h3><a href="${href}" ${bl(en,bn)}></a></h3>
          <p ${bl(de,db)}></p>
          <div class="svc-foot">
            <span class="svc-price">${esc(price)}</span>
            <a class="btn btn-primary svc-book" href="#book" ${bl("Book Now","বুক করুন")}></a>
          </div>
        </div>
      </article>`;
}).join("");

const html = `<!DOCTYPE html>
<html lang="en" data-lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>All Treatments & Prices | Omega Dental, Dhaka</title>
<meta name="description" content="Browse all dental treatments at Omega Dental, Dhaka with prices — scaling, fillings, root canal, crowns, whitening, veneers, dentures, braces, implants, extractions and kids dentistry.">
<link rel="canonical" href="${SITE}/treatments.html">
<meta property="og:title" content="All Treatments & Prices | Omega Dental">
<meta property="og:image" content="${SITE}/assets/logo.png">
<meta name="theme-color" content="#57C3AD">
<link rel="icon" type="image/png" href="assets/mark.png?v=2">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/styles.css?v=${VER}">
</head>
<body>
<div id="scrollbar"></div>
<div class="topbar"><span>Painless &amp; Cosmetic Dental Care · Sat–Thu 10:00 AM–9:30 PM · Fri 11:00 AM–9:30 PM</span> · <a href="tel:+8801706516868">01706-516868</a></div>
<header class="header"><nav class="nav container">
  <a class="brand" href="index.html"><span class="logo-anim"><img src="assets/mark.png?v=2" alt="Omega Dental"></span><span>OMEGA<small>DENTAL</small></span></a>
  <div class="navlist" id="navlist">
    <a href="index.html#why" ${bl("About Us","আমাদের সম্পর্কে")}></a>
    <a href="treatments.html" ${bl("Our Services","আমাদের সেবা")}></a>
    <a href="index.html#contact" ${bl("Branch","শাখা")}></a>
    <a href="index.html#about" ${bl("Doctors","ডাক্তার")}></a>
    <a href="index.html#pricing" ${bl("Price List","মূল্য তালিকা")}></a>
    <a href="blog/index.html" ${bl("Blog","ব্লগ")}></a>
    <div class="nav-actions">
      <a class="btn btn-primary" href="index.html#book" ${bl("Book Appointment","অ্যাপয়েন্টমেন্ট নিন")}></a>
      <button class="lang-toggle" id="langToggle"><span id="langText">বাংলা</span></button>
    </div>
  </div>
  <button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>

<section class="hero"><span class="blob b1"></span><span class="blob b2"></span>
  <div class="container" style="position:relative;z-index:1;padding:56px 0 40px;text-align:center;max-width:780px">
    <span class="eyebrow" ${bl("Our Services","আমাদের সেবা")}></span>
    <h1 ${bl("All Dental Treatments","সকল দন্ত চিকিৎসা")} style="font-size:clamp(2rem,4.4vw,3rem)"></h1>
    <p ${bl("Complete dental care with clear, upfront pricing. Tap any treatment to learn more or book.","স্বচ্ছ ও আগাম মূল্যে সম্পূর্ণ দন্তসেবা। বিস্তারিত জানতে বা বুক করতে যেকোনো চিকিৎসায় চাপুন।")} style="color:var(--muted);margin-top:12px"></p>
  </div>
</section>

<section class="section" id="book" style="padding-top:24px"><div class="container">
  <div class="svc-grid">${cards}</div>
  <div style="text-align:center;margin-top:46px">
    <a class="btn btn-primary" href="index.html#book" ${bl("Book an Appointment","অ্যাপয়েন্টমেন্ট নিন")}></a>
  </div>
</div></section>

<footer class="footer"><div class="container" style="text-align:center">
  <div class="foot-logo" style="justify-content:center"><span class="logo-anim"><img src="assets/mark.png?v=2" alt="Omega Dental" style="height:50px"></span><span style="font-family:var(--f-head);font-weight:800;color:#fff;font-size:1.25rem">OMEGA<small style="display:block;font-size:.62rem;letter-spacing:.34em;color:var(--orange)">DENTAL</small></span></div>
  <p style="color:#a9c2cd;margin:14px 0">1252/3, East Monipur, West Kazipara, Begum Rokeya Soroni, Dhaka · 01706-516868</p>
  <a class="btn btn-primary" href="index.html" ${bl("← Back to home","← হোমে ফিরুন")}></a>
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
</script>
</body></html>`;

fs.writeFileSync(path.join(__dirname,"..","treatments.html"), html);
console.log("Generated treatments.html with",T.length,"treatments");
