const puppeteer = require('puppeteer');
const fs = require('fs');

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

  const debugPatchB64 = await page.evaluate(() => {
    const img = document.getElementById('img');
    const cvs = document.getElementById('cvs');
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    cvs.width = w;
    cvs.height = h;
    const ctx = cvs.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    // BFS Flood Fill for peach background (above split line y = 614)
    const visited = new Uint8Array(w * h);
    const queue = new Int32Array(w * h);
    let head = 0, tail = 0;

    const peachR = 249, peachG = 225, peachB = 212;

    function isPeach(x, y) {
      if (y >= 612) return false; // Never flood into the shelf
      const idx = (y * w + x) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      const dist = Math.sqrt((r - peachR)**2 + (g - peachG)**2 + (b - peachB)**2);
      return dist < 24;
    }

    // Seed outer borders for peach
    for (let x = 0; x < w; x++) {
      if (isPeach(x, 0)) {
        visited[x] = 1;
        queue[tail++] = x; // y=0
      }
    }
    for (let y = 1; y < 612; y++) {
      if (isPeach(0, y)) {
        visited[y * w] = 1;
        queue[tail++] = y * w;
      }
      if (isPeach(w - 1, y)) {
        visited[y * w + (w - 1)] = 1;
        queue[tail++] = y * w + (w - 1);
      }
    }

    // Run BFS
    while (head < tail) {
      const curr = queue[head++];
      const cx = curr % w;
      const cy = Math.floor(curr / w);

      // Check 4 neighbors
      const neighbors = [
        cx > 0 ? curr - 1 : -1,
        cx < w - 1 ? curr + 1 : -1,
        cy > 0 ? curr - w : -1,
        cy < 611 ? curr + w : -1,
      ];

      for (let n of neighbors) {
        if (n !== -1 && !visited[n]) {
          const nx = n % w;
          const ny = Math.floor(n / w);
          if (isPeach(nx, ny)) {
            visited[n] = 1;
            queue[tail++] = n;
          }
        }
      }
    }

    // Apply alpha 0 only to visited outer peach pixels
    for (let i = 0; i < w * h; i++) {
      if (visited[i]) {
        data[i * 4 + 3] = 0;
      }
    }

    ctx.putImageData(imgData, 0, 0);

    // Now extract patch around dog paws on green background to inspect
    const patchCvs = document.createElement('canvas');
    patchCvs.width = 600;
    patchCvs.height = 400;
    const pCtx = patchCvs.getContext('2d');
    pCtx.fillStyle = '#00ff00';
    pCtx.fillRect(0, 0, 600, 400);
    pCtx.drawImage(cvs, 150, 480, 600, 400, 0, 0, 600, 400);
    return patchCvs.toDataURL('image/png').split(',')[1];
  });

  fs.writeFileSync('docs/screenshots/floodfill-paw-test.png', Buffer.from(debugPatchB64, 'base64'));
  console.log('Saved floodfill-paw-test.png');
  await browser.close();
})();
