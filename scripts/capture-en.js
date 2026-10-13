const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Click the EN toggle button
  const enButtons = await page.$$('button');
  for (const btn of enButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.trim() === 'EN') {
      await btn.click();
      break;
    }
  }

  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: path.join(__dirname, '../docs/screenshots/01-hero-english.png') });
  console.log('Saved 01-hero-english.png');
  await browser.close();
})();
