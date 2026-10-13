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
  const imgPath = path.resolve(__dirname, '../public/hero/pets-paws-ledge.png');
  const imgData = fs.readFileSync(imgPath).toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; padding: 0;">
        <img id="img" src="data:image/png;base64,${imgData}" />
        <canvas id="cvs"></canvas>
      </body>
    </html>
  `);

  const bbox = await page.evaluate(() => {
    const img = document.getElementById('img');
    const canvas = document.getElementById('cvs');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const alpha = data[(y * canvas.width + x) * 4 + 3];
        if (alpha > 20) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    return { minX, minY, maxX, maxY, w: canvas.width, h: canvas.height };
  });

  console.log('Bounding box:', JSON.stringify(bbox));

  // Now let's crop the image so that the empty space on top is removed!
  // We can keep the full bottom so paws remain on the ledge, but crop from the top where minY is.
  // We can add a tiny breathing room of say 15px above minY.
  const cropDataUrl = await page.evaluate((minY) => {
    const img = document.getElementById('img');
    const canvas = document.getElementById('cvs');
    const startY = Math.max(0, minY - 15);
    const croppedHeight = img.naturalHeight - startY;
    
    canvas.width = img.naturalWidth;
    canvas.height = croppedHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, startY, img.naturalWidth, croppedHeight, 0, 0, img.naturalWidth, croppedHeight);
    return canvas.toDataURL('image/png');
  }, bbox.minY);

  const base64Data = cropDataUrl.replace(/^data:image\/png;base64,/, '');
  const outPath = path.resolve(__dirname, '../public/hero/pets-paws-tight.png');
  fs.writeFileSync(outPath, Buffer.from(base64Data, 'base64'));
  console.log(`Saved tightly cropped pets image to ${outPath}`);

  await browser.close();
})();
