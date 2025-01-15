import { test, expect, request } from "@playwright/test";
import { POManager } from "../pageobjects_ts/POManager";
import { APiUtil } from "../utils/APiUtil";

const productList = JSON.parse(
  JSON.stringify(require("../utils/productList.json"))
);
const dataPayload = JSON.parse(
  JSON.stringify(require("../utils/loginData.json"))
);

const requestPayload = JSON.parse(
  JSON.stringify(require("../utils/requestData.json"))
);

const checkboxOption = requestPayload.productCategory;

let token;
test.beforeAll(async () => {
  const payload = dataPayload[0];
  const apiContext = await request.newContext();
  const apiUtil = new APiUtil(apiContext, payload);
  token = await apiUtil.getToken();
});

for (const products of productList) {
  test(`Search Product ${products.item}`, async ({ page }) => {
    const poManager = new POManager(page);
    await page.addInitScript((value) => {
      window.localStorage.setItem("token", value);
    }, token);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    const homePage = poManager.getHomePage();
    await homePage.searchProduct(products.item);
  });

  test(`Filter Price ${products.item}`, async ({ page }) => {
    const poManager = new POManager(page);
    await page.addInitScript((value) => {
      window.localStorage.setItem("token", value);
    }, token);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    const homePage = poManager.getHomePage();
    await homePage.filterPrice(products.item, products.price, products.minPrice, products.maxPrice);
  });
}
  test(`Filter Category`, async ({ page }) => {
    const poManager = new POManager(page);
    await page.addInitScript((value) => {
      window.localStorage.setItem("token", value);
    }, token);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    const apiContext = await request.newContext();
    const apiUtil = new APiUtil(apiContext, requestPayload);
    const productCategory = await apiUtil.filterCategory(token);
    const compareArrays = checkboxOption.every((element, index) => element === productCategory[index]);
    expect(compareArrays).toBeTruthy();
  });