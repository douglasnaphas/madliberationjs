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
  if (browser) await browser.close();
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
const waitOptions = { timeout: timeoutMs /*, visible: true*/ };
const waitForNavigationOptions = { timeout: timeoutMs };
const clickOptions = { delay: 200 };
const typeOptions = { delay: 90 };
const itWait = async ({ page, madliberationid }) => {
  await page
    .waitForSelector(`[madliberationid="${madliberationid}"]`, waitOptions)
    .catch(async e => {
      failTest(e, `Could not find ${madliberationid}`);
    });
};
const itClick = async ({ page, madliberationid }) => {
  await itWait({ page: page, madliberationid: madliberationid });
  await page
    .click(`[madliberationid="${madliberationid}"]`, clickOptions)
    .catch(async e => {
      failTest(e, `Could not click ${madliberationid}`);
    });
};
const itType = async ({ page, madliberationid, text }) => {
  await itClick({ page: page, madliberationid: madliberationid });
  await page
    .type(`[madliberationid="${madliberationid}"]`, text, typeOptions)
    .catch(async e => {
      failTest(e, `Could not type into ${madliberationid}`);
    });
};
const itNavigate = async ({ page, madliberationid }) => {
  await itWait({ page: page, madliberationid: madliberationid });
  await Promise.all([
    page.click(`[madliberationid="${madliberationid}"]`, clickOptions),
    page.waitForNavigation(waitForNavigationOptions)
  ]).catch(async e => {
    failTest(e, `Could not navigate by clicking on ${madliberationid}`);
  });
};
const itGetText = async ({ page, madliberationid }) => {
  await itWait({ page: page, madliberationid: madliberationid });
  const text = await page
    .$$(`[madliberationid="${madliberationid}"]`)
    .then(a => {
      if (!Array.isArray(a) || a.length < 1) {
        throw new Error(`Could not get text from ${madliberationid}`);
      }
      return a[0].getProperty('textContent');
    })
    .then(textContent => {
      return textContent.jsonValue();
    })
    .catch(async e => {
      failTest(e, `Failed getting text content of ${madliberationid}`);
    });
  return text;
};

