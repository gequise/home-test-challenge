import { Locator, Page } from "@playwright/test";
import locators from "../locators/orderPage.json";

export class OrderPage {
  readonly page: Page;
  readonly orderNumberTxt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderNumberTxt = page.locator(locators.orderNumber);
  }

  async urlOrderPage() {
    await this.page.goto("/order");
  }

  async isOrderNumberNotEmpty() {
    await this.orderNumberTxt.isEnabled();
    const orderNumberElement = await this.orderNumberTxt;
    const orderNumberText = await orderNumberElement?.textContent();
    const orderNumberMatch = orderNumberText?.match(/Order Number: (\d+)/);
    const orderNumber = orderNumberMatch?.[1];
    return orderNumber;
  }
}
