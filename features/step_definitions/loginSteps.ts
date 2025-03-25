const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the login page', async function () {
  await this.page.goto('https://example.com/login');
});

Given('the user enters a valid username and password', async function () {
  await this.page.fill('#username', 'validUsername');
  await this.page.fill('#password', 'validPassword'); 
});

When('the user clicks the login button', async function () {
  await this.page.click('#loginButton');
});

Then('the user should be redirected to the dashboard', async function () {
  await this.page.waitForURL('https://example.com/dashboard');
  expect(this.page.url()).toBe('https://example.com/dashboard');
});

Then('a welcome message should be displayed', async function () {
  const welcomeMessage = await this.page.textContent('#welcomeMessage');
  expect(welcomeMessage).toBe('Welcome, validUsername!');
});