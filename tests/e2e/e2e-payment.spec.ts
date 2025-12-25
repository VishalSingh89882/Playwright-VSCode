import { test } from '@playwright/test'
import { HomePage } from '../../page-object/HomePage'
import { LoginPage } from '../../page-object/LoginPage'
import { PaymentPage } from '../../page-object/PaymentPage'
import { Navbar } from '../../page-object/components/Navbar'

test.describe('New Payment', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let paymentPage: PaymentPage
  let navbar: Navbar

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    paymentPage = new PaymentPage(page)
    navbar = new Navbar(page)

    await homePage.visit()
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
  })

  test('Should send new payment', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    navbar.clickOnTab('Pay Bills')
    await paymentPage.createPayment()
    await paymentPage.assertSuccessMessage()
  })
})
