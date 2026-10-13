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
  const inputJpg = 'C:/Users/ASUS/.gemini/antigravity-ide/brain/80f44702-0e7d-4862-b2b2-bf71dceb0578/hero_pets_split_bg_1791918716985.jpg';
  const buf = fs.readFileSync(inputJpg);
  const b64 = buf.toString('base64');

  await page.setContent(`<!DOCTYPE html><html><body><img id="img" src="data:image/jpeg;base64,${b64}"><canvas id="cvs"></canvas></body></html>`);

  const resultPng = await page.evaluate(() => {
    const img = document.getElementById('img');
    const cvs = document.getElementById('cvs');
    cvs.width = img.naturalWidth;
    cvs.height = img.naturalHeight;
    const ctx = cvs.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, cvs.width, cvs.height);
    const data = imgData.data;

    // Animal x range is known to be around x: 170 to 1020, and y: 150 to 750
    // Outside of x: [170, 1020], everything is 100% background!
    // Inside that box, we test against peach and blue background colors.
    const peachR = 249, peachG = 225, peachB = 212;
    const blueR = 217, blueG = 226, blueB = 235;

    for (let y = 0; y < cvs.height; y++) {
      for (let x = 0; x < cvs.width; x++) {
        const idx = (y * cvs.width + x) * 4;
        
        // Definite background areas outside animal bounding box
        if (x < 170 || x > 1025 || y < 145 || y > 755) {
          data[idx+3] = 0;
          continue;
        }

        const r = data[idx], g = data[idx+1], b = data[idx+2];
        const dPeach = Math.sqrt((r - peachR)**2 + (g - peachG)**2 + (b - peachB)**2);
        const dBlue = Math.sqrt((r - blueR)**2 + (g - blueG)**2 + (b - blueB)**2);

        let alpha = 255;
        if (y < 614) {
          if (dPeach < 18) {
            alpha = 0;
          } else if (dPeach < 32) {
            alpha = Math.round(255 * ((dPeach - 18) / 14));
          }
        } else {
          if (dBlue < 18) {
            alpha = 0;
          } else if (dBlue < 32) {
            alpha = Math.round(255 * ((dBlue - 18) / 14));
          }
        }
        data[idx+3] = alpha;
      }
    }

    // Now find exact visible animal bounds
    let minX = cvs.width, maxX = 0, minY = cvs.height, maxY = 0;
    for (let y = 0; y < cvs.height; y++) {
      for (let x = 0; x < cvs.width; x++) {
        const idx = (y * cvs.width + x) * 4;
        if (data[idx+3] > 40) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);

    // Crop tightly around the animals with small padding
    const pad = 12;
    const cropX = Math.max(0, minX - pad);
    const cropY = Math.max(0, minY - pad);
    const cropW = (maxX - minX) + pad * 2;
    const cropH = (maxY - minY) + pad * 2;

    const tightCvs = document.createElement('canvas');
    tightCvs.width = cropW;
    tightCvs.height = cropH;
    const tightCtx = tightCvs.getContext('2d');
    tightCtx.drawImage(cvs, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    return {
      b64: tightCvs.toDataURL('image/png').split(',')[1],
      dimensions: {
        cropW,
        cropH,
        minX,
        maxX,
        minY,
        maxY,
        // The split shelf line relative to this cropped image
        relativeSplitY: 614 - cropY
      }
    };
  });

  console.log('Final animal cutout dimensions:', resultPng.dimensions);

  const outPath = path.resolve(__dirname, '../public/hero/pets-giant-cutout.png');
  fs.writeFileSync(outPath, Buffer.from(resultPng.b64, 'base64'));
  console.log('Saved pets-giant-cutout.png to', outPath);

  await browser.close();
})();
