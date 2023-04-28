import { test, expect } from "@playwright/test";
import checkoutData from "../resources/checkoutData.json";
import { CheckoutPage } from "../pages/checkout-page";
import {
  getRandomFullNameAndEmail,
  getRandomCityAndState,
} from "../misc/randomData";
import { OrderPage } from "../pages/order-page";

test.describe.parallel("Checkout tests", () => {
  let checkoutPageDev: CheckoutPage;
  let orderPageDev: OrderPage;
  const [fullName, email] = getRandomFullNameAndEmail();
  const [state, city] = getRandomCityAndState();

  test.beforeEach(async ({ page }) => {
    checkoutPageDev = new CheckoutPage(page);
    orderPageDev = new OrderPage(page);
    await checkoutPageDev.urlCheckoutPage();
  });

  test("Checkout Form Order Success", async () => {
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
    await checkoutPageDev.setShippingCheckedAddress(true);
    await checkoutPageDev.clickOnCheckoutBtn();
    const isNotEmpty = await orderPageDev.isOrderNumberNotEmpty();
    expect(isNotEmpty).toBeTruthy;
  });

  test("Checkout Form Alert", async () => {
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
    await checkoutPageDev.setShippingCheckedAddress(false);
    await checkoutPageDev.clickOnCheckoutBtn();
    await checkoutPageDev.assertDialogMessage();
    expect(checkoutPageDev.shippingAddressChk).toBeEnabled();
  });
});
