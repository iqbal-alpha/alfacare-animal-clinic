const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  const buf = fs.readFileSync('public/hero/pets-giant-cutout.png');
  const b64 = buf.toString('base64');
  await page.setContent(`<!DOCTYPE html><html><body><img id="img" src="data:image/png;base64,${b64}"><canvas id="cvs"></canvas></body></html>`);
  
  // Let's crop a 300x300 patch around the dog's paws and save it to an image we can view!
  const dogPawPatchB64 = await page.evaluate(() => {
    const img = document.getElementById('img');
    const cvs = document.getElementById('cvs');
    cvs.width = img.naturalWidth;
    cvs.height = img.naturalHeight;
    const ctx = cvs.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    // The dog is on the left half of the cutout (cutout width is 879, height 617)
    // The dog paws are around x: 100 to 450, y: 350 to 600
    const patchCvs = document.createElement('canvas');
    patchCvs.width = 400;
    patchCvs.height = 300;
    const pCtx = patchCvs.getContext('2d');
    // Draw a bright magenta or white background so any leaking color stands out clearly!
    pCtx.fillStyle = '#00ff00'; // neon green background to instantly spot leaks
    pCtx.fillRect(0, 0, 400, 300);
    pCtx.drawImage(cvs, 50, 350, 400, 300, 0, 0, 400, 300);
    return patchCvs.toDataURL('image/png').split(',')[1];
  });

  fs.writeFileSync('docs/screenshots/dog-paw-debug.png', Buffer.from(dogPawPatchB64, 'base64'));
  console.log('Saved dog-paw-debug.png');
  await browser.close();
})();
