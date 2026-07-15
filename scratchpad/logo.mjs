import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: process.env.CHROME });
const dir = process.cwd();
const p = await b.newPage({ viewport:{width:1000,height:1000}, deviceScaleFactor:3 });
await p.goto('file://'+dir+'/gallery/index.html', {waitUntil:'networkidle'});
await p.waitForTimeout(600);
// crop the first post header (avatar) + its watermark area
const card = await p.$('.gal-item');
await card.scrollIntoViewIfNeeded();
await p.waitForTimeout(200);
const head = await p.$('.gal-item .gal-head');
await head.screenshot({ path:'scratchpad/logo_avatar.png' });
const wm = await p.$('.gal-item .gal-photo');
await wm.screenshot({ path:'scratchpad/logo_wm.png' });
const info = await p.evaluate(()=>{
  const a=document.querySelector('.gal-avatar img');
  const w=document.querySelector('.gal-wm img');
  return {avatarSrc:a.getAttribute('src'), avatarNatural:[a.naturalWidth,a.naturalHeight],
          wmSrc:w.getAttribute('src'), wmNatural:[w.naturalWidth,w.naturalHeight]};
});
console.log(JSON.stringify(info));
await b.close();
