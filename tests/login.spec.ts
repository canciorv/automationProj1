import { test } from "@playwright/test";
import { POManager } from "../pageobjects_ts/POManager";

interface LoginData {
  userEmail: string;
  userPassword: string;
}

const loginData: LoginData[] = require("../utils/loginData.json");

for (const data of loginData) {
  test(`Login ${data.userEmail}`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    const email: string = data.userEmail;
    const password: string = data.userPassword;
    await loginPage.userLogin(email, password);
  });
}
