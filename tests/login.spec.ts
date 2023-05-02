import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import loginData from "../resources/loginCredentials.json";
import messages from "../resources/loginErrorMessages.json";
import { HomePage } from "../pages/home-page";

test.describe("Login tests", () => {
  let loginPageDev: LoginPage;
  let homePageDev: HomePage;

  test.beforeEach(async ({ page }) => {
    await test.step(`I can enter the login Page`, async () => {
      loginPageDev = new LoginPage(page);
      homePageDev = new HomePage(page);
      await loginPageDev.urlLoginPage();
    });
  });

  test("1. Successful Login with Valid Credentials", async () => {
    const username = loginData.valid_username;
    await loginPageDev.login(username, loginData.valid_password);
    await loginPageDev.clickOnSigInBtn();
    await test.step(`On the Home Page the Welcome Text to be visible`, async () => {
      await expect(homePageDev.welcomeText).toBeVisible();
    });
    await test.step(`I can make a successful login with the ${loginData.valid_username} user`, async () => {
      const homeUserName = await homePageDev.getUserNameTxt();
      expect(homeUserName).toEqual(username);
    });
  });

  test("2. Verify the warning message when the username and password fields are invalid", async () => {
    await loginPageDev.login(
      loginData.invalid_username,
      loginData.invalid_password
    );
    await loginPageDev.clickOnSigInBtn();
    await test.step(`I should see an invalid credentials message`, async () => {
      const getMessage = await loginPageDev.getMessageTxt();
      await expect(getMessage).toEqual(messages.wrongCredentials);
    });
  });

  test("3. Verify the warning message when the username and password fields are left blank", async () => {
    await loginPageDev.login();
    await loginPageDev.clickOnSigInBtn();
    await test.step(`I should see an warning message`, async () => {
      const getMessage = await loginPageDev.getMessageTxt();
      await expect(getMessage).toEqual(messages.fieldsEmpty);
    });
  });
});
