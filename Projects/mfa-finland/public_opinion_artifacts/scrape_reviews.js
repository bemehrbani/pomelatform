const { chromium } = require('playwright');
const fs = require('fs');

const OUT = '/Users/mahdifarimani/Documents/AntiGravity/Pomegroup/Projects/mfa-finland';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ locale: 'en-US' });
  const page = await context.newPage();

  // Step 1: Accept cookies via consent URL
  console.log('1. Accepting cookies...');
  await page.goto('https://consent.google.com/m?continue=https://www.google.com/maps&hl=en&gl=FI', {
    waitUntil: 'domcontentloaded', timeout: 15000
  });
  await page.waitForTimeout(2000);
  
  // Try all consent buttons
  for (const selector of [
    'button:has-text("Hyväksy kaikki")',
    'button:has-text("Accept all")',
    'button:has-text("Reject all")',
    'form[action*="consent"] button',
    'button[aria-label*="Accept"]',
    'button[aria-label*="Hyväksy"]',
  ]) {
    try {
      const btn = page.locator(selector).first();
      if (await btn.isVisible({ timeout: 1000 }).catch(() => false)) {
        console.log(`   Clicking consent: ${selector}`);
        await btn.click();
        await page.waitForTimeout(3000);
        break;
      }
    } catch (e) {}
  }

  // Step 2: Navigate directly to search results URL
  console.log('2. Searching via URL...');
  const searchUrl = 'https://www.google.com/maps/search/Embassy+of+the+Islamic+Republic+of+Iran+Helsinki/';
  await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(6000);

  // Handle any remaining consent
  for (const text of ['Hyväksy kaikki', 'Accept all']) {
    try {
      const btn = page.locator(`button:has-text("${text}")`).first();
      if (await btn.isVisible({ timeout: 1500 }).catch(() => false)) {
        await btn.click();
        await page.waitForTimeout(3000);
      }
    } catch (e) {}
  }

  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${OUT}/debug_v5_1.png` });
  console.log('   Screenshot: debug_v5_1.png');

  // Step 3: Click the place if it appears in search results
  console.log('3. Looking for place listing...');
  try {
    // Click the first result
    const firstResult = page.locator('a.hfpxzc').first();
    if (await firstResult.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log('   Found search result, clicking...');
      await firstResult.click();
      await page.waitForTimeout(5000);
    }
  } catch (e) {
    console.log('   No search result links found');
  }

  await page.screenshot({ path: `${OUT}/debug_v5_2.png` });
  console.log('   Screenshot: debug_v5_2.png');

  // Step 4: Find and click the Reviews tab
  console.log('4. Looking for Reviews tab...');
  const tabs = await page.locator('button[role="tab"]').all();
  console.log(`   Found ${tabs.length} tabs`);
  for (const tab of tabs) {
    const text = await tab.textContent().catch(() => '');
    console.log(`   Tab: "${text.trim()}"`);
    if (/review|arvostel/i.test(text)) {
      await tab.click();
      await page.waitForTimeout(4000);
      console.log('   ✓ Clicked reviews tab');
      break;
    }
  }

  await page.screenshot({ path: `${OUT}/debug_v5_3.png` });
  console.log('   Screenshot: debug_v5_3.png');

  // Step 5: Sort by newest
  console.log('5. Sorting...');
  try {
    const sortBtn = page.locator('button[aria-label*="Sort"], button[aria-label*="Lajittele"]').first();
    if (await sortBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await sortBtn.click();
      await page.waitForTimeout(1500);
      const items = await page.locator('[role="menuitemradio"]').all();
      if (items.length >= 2) {
        await items[1].click();
        await page.waitForTimeout(3000);
        console.log('   ✓ Sorted by newest');
      }
    }
  } catch (e) {}

  // Step 6: Scroll to load all
  console.log('6. Scrolling...');
  for (let i = 0; i < 25; i++) {
    await page.evaluate(() => {
      document.querySelectorAll('.m6QErb').forEach(el => {
        el.scrollTop = el.scrollHeight;
      });
    });
    await page.waitForTimeout(700);
  }

  // Step 7: Expand truncated reviews
  console.log('7. Expanding...');
  const moreButtons = await page.locator('button.w8nwRe').all();
  console.log(`   ${moreButtons.length} "More" buttons`);
  for (const btn of moreButtons) {
    try { await btn.click(); await page.waitForTimeout(200); } catch (e) {}
  }

  await page.screenshot({ path: `${OUT}/debug_v5_final.png` });

  // Step 8: Extract
  console.log('8. Extracting...');
  const data = await page.evaluate(() => {
    const reviews = [];
    document.querySelectorAll('div[data-review-id]').forEach((el, idx) => {
      const id = el.getAttribute('data-review-id');
      const nameEl = el.querySelector('.d4r55');
      const ratingEl = el.querySelector('span[role="img"]');
      const dateEl = el.querySelector('.rsqaWe');
      const textEl = el.querySelector('.wiI7pd');

      const aria = ratingEl ? (ratingEl.getAttribute('aria-label') || '') : '';
      const m = aria.match(/(\d)/);

      reviews.push({
        id: id || `r${idx}`,
        name: nameEl ? nameEl.textContent.trim() : '',
        rating: m ? parseInt(m[1]) : 0,
        date: dateEl ? dateEl.textContent.trim() : '',
        text: textEl ? textEl.textContent.trim() : '',
      });
    });

    const ratingEl = document.querySelector('.fontDisplayLarge');
    return {
      aggregate_rating: ratingEl ? ratingEl.textContent.trim() : 'N/A',
      total_reviews: reviews.length,
      reviews,
    };
  });

  console.log(`\n=== RESULT: ${data.total_reviews} reviews, rating: ${data.aggregate_rating} ===`);
  data.reviews.forEach((r, i) => {
    console.log(`#${i+1} | ${r.name} | ${r.rating}★ | ${r.date} | ${(r.text || '').substring(0, 80)}...`);
  });

  data.scraped_at = new Date().toISOString();
  fs.writeFileSync(`${OUT}/reviews_raw.json`, JSON.stringify(data, null, 2));
  console.log('\n✅ Done');

  await browser.close();
})();
