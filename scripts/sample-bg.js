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
  
  const sample = await page.evaluate(() => {
    const img = document.getElementById('img');
    const cvs = document.getElementById('cvs');
    cvs.width = img.naturalWidth;
    cvs.height = img.naturalHeight;
    const ctx = cvs.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    const topPoints = [
      { x: 50, y: 50 }, { x: 500, y: 50 }, { x: 1100, y: 50 },
      { x: 50, y: 300 }, { x: 1100, y: 300 }, { x: 50, y: 550 }, { x: 1100, y: 550 }
    ];
    const botPoints = [
      { x: 50, y: 650 }, { x: 50, y: 800 }, { x: 1100, y: 650 }, { x: 1100, y: 800 }
    ];
    
    return {
      top: topPoints.map(p => ({ p, rgb: Array.from(ctx.getImageData(p.x, p.y, 1, 1).data).slice(0, 3) })),
      bot: botPoints.map(p => ({ p, rgb: Array.from(ctx.getImageData(p.x, p.y, 1, 1).data).slice(0, 3) }))
    };
  });
  console.log(JSON.stringify(sample, null, 2));
  await browser.close();
})();
