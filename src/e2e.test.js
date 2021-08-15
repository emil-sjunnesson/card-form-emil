import puppeteer from "puppeteer";

// Note the e2e test is running on the "live" site

describe('Card form e2e', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  it('shows a success message after submitting the form', async () => {
    await page.goto('https://card-form-emil.netlify.app/');
    await page.waitForSelector('#cardNumber');

    await page.click('#cardNumber');
    await page.type('#cardNumber', '4111222233334444');

    // Should format card number
    const cardNumberText = await page.$eval('#cardNumber', (e) => e.value);
    expect(cardNumberText).toContain('4111 2222 3333 4444');

    await page.click('#cardName');
    await page.type('#cardName', 'Per Persson');

    await page.select('#month', '11');

    await page.select('#year', '2022');

    await page.click('#cvv');
    await page.type('#cvv', '123');

    // Opens alert with data
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Form submitted!\n{"cardNumber":"4111 2222 3333 4444","cardName":"Per Persson","month":"11","year":"2022","cvv":"123"}');
      // Added timeout so alert is visible when not in headless mode
      // (should obviously not be used in production)
      await page.waitForTimeout(2000);
      await dialog.dismiss();
    });

    await page.click('button[type=submit]');
  });

  afterAll(() => browser.close());
});
