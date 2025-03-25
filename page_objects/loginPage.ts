import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private usernameInput = 'input[name="username"]';
  private passwordInput = 'input[name="password"]';
  private loginButton = 'button[type="submit"]';
  private welcomeMessageSelector = '.welcome-message';

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToLogin(baseURL: string) {
    await this.page.goto(`${baseURL}/login`);
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getWelcomeMessage(): Promise<string | null> {
    return this.page.textContent(this.welcomeMessageSelector);
  }

  async waitForDashboard(baseURL: string) {
    await this.page.waitForURL(`${baseURL}/dashboard`);
  }
}