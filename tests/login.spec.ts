import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import loginData from "../resources/loginCredentials.json";
import messages from "../resources/loginErrorMessages.json";
import { HomePage } from "../pages/home-page";

test.describe("login tests", () => {
  let loginPageDev: LoginPage;
  let homePageDev: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPageDev = new LoginPage(page);
    homePageDev = new HomePage(page);
    await loginPageDev.urlLoginPage();
  });

  test("Successful Login with Valid Credentials", async () => {
    await loginPageDev.login(
      loginData.valid_username,
      loginData.valid_password
    );
    await expect(homePageDev.welcomeText).toBeVisible();
    await expect(homePageDev.usernameField).toHaveText(
      loginData.valid_username
    );
  });

  test("Verify the warning message when the username and password fields are invalid", async () => {
    await loginPageDev.login(
      loginData.invalid_username,
      loginData.invalid_password
    );
    await expect(loginPageDev.messageText).toHaveText(
      messages.wrongCredentials
    );
  });

  test("Verify the warning message when the username and password fields are left blank", async () => {
    await loginPageDev.login(loginData.blank_data, loginData.blank_data);
    await expect(loginPageDev.messageText).toHaveText(messages.fieldsEmpty);
  });
});
