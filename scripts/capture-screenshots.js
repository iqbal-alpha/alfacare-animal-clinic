const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function capture() {
  const outputDir = path.join(__dirname, '..', 'docs', 'screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
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

  // 1. Hero Showcase (Initial Top)
  console.log('Capturing Hero Section...');
  await page.screenshot({ path: path.join(outputDir, '01-hero-showcase.png') });

  // 1b. Hero Scrolled (Verify sticky navbar smoothly covers 24h box during scroll)
  console.log('Capturing Hero Section Scrolled (testing 24h box under navbar)...');
  await page.evaluate(() => window.scrollBy(0, 140));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '01b-hero-scrolled.png') });
  await page.evaluate(() => window.scrollTo(0, 0));

  // Helper to hide sticky header for clean section photography
  await page.evaluate(() => {
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';
  });

  // 2. Services Section
  console.log('Capturing Services Section...');
  const servicesEl = await page.$('#services');
  if (servicesEl) {
    await servicesEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await servicesEl.screenshot({ path: path.join(outputDir, '02-services-showcase.png') });
  }

  // 3. Pricing Estimator Section
  console.log('Capturing Pricing Estimator...');
  const estimatorEl = await page.$('#estimator');
  if (estimatorEl) {
    await estimatorEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await estimatorEl.screenshot({ path: path.join(outputDir, '03-pricing-estimator.png') });
  }

  // 4. Multi-Step Booking Funnel
  console.log('Capturing Booking Funnel...');
  const bookingEl = await page.$('#booking');
  if (bookingEl) {
    await bookingEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await bookingEl.screenshot({ path: path.join(outputDir, '04-booking-funnel.png') });
  }

  // 5. Case Studies Section
  console.log('Capturing Case Studies...');
  const casesEl = await page.$('#cases');
  if (casesEl) {
    await casesEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await casesEl.screenshot({ path: path.join(outputDir, '05-clinical-case-studies.png') });
  }

  // 6. Emergency Triage Section
  console.log('Capturing Emergency Triage...');
  const triageEl = await page.$('#emergency');
  if (triageEl) {
    await triageEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await triageEl.screenshot({ path: path.join(outputDir, '06-emergency-triage-guide.png') });
  }

  // 7. Clinic Location Section
  console.log('Capturing Clinic Location...');
  const locationEl = await page.$('#location');
  if (locationEl) {
    await locationEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await locationEl.screenshot({ path: path.join(outputDir, '07-clinic-location.png') });
  }

  console.log('Screenshots successfully re-captured with pristine layout!');
  await browser.close();
}

capture().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
