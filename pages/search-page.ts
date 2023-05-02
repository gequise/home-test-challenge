import { Locator, Page } from "@playwright/test";
import locators from "../locators/searchPage.json";

export class SearchPage {
  readonly page: Page;
  readonly searchInp: Locator;
  readonly resultTxt: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInp = page.locator(locators.searchInput);
    this.resultTxt = page.locator(locators.resultText);
    this.submitBtn = page.locator(locators.submitButton);
  }

  async urlSearchPage() {
    await this.page.goto("/search");
  }

  async clickSearch(word: string = "") {
    await this.searchInp.fill(word);
    await this.submitBtn.click();
  }

  async getResultText() {
    await this.page.waitForResponse((res) => res.status() === 200);
    return this.resultTxt.textContent();
  }

  async getResultTextNotFound() {
    await this.page.waitForResponse((res) => res.status() === 404);
    return this.resultTxt.textContent();
  }
}
