import { Locator, Page, expect } from "@playwright/test";
import locators from "../locators/checkoutPage.json";

export class CheckoutPage {
  readonly page: Page;
  readonly fullNameInp: Locator;
  readonly nameCardInp: Locator;
  readonly emailInp: Locator;
  readonly creditCardNumberInp: Locator;
  readonly addressInp: Locator;
  readonly expirationMonthInp: Locator;
  readonly expirationYearInp: Locator;
  readonly cvvInp: Locator;
  readonly cityInp: Locator;
  readonly stateInp: Locator;
  readonly zipInp: Locator;
  readonly shippingAddressChk: Locator;
  readonly continueCheckoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullNameInp = page.locator(locators.fullNameInput);
    this.nameCardInp = page.locator(locators.nameCardInput);
    this.emailInp = page.locator(locators.emailInput);
    this.creditCardNumberInp = page.locator(locators.creditCardNumberInput);
    this.addressInp = page.locator(locators.addressInput);
    this.expirationMonthInp = page.locator(locators.expirationMonthInput);
    this.expirationYearInp = page.locator(locators.expirationYearInput);
    this.cvvInp = page.locator(locators.cvvInput);
    this.cityInp = page.locator(locators.cityInput);
    this.stateInp = page.locator(locators.stateInput);
    this.zipInp = page.locator(locators.zipInput);
    this.shippingAddressChk = page.locator(locators.shippingAddressCheckbox);
    this.continueCheckoutBtn = page.locator(locators.continueCheckoutButton);
  }

  async urlCheckoutPage() {
    await this.page.goto("/checkout");
  }

  async fillInAllFields(
    name: string,
    email: string,
    card: string,
    month: string,
    year: string,
    cvv: string,
    address: string,
    state: string,
    city: string,
    zip: string
  ) {
    await this.fullNameInp.type(name);
    await this.nameCardInp.type(name);
    await this.emailInp.type(email);
    await this.creditCardNumberInp.type(card);
    await this.addressInp.type(address);
    await this.expirationMonthInp.selectOption(month);
    await this.expirationYearInp.type(year);
    await this.cvvInp.type(cvv);
    await this.stateInp.type(state);
    await this.cityInp.type(city);
    await this.zipInp.type(zip);
  }

  async setShippingCheckedAddress(checked: boolean) {
    const isCurrentlyChecked = await this.shippingAddressChk.isChecked();

    if (checked !== isCurrentlyChecked) {
      await this.shippingAddressChk.click();
    }
  }
  async clickOnCheckoutBtn() {
    await this.continueCheckoutBtn.click();
  }

  async assertDialogMessage() {
    this.page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual(locators.dialogMessageText);
      await dialog.accept();
    });
  }
}
