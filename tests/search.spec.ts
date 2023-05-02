import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/search-page";
import { getRandomWord } from "../misc/randomData";

test.describe("Search tests", () => {
  let searchPageDev: SearchPage;

  test.beforeEach(async ({ page }) => {
    searchPageDev = new SearchPage(page);

    await searchPageDev.urlSearchPage();
  });

  test("9. Search Success.", async () => {
    const word = getRandomWord();
    await searchPageDev.clickSearch(word);
    const resultTxt = await searchPageDev.getResultText();
    expect(resultTxt).toEqual(`Found one result for ${word}`);
  });

  test("10. Search Empty", async () => {
    await searchPageDev.clickSearch();
    const resultTxt = await searchPageDev.getResultTextNotFound();
    expect(resultTxt).toEqual(`Please provide a search word.`);
  });
});
