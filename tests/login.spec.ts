import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import loginData from "../resources/loginCredentials.json";

test("login", async ({ page }) => {
  {
    const loginPageDev = new LoginPage(page);
    await loginPageDev.goto();
    await loginPageDev.login(
      loginData.valid_username,
      loginData.valid_password
    );
    test.setTimeout(12000);
  }
});
