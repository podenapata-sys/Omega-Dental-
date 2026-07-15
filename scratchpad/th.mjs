import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: process.env.CHROME });
const dir = process.cwd();
const p = await b.newPage({ viewport:{width:820,height:1200}, deviceScaleFactor:2 });
await p.goto('file://'+dir+'/services/veneers.html', {waitUntil:'networkidle'});
await p.evaluate(()=>localStorage.setItem('omega_lang','bn'));
await p.reload({waitUntil:'networkidle'});
await p.waitForTimeout(900);
const th = await p.$('.cmp-table thead');
await th.scrollIntoViewIfNeeded();
await p.waitForTimeout(200);
const info = await p.evaluate(()=>{
  const hl=document.querySelector('.cmp-table th .brand-hl');
  const c=hl?getComputedStyle(hl):null;
  const body=document.querySelector('.prod-desc .brand-hl, p .brand-hl, .brand-hl');
  return {headerBrandColor:c?c.color:'(no brand-hl in th)',
          headerBrandText:hl?hl.textContent:null,
          anyBodyBrandColor: body?getComputedStyle(body).color:null};
});
console.log(JSON.stringify(info));
await th.screenshot({path:'scratchpad/th_veneers.png'});
await b.close();
