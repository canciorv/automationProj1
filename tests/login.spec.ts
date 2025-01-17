import { test, expect } from "@playwright/test";
import { POManager } from "../pageobjects_ts/POManager";

const dataSet = JSON.parse(JSON.stringify(require("../utils/loginData.json")));

for (const data of dataSet) {
  test(`Login ${data.userEmail}`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    const email: string = data.userEmail;
    const password: string = data.userPassword;
    await loginPage.userLogin(email, password);
  });
}