(async () => {
  const browser = await puppeteer.launch(browserOptions);
  const page = await browser.newPage();
  await page.goto(site);

  ////////////////////////////////////////////////////////////////////////////////
  // Home Page
  await page
    .waitForXPath('//*[text()="Lead a seder"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Lead a seder button not found', browser);
    });
  await page
    .waitForXPath('//*[text()="Join a seder"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Join a seder button not found', browser);
    });

  // Pick Your Script Page
  await Promise.all([
    page.click('[madliberationid="lead-a-seder-button"]'),
    page.waitForNavigation(waitForNavigationOptions)
  ]).catch(async e => {
    failTest(e, 'Failed to click Lead a seder button', browser);
  });
  ////////////////////////////////////////////////////////////////////////////////
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
  ////////////////////////////////////////////////////////////////////////////////
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
  ////////////////////////////////////////////////////////////////////////////////
  // Confirm the How to Play page is displayed
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
  ////////////////////////////////////////////////////////////////////////////////

  // Lead a seder
  await page
    .waitForSelector('[madliberationid="lead-a-seder-button"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Lead a seder button not found', browser);
    });
  await Promise.all([
    page.click('[madliberationid="lead-a-seder-button"]'),
    page.waitForNavigation(waitForNavigationOptions)
  ]).catch(async e => {
    failTest(e, 'Failed to click Lead a seder button', browser);
  });
  ////////////////////////////////////////////////////////////////////////////////
  await page
    .waitForSelector('[madliberationid="pick-your-script-page"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Pick Your Script Page not loaded', browser);
    });
  // Pick the Practice Script
  const practiceScriptSelector = '[madliberationid="Practice Script"]';
  await page
    .waitForSelector(practiceScriptSelector, waitOptions)
    .catch(async e => {
      failTest(e, 'Could not find Practice Script in scripts table', browser);
    });
  await Promise.all([page.click(practiceScriptSelector)]).catch(async e => {
    failTest(e, 'Failed to select Practice Script', browser);
  });
  await page
    .waitForSelector('[madliberationid="pick-this-script-button"]', waitOptions)
    .catch(async e => {
      failTest(
        e,
        'Could not find Use This One button after picking script',
        browser
      );
    });
  await Promise.all([
    page.click('[madliberationid="pick-this-script-button"]'),
    page.waitForNavigation(waitForNavigationOptions)
  ]).catch(async e => {
    failTest(e, 'Failed to click Use This One button, scripts table', browser);
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Wait for a Room Code to appear
  await itWait({ page: page, madliberationid: 'your-room-code' });
  const roomCode = await itGetText({
    page: page,
    madliberationid: 'your-room-code'
  });
  // Got the Room Code, enter the leader's Game Name
  const leaderName = `ITestLdr ${roomCode}`;
  await itType({
    page: page,
    madliberationid: 'ringleader-game-name-text-field',
    text: leaderName
  });
  // Submit leader Game Name
  await itNavigate({ page: page, madliberationid: 'thats-my-name-button' });

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Add a second player
  const browser2 = await puppeteer.launch(browserOptions);
  const page2 = await browser2.newPage();
  await page2.goto(site);
  // Player 2
  // Click Join a Seder button
  await itNavigate({ page: page2, madliberationid: 'join-a-seder-button' });

  ////////////////////////////////////////////////////////////////////////////////

  await page2
    .waitForSelector('[madliberationid="enter-room-code-page"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Enter Room Code Page not displayed', browser2);
    });
  // Enter Room Code and Game Name
  await page2
    .waitForSelector(
      '[madliberationid="enter-room-code-text-field"]',
      waitOptions
    )
    .catch(async e => {
      failTest(e, 'Could not find Enter Room Code text field');
    });
  await page2
    .waitForSelector('[madliberationid="game-name-text-field"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Could not find Game Name text field');
    });
  await page2
    .waitForSelector('[madliberationid="join-this-seder-button"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Could not find Join button');
    });
  const player2Name = `ITestP2 ${roomCode}`;
  await page2
    .click('[madliberationid="enter-room-code-text-field"]', clickOptions)
    .catch(async e => {
      failTest(e, 'Could not click Enter Room Code text field');
    });
  await page2.type(
    '[madliberationid="enter-room-code-text-field"]',
    roomCode,
    typeOptions
  );
  await page2.click('[madliberationid="game-name-text-field"]', clickOptions);
  await page2.type(
    '[madliberationid="game-name-text-field"]',
    player2Name,
    typeOptions
  );
  await Promise.all([
    page2.click('[madliberationid="join-this-seder-button"]', clickOptions),
    page2.waitForNavigation(waitForNavigationOptions)
  ]).catch(async e => {
    failTest(e, 'Failed to click Join a seder button', browser2);
  });

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Leader checks roster
  // Click No, Check Again so Player 2 shows up on the roster
  await page
    .waitForSelector('[madliberationid="no-check-again-button"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Could not find No Check Again button on roster');
    });
  await Promise.all([
    page.click('[madliberationid="no-check-again-button"]', clickOptions)
  ]).catch(async e => {
    failTest(e, 'Failed to click No Check Again button');
  });
  // Verify both players are on the roster
  await page
    .waitForSelector('[madliberationid="pc0"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Could not find first row in roster');
    });
  await page
    .waitForSelector('[madliberationid="pc1"]', waitOptions)
    .catch(async e => {
      failTest(e, 'Could not find second row in roster');
    });
  const leaderNameFromTable = await page
    .$$('[madliberationid="pc0"]')
    .then(a => {
      if (!Array.isArray(a) || a.length < 1) {
        throw new Error('Could not get array with Participant Cell 0');
      }
      return a[0].getProperty('textContent');
    })
    .then(textContent => {
      return textContent.jsonValue();
    })
    .catch(async e => {
      failTest(e, 'Failed to get text from roster Participant Cell 0');
    });
  if (leaderNameFromTable != leaderName) {
    failTest(
      'wrong name on roster',
      `expected ${leaderName}, got ` + `${leaderNameFromTable}`
    );
  }
  const p2NameFromTable = await page
    .$$('[madliberationid="pc1"]')
    .then(a => {
      if (!Array.isArray(a) || a.length < 1) {
        throw new Error('Could not get array with Participant Cell 1');
      }
      return a[0].getProperty('textContent');
    })
    .then(textContent => {
      return textContent.jsonValue();
    })
    .catch(async e => {
      failTest(e, 'Failed to get text from roster Participant Cell 1');
    });
  if (p2NameFromTable != player2Name) {
    failTest(
      'wrong name on roster',
      `expected ${player2Name}, got ` + `${p2NameFromTable}`
    );
  }
  // Click Thats Everyone
  await page
    .waitForSelector('[madliberationid="thats-everyone-button"]', waitOptions)
    .catch(async e => {
      failTest(e, "Could not find That's Everyone button on roster");
    });
  await Promise.all([
    page.click('[madliberationid="thats-everyone-button"]', clickOptions),
    page.waitForNavigation(waitForNavigationOptions)
  ]).catch(async e => {
    failTest(e, 'Failed to click Thats Everyone button', browser);
  });
  ////////////////////////////////////////////////////////////////////////////////

  // Leader: get assignments, complete them, and submit
  await page
    .waitForSelector(
      '[madliberationid="leader-click-this-button"]',
      waitOptions
    )
    .catch(async e => {
      failTest(e, "Could not find leader's Click This Button");
    });
  await Promise.all([
    page.click('[madliberationid="leader-click-this-button"]', clickOptions),
    page.waitForNavigation(waitForNavigationOptions)
  ]).catch(async e => {
    failTest(e, "Failed to click Leader's Button");
  });
  ////////////////////////////////////////////////////////////////////////////////

  // Make sure we're on the /play page
  await page
    .waitForSelector('[madliberationid="lib-progress"]', waitOptions)
    .catch(async e => {
      failTest(e, 'lib progres did not appear');
    });

  const submitAllLibs = async (page, prefix) => {
    const answers = [];
    const progressText = await page
      .$$('[madliberationid="lib-progress"]')
      .then(a => {
        if (!Array.isArray(a) || a.length < 1) {
          throw new Error(`Could not grab progress text for ${prefix}`);
        }
        return a[0].getProperty('textContent');
      })
      .then(textContent => textContent.jsonValue())
      .catch(async e => {
        failTest(e, `Failed to get text from lib progress for ${prefix}`);
      });
    const progress = progressText.split('/').map(n => parseInt(n.trim()));
    if (progress.length < 2) {
      failTest('/play page', 'did not find X / Y showing lib progress');
    }
    const numLibs = progress[1];
    for (let currentLib = progress[0]; currentLib <= numLibs; currentLib++) {
      // Enter a lib, save it to answers
      const ans = `${prefix}-${currentLib}`;
      await page
        .waitForSelector(
          `[madliberationid="answer-${currentLib - 1}"]`,
          waitOptions
        )
        .catch(async e => {
          failTest(e, `Could not find text box for answer ${currentLib}`);
        });
      await page
        .click(`[madliberationid="answer-${currentLib - 1}"]`, waitOptions)
        .catch(async e => {
          failTest(e, `Failed to click answer box ${currentLib}`);
        });
      await page
        .type(`[madliberationid="answer-${currentLib - 1}"]`, ans, typeOptions)
        .catch(async e => {
          failTest(e, `Failed to enter answer ${ans}`);
        });
      answers.push(ans);
      // If we're on the last lib, submit and return
      if (currentLib === numLibs) {
        await page
          .waitForSelector('[madliberationid="submit-answers"]')
          .catch(async e => {
            failTest(
              e,
              `could not find Submit libs button, prompt ${currentLib}`
            );
          });
        await page
          .click('[madliberationid="submit-answers"]')
          .catch(async e => {
            failTest(e, `failed to click Submit libs, prompt ${currentLib}`);
          });
        await page
          .waitForSelector('[madliberationid="yes-submit-libs-button"]')
          .catch(async e => {
            failTest(
              e,
              `could not find confirm submit button, prompt ${currentLib}`
            );
          });
        await Promise.all([
          page.click('[madliberationid="yes-submit-libs-button"]'),
          page.waitForNavigation(waitForNavigationOptions)
        ]).catch(async e => {
          failTest(e, `failed to confirm submit, prompt ${currentLib}`);
        });
        return answers;
      }
      // Click the Next button
      await page
        .waitForSelector('[madliberationid="next-prompt"]', waitOptions)
        .catch(async e => {
          failTest(e, 'no next prompt button');
        });
      await page
        .click('[madliberationid="next-prompt"]', clickOptions)
        .catch(async e => {
          failTest(e, 'could not click next prompt');
        });
    }
    failTest('/play page', 'never found a Submit Answers button');
  };
  const leaderAnswers = await submitAllLibs(page, 'leader');

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Player 2: get assignments, complete them, and submit
  await page2
    .waitForSelector(
      '[madliberationid="player-click-this-button"]',
      waitOptions
    )
    .catch(async e => {
      failTest(e, "Could not find player's Click This Button");
    });
  await Promise.all([
    page2.click('[madliberationid="player-click-this-button"]', clickOptions),
    page2.waitForNavigation(waitForNavigationOptions)
  ]).catch(async e => {
    failTest(e, "Failed to click Player's Button");
  });
  ////////////////////////////////////////////////////////////////////////////////

  // Make sure we're on the /play page
  await page2
    .waitForSelector('[madliberationid="lib-progress"]', waitOptions)
    .catch(async e => {
      failTest(e, 'lib progres did not appear');
    });
  const p2Answers = await submitAllLibs(page2, 'p2');

  // Confirm player submissions appeared in the script

  // Close browsers
  await browser.close();
  await browser2.close();
})();
