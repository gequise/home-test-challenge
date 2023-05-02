import { Locator, Page } from "@playwright/test";
import locators from "../locators/gridPage.json";

export class GridPage {
  readonly page: Page;
  readonly itemName: Locator;
  readonly itemPrice: Locator;
  readonly itemCardNumber: Locator;
  readonly itemImg: Locator;
  readonly menuDiv: Locator;
  readonly addOrderBtn: Locator;
  readonly cardNumberItem: Locator;
  readonly srcAttribute: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemName = page.locator(locators.itemName);
    this.itemPrice = page.locator(locators.itemPrice);
    this.itemCardNumber = page.locator(locators.itemNumber);
    this.itemImg = page.locator(locators.itemImage);
    this.addOrderBtn = page.locator(locators.addOrderButton);
    this.cardNumberItem = page.locator(locators.itemNumber);
    this.srcAttribute = page.locator(locators.srcAttribute);
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

  async getImageItem() {
    return await this.itemImg.all();
  }

  async getAddOrderBtn() {
    return await this.addOrderBtn.allInnerTexts();
  }

  async getCardNumberItem() {
    return await this.cardNumberItem.all();
  }
}
