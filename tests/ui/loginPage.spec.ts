import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page_objects/loginPage';

const BASE_URL = 'https://example.com';

test.describe('User Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin(BASE_URL);
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await loginPage.login('validUser', 'validPassword');
    await loginPage.waitForDashboard(BASE_URL);

    const welcomeMessage = await loginPage.getWelcomeMessage();
    expect(welcomeMessage).toContain('Welcome');
  });
});