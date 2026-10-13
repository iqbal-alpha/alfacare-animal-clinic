const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function capture() {
  const outputDir = path.join(__dirname, '..', 'docs', 'screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Remove obsolete/debug files if they exist
  const obsoleteFiles = [
    '02-pricing-estimator.png',
    '03-booking-funnel.png',
    '04-clinical-case-studies.png',
    '05-emergency-triage-guide.png',
    '01c-scroll-test-overlap.png',
    'bfs-both-test.png',
    'dog-paw-debug.png',
    'floodfill-paw-test.png',
    'raw-paw-patch.png',
  ];
  for (const f of obsoleteFiles) {
    const fullPath = path.join(outputDir, f);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`Cleaned up obsolete image: ${f}`);
    }
  }

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  const targetUrl = process.env.APP_URL || 'http://localhost:3000';
  console.log(`Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  // 1. Hero Showcase (Desktop Indonesian)
  console.log('Capturing 01-hero-showcase.png...');
  await page.screenshot({ path: path.join(outputDir, '01-hero-showcase.png') });

  // 1b. Hero Scrolled
  console.log('Capturing 01b-hero-scrolled.png...');
  await page.evaluate(() => window.scrollBy(0, 140));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '01b-hero-scrolled.png') });
  await page.evaluate(() => window.scrollTo(0, 0));

  // 1c. Hero English Version
  console.log('Capturing 01-hero-english.png...');
  const enButtons = await page.$$('button');
  for (const btn of enButtons) {
    const text = await page.evaluate((el) => el.textContent, btn);
    if (text && text.trim() === 'EN') {
      await btn.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '01-hero-english.png') });

  // Switch back to ID
  for (const btn of await page.$$('button')) {
    const text = await page.evaluate((el) => el.textContent, btn);
    if (text && text.trim() === 'ID') {
      await btn.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 600));

  // 1d. Hero Mobile Viewport
  console.log('Capturing 01-hero-mobile.png...');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await mobilePage.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await mobilePage.screenshot({ path: path.join(outputDir, '01-hero-mobile.png') });
  await mobilePage.close();

  // Helper to hide sticky header for clean section photography
  await page.evaluate(() => {
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';
  });

  // 2. Services Section
  console.log('Capturing 02-services-showcase.png...');
  const servicesEl = await page.$('#services');
  if (servicesEl) {
    await servicesEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await servicesEl.screenshot({ path: path.join(outputDir, '02-services-showcase.png') });
  }

  // 3. Pricing Estimator Section
  console.log('Capturing 03-pricing-estimator.png...');
  const estimatorEl = await page.$('#estimator');
  if (estimatorEl) {
    await estimatorEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await estimatorEl.screenshot({ path: path.join(outputDir, '03-pricing-estimator.png') });
  }

  // 4. Multi-Step Booking Funnel
  console.log('Capturing 04-booking-funnel.png...');
  const bookingEl = await page.$('#booking');
  if (bookingEl) {
    await bookingEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await bookingEl.screenshot({ path: path.join(outputDir, '04-booking-funnel.png') });
  }

  // 5. Case Studies Section
  console.log('Capturing 05-clinical-case-studies.png...');
  const casesEl = await page.$('#cases');
  if (casesEl) {
    await casesEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await casesEl.screenshot({ path: path.join(outputDir, '05-clinical-case-studies.png') });
  }

  // 6. Emergency Triage Section
  console.log('Capturing 06-emergency-triage-guide.png...');
  const triageEl = await page.$('#emergency');
  if (triageEl) {
    await triageEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await triageEl.screenshot({ path: path.join(outputDir, '06-emergency-triage-guide.png') });
  }

  // 7. Clinic Location Section
  console.log('Capturing 07-clinic-location.png...');
  const locationEl = await page.$('#location');
  if (locationEl) {
    await locationEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await locationEl.screenshot({ path: path.join(outputDir, '07-clinic-location.png') });
  }

  // 8. Footer Section
  console.log('Capturing 08-footer.png...');
  const footerEl = await page.$('footer');
  if (footerEl) {
    await footerEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await footerEl.screenshot({ path: path.join(outputDir, '08-footer.png') });
  }

  console.log('All screenshots successfully refreshed with the latest design!');
  await browser.close();
}

capture().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
