import { test, expect } from "@playwright/test";
import { GridPage } from "../pages/grid-page";

test.describe.parallel("Checkout tests", () => {
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
});
