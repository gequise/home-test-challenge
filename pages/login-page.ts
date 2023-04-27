import { expect, Locator, Page } from "@playwright/test";
import locators from "../locators/loginPage.json";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly messageText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(locators.username);
    this.passwordInput = page.locator(locators.password);
    this.signInButton = page.locator(locators.signInBtn);
    this.messageText = page.locator(locators.messageText);
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(username: string, password: string) {
    await this.usernameInput.type(username);
    await this.passwordInput.type(password);
    await this.signInButton.click();
  }
}
