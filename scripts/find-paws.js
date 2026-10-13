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
  
  const edge = await page.evaluate(() => {
    const img = document.getElementById('img');
    const cvs = document.getElementById('cvs');
    cvs.width = img.naturalWidth;
    cvs.height = img.naturalHeight;
    const ctx = cvs.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const p1 = ctx.getImageData(0, 300, 1, 1).data;
    const p2 = ctx.getImageData(1199, 300, 1, 1).data;
    const p3 = ctx.getImageData(0, 700, 1, 1).data;
    const p4 = ctx.getImageData(1199, 700, 1, 1).data;
    return { p1: [p1[0], p1[1], p1[2]], p2: [p2[0], p2[1], p2[2]], p3: [p3[0], p3[1], p3[2]], p4: [p4[0], p4[1], p4[2]] };
  });
  console.log('Edge pixels:', edge);
  await browser.close();
})();
