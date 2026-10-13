const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  const buf = fs.readFileSync('C:/Users/ASUS/.gemini/antigravity-ide/brain/80f44702-0e7d-4862-b2b2-bf71dceb0578/hero_pets_split_bg_1791918716985.jpg');
  const b64 = buf.toString('base64');
  await page.setContent(`<!DOCTYPE html><html><body><img id="img" src="data:image/jpeg;base64,${b64}"><canvas id="cvs"></canvas></body></html>`);
  
  const rawPawB64 = await page.evaluate(() => {
    const img = document.getElementById('img');
    const cvs = document.getElementById('cvs');
    cvs.width = img.naturalWidth;
    cvs.height = img.naturalHeight;
    const ctx = cvs.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    // In original 1200x896, dog is from x: 180 to ~600, paws around x: 200 to 550, y: 500 to 800
    const patchCvs = document.createElement('canvas');
    patchCvs.width = 600;
    patchCvs.height = 400;
    const pCtx = patchCvs.getContext('2d');
    pCtx.drawImage(cvs, 150, 480, 600, 400, 0, 0, 600, 400);
    return patchCvs.toDataURL('image/png').split(',')[1];
  });

  fs.writeFileSync('docs/screenshots/raw-paw-patch.png', Buffer.from(rawPawB64, 'base64'));
  console.log('Saved raw-paw-patch.png');
  await browser.close();
})();
