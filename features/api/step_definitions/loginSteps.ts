const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the login page', async function () {
  await this.page.goto('https://example.com/login');
});

Given('the user enters a valid username and password', async function () {
  await this.page.fill('input[name="username"]', 'validUser');
  await this.page.fill('input[name="password"]', 'validPassword');
});

Given('the user enters an invalid username and password', async function () {
  await this.page.fill('input[name="username"]', 'invalidUser');
  await this.page.fill('input[name="password"]', 'invalidPassword');
});

Given('the user leaves the username and password fields empty', async function () {
  await this.page.fill('input[name="username"]', '');
  await this.page.fill('input[name="password"]', '');
});

When('the user clicks the login button', async function () {
  await this.page.click('button[type="submit"]');
});

Then('the user should be redirected to the dashboard', async function () {
  await this.page.waitForURL('https://example.com/dashboard');
});

Then('a welcome message should be displayed', async function () {
  const welcomeMessage = await this.page.textContent('.welcome-message');
  expect(welcomeMessage).toContain('Welcome');
});

Then('an error message should be displayed', async function () {
  const errorMessage = await this.page.textContent('.error-message');
  expect(errorMessage).toBeTruthy();
});