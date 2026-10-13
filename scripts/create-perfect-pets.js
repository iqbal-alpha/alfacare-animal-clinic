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

  const result = await page.evaluate(() => {
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

    const visited = new Uint8Array(w * h);
    const queue = new Int32Array(w * h);
    let head = 0, tail = 0;

    const peachR = 249, peachG = 225, peachB = 212;
    const blueR = 217, blueG = 226, blueB = 235;

    // 1. BFS for peach background (above y = 614)
    function isPeach(x, y) {
      if (y >= 614) return false;
      const idx = (y * w + x) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      const dist = Math.sqrt((r - peachR)**2 + (g - peachG)**2 + (b - peachB)**2);
      return dist < 24;
    }

    for (let x = 0; x < w; x++) {
      if (isPeach(x, 0)) {
        visited[x] = 1;
        queue[tail++] = x;
      }
    }
    for (let y = 1; y < 614; y++) {
      if (isPeach(0, y)) {
        visited[y * w] = 1;
        queue[tail++] = y * w;
      }
      if (isPeach(w - 1, y)) {
        visited[y * w + (w - 1)] = 1;
        queue[tail++] = y * w + (w - 1);
      }
    }

    while (head < tail) {
      const curr = queue[head++];
      const cx = curr % w;
      const cy = Math.floor(curr / w);

      const neighbors = [
        cx > 0 ? curr - 1 : -1,
        cx < w - 1 ? curr + 1 : -1,
        cy > 0 ? curr - w : -1,
        cy < 613 ? curr + w : -1,
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

    // 2. BFS for blue background (below y = 614)
    function isBlue(x, y) {
      if (y < 614) return false;
      const idx = (y * w + x) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      const dist = Math.sqrt((r - blueR)**2 + (g - blueG)**2 + (b - blueB)**2);
      return dist < 18;
    }

    let blueHead = tail;
    for (let x = 0; x < w; x++) {
      if (isBlue(x, h - 1)) {
        visited[(h - 1) * w + x] = 1;
        queue[tail++] = (h - 1) * w + x;
      }
    }
    for (let y = 614; y < h - 1; y++) {
      if (isBlue(0, y)) {
        visited[y * w] = 1;
        queue[tail++] = y * w;
      }
      if (isBlue(w - 1, y)) {
        visited[y * w + (w - 1)] = 1;
        queue[tail++] = y * w + (w - 1);
      }
    }

    while (blueHead < tail) {
      const curr = queue[blueHead++];
      const cx = curr % w;
      const cy = Math.floor(curr / w);

      const neighbors = [
        cx > 0 ? curr - 1 : -1,
        cx < w - 1 ? curr + 1 : -1,
        cy > 614 ? curr - w : -1,
        cy < h - 1 ? curr + w : -1,
      ];

      for (let n of neighbors) {
        if (n !== -1 && !visited[n]) {
          const nx = n % w;
          const ny = Math.floor(n / w);
          if (isBlue(nx, ny)) {
            visited[n] = 1;
            queue[tail++] = n;
          }
        }
      }
    }

    // Apply alpha 0 only to visited outer background pixels
    for (let i = 0; i < w * h; i++) {
      if (visited[i]) {
        data[i * 4 + 3] = 0;
      }
    }

    ctx.putImageData(imgData, 0, 0);

    // Exact crop dimensions
    // x: 160 to 1040 (w = 880)
    // y: 145 to 755 (h = 610)
    const cropX = 160;
    const cropY = 145;
    const cropW = 880;
    const cropH = 610;
    const splitInCrop = 614 - cropY; // 469px
    const overhangH = cropH - splitInCrop; // 141px
    const overhangRatio = overhangH / cropW; // 141 / 880 = 0.160227

    const cropCvs = document.createElement('canvas');
    cropCvs.width = cropW;
    cropCvs.height = cropH;
    const cCtx = cropCvs.getContext('2d');
    cCtx.drawImage(cvs, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    return {
      b64: cropCvs.toDataURL('image/png').split(',')[1],
      cropW,
      cropH,
      splitInCrop,
      overhangH,
      overhangPercentOfWidth: (overhangRatio * 100).toFixed(2)
    };
  });

  console.log('Result calculation:', result);

  const outPath = path.resolve(__dirname, '../public/hero/pets-giant-perfect.png');
  fs.writeFileSync(outPath, Buffer.from(result.b64, 'base64'));
  console.log('Saved pets-giant-perfect.png to', outPath);

  await browser.close();
})();
