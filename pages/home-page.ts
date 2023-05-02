import { Locator, Page } from "@playwright/test";
import locators from "../locators/homePage.json";

export class HomePage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly welcomeText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator(locators.usernameField);
    this.welcomeText = page.locator(locators.welcomeText);
  }

  async urlHomePage() {
    await this.page.goto("/home");
  }

  async getUserNameTxt() {
    return await this.usernameField.textContent();
  }
}
