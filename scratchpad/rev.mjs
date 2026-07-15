import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: process.env.CHROME });
const dir = process.cwd();
async function grab(vw, file){
  const p = await b.newPage({ viewport:{width:vw,height:1000}, deviceScaleFactor:2 });
  await p.goto('file://'+dir+'/index.html', {waitUntil:'networkidle'});
  await p.waitForTimeout(900);
  const el = await p.$('.review-cta');
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(300);
  const info = await p.evaluate(()=>{
    const q=s=>document.querySelector(s);
    const seeAll=q('.review-score a.btn');
    const write=q('.review-write-btn');
    const qrimg=q('#reviewQRCode canvas,#reviewQRCode img');
    return {
      seeAllHref_hasReviewsFlag: seeAll.href.includes('!9m1!1b1'),
      writeText: write.textContent.trim(),
      writeHref: write.href,
      qrHasCanvas: !!qrimg,
      writeBtnW: Math.round(write.getBoundingClientRect().width),
      cardW: Math.round(q('.review-cta').getBoundingClientRect().width)
    };
  });
  await el.screenshot({ path: file });
  console.log(vw, JSON.stringify(info));
  await p.close();
}
await grab(1000,'scratchpad/rev_desktop.png');
await grab(380,'scratchpad/rev_mobile.png');
await b.close();
