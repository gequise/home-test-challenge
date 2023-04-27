import { test, expect } from "@playwright/test";
import checkoutData from "../resources/checkoutData.json";
import { CheckoutPage } from "../pages/checkout-page";
import {
  getRandomFullNameAndEmail,
  getRandomCityAndState,
} from "../misc/randomData";

test.describe("Checkout tests", () => {
  let checkoutPageDev: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    checkoutPageDev = new CheckoutPage(page);
    await checkoutPageDev.urlCheckoutPage();
  });

  test("Checkout Form Order Success", async () => {
    const [fullName, email] = getRandomFullNameAndEmail();
    const [state, city] = getRandomCityAndState();
    await checkoutPageDev.fillInAllFields(
      fullName,
      email,
      checkoutData.cardNumber,
      checkoutData.expirationMoth,
      checkoutData.expirationYear,
      checkoutData.CVV,
      checkoutData.address,
      state,
      city,
      checkoutData.zipCode
    );
    await checkoutPageDev.setShippingChecked(true);
  });
});
