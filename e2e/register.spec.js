import { test, expect } from '@playwright/test'

test('Register new acoount', async ({ page }) => {
  const testPassword = "abcdefg1";
  const testUsername = "testuser5@gmail.com";
  const testFullName = "Test User";

  await page.goto('/register');
  await page.locator('.cookie-btn-accept').click();

  await page.locator('#inputUsername').fill(testUsername);
  await page.locator('#inputFullName').fill(testFullName);
  await page.locator('#inputPassword').fill(testPassword);
  await page.locator('#submitButton').click()

  await page.waitForSelector('#loginUsername', {timeout: 10000})

  await page.locator('#loginUsername').fill(testUsername);
  await page.locator('#loginPassword').fill(testPassword);
  await page.locator('#loginSubmit').click();

  await page.waitForSelector('.featured-section', {timeout: 10000})
  
  await page.goto('/settings')

  await page.waitForSelector('.settings-page', {timeout: 10000})

  await expect(page.locator('.settings-page')).toBeVisible()
})
