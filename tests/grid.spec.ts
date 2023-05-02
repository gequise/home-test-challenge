import { test, expect } from "@playwright/test";
import { GridPage } from "../pages/grid-page";
import locators from "../locators/gridPage.json";

test.describe("Grid tests", () => {
  let gridPageDev: GridPage;

  test.beforeEach(async ({ page }) => {
    gridPageDev = new GridPage(page);
    await gridPageDev.urlGridPage();
  });

  test("7. Grid Item Test", async () => {
    const getNameItems: string[] = await gridPageDev.getNameItems();
    const getPriceItems: string[] = await gridPageDev.getPriceItems();
    expect(getNameItems[6]).toEqual("Super Pepperoni");
    expect(getPriceItems[6]).toEqual("$10");
  });

  test("8. Grid All Items Test", async () => {
    const getItem = (await gridPageDev.getCardNumberItem()).length;
    for (let i = 0; i < getItem; i++) {
      const getTitleItem = await gridPageDev.getNameItems();
      const titleItem = getTitleItem[i].trim();
      expect(
        titleItem.length > 0,
        `The title "${titleItem}" of the "${i + 1}" item should not be empty`
      ).toBeTruthy();
      const getItemsPrice = await gridPageDev.getPriceItems();
      const priceItem = getItemsPrice[i].trim();
      expect(
        priceItem.length > 0,
        `The price "${priceItem}" of the "${i + 1}" item should not be empty`
      ).toBeTruthy();
      const getAddOrderBtn = await gridPageDev.getAddOrderBtn();
      const addOrderBtnItem = getAddOrderBtn[i].trim();
      expect(
        addOrderBtnItem.length > 0,
        `The "${addOrderBtnItem}" of the "${i + 1}" item should not be empty`
      ).toBeTruthy();
    }
    for (const getImageItem of await gridPageDev.getImageItem()) {
      const srcAttribute = await getImageItem.getAttribute(
        locators.srcAttribute
      );
      if (srcAttribute !== null) {
        expect(
          srcAttribute.length > 0,
          `The "${srcAttribute}" of the item should not be empty`
        ).toBeTruthy();
      }
    }
  });
});
