import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-object/HomePage'
import {LoginPage} from '../../page-object/LoginPage'

test.describe('Currency Exchnage', () => {
  let homepage: HomePage
  let loginpage: LoginPage
  test.beforeEach(async ({ page }) => {
   homepage = new HomePage(page)
   loginpage = new LoginPage(page)
    
   homepage.visit()
   homepage.clickOnSignIn()
   loginpage.login('username','password')
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

    await page.click('#pc_calculate_costs')
    const CostCalculate = await page.locator('#pc_conversion_amount')
    await expect(CostCalculate).toContainText('800.00 U.S. dollar (USD)')
    
    await page.click('#purchase_cash')


    const message = await page.locator('#alert_content')
    await expect(message).toBeVisible()
    await expect(message).toContainText('Foreign currency cash was successfully purchased.')
  })
})
