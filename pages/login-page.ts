import { expect, Locator, Page, test } from "@playwright/test";
import locators from "../locators/loginPage.json";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly messageTxt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(locators.username);
    this.passwordInput = page.locator(locators.password);
    this.signInButton = page.locator(locators.signInBtn);
    this.messageTxt = page.locator(locators.messageText);
  }

  async urlLoginPage() {
    await this.page.goto("/login");
  }

  async login(username: string = "", password: string = "") {
    await test.step(`I can enter a username and password `, async () => {
      await this.usernameInput.type(username);
      await this.passwordInput.type(password);
    });
  }

  async clickOnSigInBtn() {
    await test.step(`I can click on the SigIn button `, async () => {
      await this.signInButton.click();
      await this.page.waitForLoadState("domcontentloaded");
    });
  }

  async getMessageTxt() {
    return await this.messageTxt.textContent();
  }
}
