import { test, expect } from '@playwright/test';

const BASE_URL = 'https://example.com';

test.describe('User Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'validUser');
    await page.fill('input[name="password"]', 'validPassword');
    await page.click('button[type="submit"]');
    
    await page.waitForURL(`${BASE_URL}/dashboard`);
    const welcomeMessage = await page.textContent('.welcome-message');
    expect(welcomeMessage).toContain('Welcome');
  });

  test('Unsuccessful login with invalid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'invalidUser');
    await page.fill('input[name="password"]', 'invalidPassword');
    await page.click('button[type="submit"]');
    
    const errorMessage = await page.textContent('.error-message');
    expect(errorMessage).toBeTruthy();
  });

  test('Unsuccessful login with empty credentials', async ({ page }) => {
    await page.fill('input[name="username"]', '');
    await page.fill('input[name="password"]', '');
    await page.click('button[type="submit"]');
    
    const errorMessage = await page.textContent('.error-message');
    expect(errorMessage).toBeTruthy();
  });

});