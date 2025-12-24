import { test, expect } from '@playwright/test'

test.describe.only('Currency Exchnage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.fill('#user_login', 'username')
    await page.fill('#user_password', 'password')
    await page.click('text=Sign in')
  })

  test('Should exchange the currency', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    await page.click('#pay_bills_tab')

    const purchaseCurrency = page.locator('.ui-state-default.ui-corner-top',{ hasText: 'Purchase Foreign Currency' });
    await expect(purchaseCurrency).toBeVisible();
    await purchaseCurrency.click();



    
     // 🔑 WAIT until dropdown is visible
     const currency = page.locator('#pc_currency');
     await expect(currency).toBeVisible();

    // Select currency
     await currency.selectOption({ value: 'NZD' });


    const rate = page.locator('#sp_sell_rate');
    await expect(rate).toContainText('1 dollar (NZD)');
    await expect(rate).toContainText('U.S. dollar (USD)');


    await page.fill('#pc_amount', '800')

    await page.click('#pc_inDollars_true')
    
    await page.click('#purchase_cash')


    const message = await page.locator('#alert_content')
    await expect(message).toBeVisible()
    await expect(message).toContainText('Foreign currency cash was successfully purchased.')
  })
})
