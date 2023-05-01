import { Locator, Page } from "@playwright/test";
import locators from "../locators/gridPage.json";

export class GridPage {
  readonly page: Page;
  readonly itemName: Locator;
  readonly itemPrice: Locator;
  readonly itemCardNumber: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemName = page.locator(locators.itemName);
    this.itemPrice = page.locator(locators.itemPrice);
    this.itemCardNumber = page.locator(locators.itemNumber);
  }

  async urlGridPage() {
    await this.page.goto("/grid");
  }

  async getNameItems() {
    return await this.itemName.allInnerTexts();
  }

  async getPriceItems() {
    return await this.itemPrice.allInnerTexts();
  }
}
