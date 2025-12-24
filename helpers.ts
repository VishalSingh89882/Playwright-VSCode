import { Page } from '@playwright/test'

export async function loadHomepage(page: Page) {
  await page.goto('https://www.example.com')
}

export async function assertTitle(page: Page) {
  await page.waitForSelector('h5')
}
