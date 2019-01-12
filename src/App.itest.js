const puppeteer = require('puppeteer');
const program = require('commander');

program
  .version('1.0.0')
  .option(
    '-s, --site <URL>',
    'Site to run against, default https://madliberationgame.com'
  )
  .option('-L, --slow', 'Run headfully in slow mode')
  .parse(process.argv);
const slowDown = 200;
const timeoutMs = 80 + (program.slow ? slowDown + 2000 : 0);
const defaultUrl = 'https://madliberationgame.com';
const site = program.site || defaultUrl;
const browserOptions = {
  headless: program.slow ? false : true,
  args: ['--no-sandbox']
};
if (program.slow) {
  browserOptions.slowMo = slowDown;
}

const failTest = async (err, msg, browser) => {
  console.log('test failed: ' + msg);
  console.log(err);
  await browser.close();
  process.exit(1);
};

(async () => {
  const browser = await puppeteer.launch(browserOptions);
  const page = await browser.newPage();
  const waitForXPathOptions = { timeout: timeoutMs };
  await page.goto(site);

  // Home Page
  await page
    .waitForXPath('//*[text()="Start a seder"]', waitForXPathOptions)
    .catch(async e => {
      failTest(e, 'Start a seder button not found', browser);
    });
  await page
    .waitForXPath('//*[text()="Join a seder"]', waitForXPathOptions)
    .catch(async e => {
      failTest(e, 'Join a seder button not found', browser);
    });

  // Start a Seder Page

  await browser.close();
})();
