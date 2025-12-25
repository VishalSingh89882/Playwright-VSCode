import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-object/HomePage'
import { LoginPage } from '../../page-object/LoginPage'

test.describe('Transfer Funds and Make Payments', () => {
   let loginpage: LoginPage
  let homepage:  HomePage
  test.beforeEach(async ({ page }) => {
    loginpage = new LoginPage(page)
    homepage = new HomePage(page)

    await homepage.visit()
    await homepage.clickOnSignIn()
    await loginpage.login('username','password')
  })

  test('Transfer funds', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
   // await page.click('#transfer_funds_tab')
    await page.selectOption('#tf_fromAccountId', '2')
    await page.selectOption('#tf_toAccountId', '3')
    await page.fill('#tf_amount', '500')
    await page.fill('#tf_description', 'Test message')
    await page.click('#btn_submit')

    const boardHeader = await page.locator('h2.board-header')
    await expect(boardHeader).toContainText('Verify')
    await page.click('#btn_submit')

    const message = await page.locator('.alert-success')
    await expect(message).toContainText('You successfully submitted your transaction')
  })
})
