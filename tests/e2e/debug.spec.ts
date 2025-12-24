import { test } from '@playwright/test'

test('debug', async ({ page }) => {
  await page.goto(
    'http://zero.webappsecurity.com/online-banking.html',
    { waitUntil: 'domcontentloaded' }
  )
})
