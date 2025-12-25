import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-object/HomePage'
import { LoginPage } from '../../page-object/LoginPage'

test.describe('Filter Transactions', () => {
  let loginpage: LoginPage
  let homepage:  HomePage
  test.beforeEach(async ({ page }) => {
    loginpage = new LoginPage(page)
    homepage = new HomePage(page)

    await homepage.visit()
    await homepage.clickOnSignIn()
    await loginpage.login('username','password')
  })

  test('Verify the results for each account', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    await page.click('#account_activity_tab')
    await page.selectOption('#aa_accountId', '2')
    const checkingAccount = await page.locator('#all_transactions_for_account tbody tr')
    await expect(checkingAccount).toHaveCount(3)

    await page.selectOption('#aa_accountId', '4')
    const loanAccount = await page.locator('#all_transactions_for_account tbody tr')
    await expect(loanAccount).toHaveCount(2)

    await page.selectOption('#aa_accountId', '6')
    const noResults = await page.locator('.well')
    await expect(noResults).toBeVisible()
  })
})
