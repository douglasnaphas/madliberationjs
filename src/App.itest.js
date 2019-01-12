const puppeteer = require('puppeteer');
if (process.argv.length < 3) {
  process.exit(2);
}
const site = process.argv[2];
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const waitForXPathOptions = { timeout: 40 };
  await page.goto(site);

  await page
    .waitForXPath('//*[text()="Start a sefder"]', waitForXPathOptions)
    .catch(async e => {
      console.log('button not found');
      await browser.close();
      process.exit(4);
    });

  await browser.close();
})();
