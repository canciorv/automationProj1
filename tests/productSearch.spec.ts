import { test, expect, request } from "@playwright/test";
import { POManager } from "../pageobjects_ts/POManager";
import { APiUtil } from "../utils/APiUtil";

const productList = JSON.parse(
  JSON.stringify(require("../utils/productList.json"))
);
const dataPayload = JSON.parse(
  JSON.stringify(require("../utils/loginData.json"))
);

let token;
test.beforeAll(async () => {
  const payload = dataPayload[0];
  const apiContext = await request.newContext();
  const apiUtil = new APiUtil(apiContext, payload);
  token = await apiUtil.getToken();
});

for (const products of productList) {
  test(`Search Product${products.item}`, async ({ page }) => {
    const poManager = new POManager(page);
    await page.addInitScript((value) => {
      window.localStorage.setItem("token", value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client/");
    const homePage = poManager.getHomePage();
    await homePage.searchProduct(products.item);
  });
}
