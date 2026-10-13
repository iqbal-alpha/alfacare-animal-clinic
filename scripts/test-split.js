const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

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
  const colors = await page.evaluate(() => {
    const img = document.getElementById('img');
    const cvs = document.getElementById('cvs');
    cvs.width = img.naturalWidth;
    cvs.height = img.naturalHeight;
    const ctx = cvs.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const results = [];
    for (let y = 580; y <= 630; y += 2) {
      const p = ctx.getImageData(50, y, 1, 1).data;
      results.push({ y, rgb: [p[0], p[1], p[2]] });
    }
    return results;
  });
  console.log(JSON.stringify(colors, null, 2));
  await browser.close();
})();
