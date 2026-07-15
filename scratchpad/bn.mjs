import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: process.env.CHROME });
const dir = process.cwd();
const p = await b.newPage({ viewport:{width:820,height:1000}, deviceScaleFactor:2 });
await p.goto('file://'+dir+'/index.html', {waitUntil:'networkidle'});
await p.evaluate(()=>localStorage.setItem('omega_lang','bn'));
await p.reload({waitUntil:'networkidle'});
await p.waitForTimeout(900);
const info = await p.evaluate(()=>{
  const lead=document.querySelector('.lead');
  const hl=lead.querySelector('.brand-hl');
  return {
    heroLeadText: lead.textContent.slice(0,60),
    heroHighlight: hl? hl.textContent : '(none)',
    // check no orphan standalone matra: a text node starting with a combining mark right after the span
    contactTitle: (document.querySelector('[data-i18n="contact_title"]')||{}).textContent,
  };
});
console.log(JSON.stringify(info,null,0));
// screenshot hero
const hero=await p.$('.hero .lead');
await hero.screenshot({path:'scratchpad/bn_hero.png'});
await b.close();
