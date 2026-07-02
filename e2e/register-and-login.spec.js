import { test, expect } from '@playwright/test'

test('Register new acoount', async ({ page }) => {
  const testPassword = "abcdefg1";
  
  const randomNumber = Math.floor(Math.random() * (100 - 10 + 1)) + 10
  const testUsername = `testuser${randomNumber}@gmail.com`;
  const testFullName = `Test User ${randomNumber}`;

  await page.goto('/');
  await page.locator('.cookie-btn-accept').click();
  
  // Go to register page with the button "Create Account"
  await page.locator('.header-btn-register').click();

  await page.locator('#inputUsername').fill(testUsername);
  await page.locator('#inputFullName').fill(testFullName);
  await page.locator('#inputPassword').fill(testPassword);
  await page.locator('#submitButton').click();

  await page.waitForSelector('#loginUsername', {timeout: 10000});

  await page.locator('#loginUsername').fill(testUsername);
  await page.locator('#loginPassword').fill(testPassword);
  await page.locator('#loginSubmit').click();

  await page.waitForSelector('.featured-section', {timeout: 10000})
  
  // go to setting with click on avatar
  await page.locator('.header-btn-avatar').click()

  await page.waitForSelector('.settings-page', {timeout: 10000})

  await expect(page.locator('.settings-page')).toBeVisible()
})
