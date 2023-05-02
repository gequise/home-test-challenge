import { Locator, Page, expect, test } from "@playwright/test";
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
  readonly productPricesVal: Locator;

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
    this.productPricesVal = page.locator(locators.productPricesValue);
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
    await test.step(`As a user, fill in the Full Name field`, async () => {
      await this.fullNameInp.type(name);
    });
    await test.step(`As a user, fill in the Name on Card field`, async () => {
      await this.nameCardInp.type(name);
    });
    await test.step(`As a user, fill in the Email field`, async () => {
      await this.emailInp.type(email);
    });
    await test.step(`As a user, fill in the Credit Card Numberfield`, async () => {
      await this.creditCardNumberInp.type(card);
    });
    await test.step(`As a user, fill in the Address field`, async () => {
      await this.addressInp.type(address);
    });
    await test.step(`As a user, fill in the Expiration Month field`, async () => {
      await this.expirationMonthInp.selectOption(month);
    });
    await test.step(`As a user, fill in the Expiration Year field`, async () => {
      await this.expirationYearInp.type(year);
    });
    await test.step(`As a user, fill in the CVV field`, async () => {
      await this.cvvInp.type(cvv);
    });
    await test.step(`As a user, fill in the State field`, async () => {
      await this.stateInp.type(state);
    });
    await test.step(`As a user, fill in the City field`, async () => {
      await this.cityInp.type(city);
    });
    await test.step(`As a user, fill in the Zip field`, async () => {
      await this.zipInp.type(zip);
    });
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

  async getValueLocator() {
    const elements = await this.productPricesVal.all();
    const values: string[] = [];

    for (let i = 0; i < elements.length; i++) {
      const value = await elements[i].textContent();
      if (value !== null) {
        values.push(value);
      }
    }
    const cleanedValues = values.map((value) => {
      return parseFloat(value.replace("$", ""));
    });

    return cleanedValues;
  }
}
