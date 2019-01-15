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
const timeoutMs = 45000 + (program.slow ? slowDown + 2000 : 0);
const defaultUrl = 'https://madliberationgame.com';
const site = program.site || defaultUrl;
const browserOptions = {
  headless: program.slow ? false : true,
  args: ['--no-sandbox']
};
// if (program.slow) {
browserOptions.slowMo = slowDown;
// }

const failTest = async (err, msg, browser) => {
  console.log('test failed: ' + msg);
  console.log(err);
  await browser.close();
  process.exit(1);
};
const waitForXPathOrFail = async ({
  page,
  xpath,
  waitOptions,
  elementDescription,
  browser
}) => {
  await page.waitForXPath(xpath, waitOptions).catch(async e => {
    failTest(e, 'Failed to find: ' + elementDescription, browser);
  });
};
const waitForSelectorOrFail = async ({
  page,
  selector,
  waitOptions,
  elementDescription,
  browser
}) => {
  await page.waitForSelector(selector, waitOptions).catch(async e => {
    failTest(e, 'Failed to find: ' + elementDescription, browser);
  });
};

(async () => {
  const browser = await puppeteer.launch(browserOptions);
  const page = await browser.newPage();
  const waitOptions = { timeout: timeoutMs /*, visible: true*/ };
  const waitForNavigationOptions = { timeout: timeoutMs };
  const clickOptions = { delay: 200 };
  await page.goto(site);

  // Home Page
  await page
    .waitForXPath('//*[text()="Start a seder"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Start a seder button not found', browser);
    });
  await page
    .waitForXPath('//*[text()="Join a seder"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Join a seder button not found', browser);
    });

  // Pick Your Script Page
  await Promise.all([
    page.click('[madliberationid="start-a-seder-button"]'),
    page.waitForNavigation(waitForNavigationOptions)
  ]).catch(async e => {
    failTest(e, 'Failed to click Start a seder button', browser);
  });
  await page
    .waitForSelector('[madliberationid="pick-your-script-page"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Pick Your Script Page not loaded', browser);
    });

  // About Page from menu button
  // Wait for the menu icon
  await page
    .waitForSelector(
      '[madliberationid="app-bar-menu-icon-button"]',
      waitOptions
    )
    .catch(async e => {
      failTest(e, 'Did not find menu button at top', browser);
    });
  // Click menu icon
  await Promise.all([
    page.click('[madliberationid="app-bar-menu-icon-button"]', clickOptions)
  ]).catch(async e => {
    failTest(e, 'Failed to click app bar menu icon', browser);
  });
  // Wait for menu item for About Page to be visible
  await page
    .waitForSelector('[madliberationid="menu-about-link"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Did not find About link in menu', browser);
    });
  // Click menu item for About Page
  await Promise.all([
    page.click('[madliberationid="menu-about-link"]', clickOptions),
    page.waitForNavigation(waitForNavigationOptions)
  ]).catch(async e => {
    failTest(e, 'Failed to click About link from menu', browser);
  });
  // Confirm the About page is displayed
  await page
    .waitForSelector('[madliberationid="about-page"]', waitOptions)
    .catch(async e => {
      failTest(e, 'About Page not displayed', browser);
    });

  // How to Play Page from menu button
  // Wait for the menu icon
  await page
    .waitForSelector(
      '[madliberationid="app-bar-menu-icon-button"]',
      waitOptions
    )
    .catch(async e => {
      failTest(e, 'Did not find menu button at top', browser);
    });
  // Click menu icon
  await Promise.all([
    page.click('[madliberationid="app-bar-menu-icon-button"]', clickOptions)
  ]).catch(async e => {
    failTest(e, 'Failed to click app bar menu icon', browser);
  });
  // Wait for menu item for How to Play Page to be visible
  await page
    .waitForSelector('[madliberationid="menu-how-to-play-link"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Did not find How to Play link in menu', browser);
    });
  // Click menu item for How to Play Page
  await Promise.all([
    page.waitForNavigation(waitForNavigationOptions),
    page.click('[madliberationid="menu-how-to-play-link"]', clickOptions)
  ]).catch(async e => {
    failTest(e, 'Failed to click How to Play link from menu', browser);
  });
  // Confirm the About page is displayed
  await page
    .waitForSelector('[madliberationid="how-to-play-page"]', waitOptions)
    .catch(async e => {
      failTest(e, 'How to Play Page not displayed', browser);
    });

  // Back to Home Page with menu button
  // Wait for the menu icon
  await page
    .waitForSelector(
      '[madliberationid="app-bar-menu-icon-button"]',
      waitOptions
    )
    .catch(async e => {
      failTest(e, 'Did not find menu button at top', browser);
    });
  // Click menu icon
  await Promise.all([
    page.click('[madliberationid="app-bar-menu-icon-button"]', clickOptions)
  ]).catch(async e => {
    failTest(e, 'Failed to click app bar menu icon', browser);
  });
  // Wait for menu item for Home Page to be visible
  await page
    .waitForSelector('[madliberationid="menu-home-link"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Did not find Home link in menu', browser);
    });
  // Click menu item for Home Page
  await Promise.all([
    page.click('[madliberationid="menu-home-link"]', clickOptions),
    page.waitForNavigation(waitForNavigationOptions)
  ]).catch(async e => {
    failTest(e, 'Failed to click Home link from menu', browser);
  });

  // Click Join a Seder button
  await page
    .waitForSelector('[madliberationid="join-a-seder-button"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Join a seder button not found', browser);
    });
  await Promise.all([
    page.click('[madliberationid="join-a-seder-button"]', clickOptions),
    page.waitForNavigation(waitForNavigationOptions)
  ]).catch(async e => {
    failTest(e, 'Failed to click Join a seder button', browser);
  });
  await page
    .waitForSelector('[madliberationid="enter-room-code-page"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Enter Room Code Page not displayed', browser);
    });

  //menu-about-link
  await browser.close();
})();
