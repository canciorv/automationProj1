import { test, expect, request } from "@playwright/test";
import { POManager } from "../pageobjects_ts/POManager";
import { APiUtil } from "../utils/APiUtil";

interface LoginData {
  userEmail: string;
  userPassword: string;
}

interface ProductList {
  item: string;
  price: string;
  minPrice: string;
  maxPrice: string;
}

export interface Payload {
  productName: string;
  minPrice: number;
  maxPrice: number;
  productCategory: string[] ;
  productSubCategory: string[] ;
  productFor: string[] ;
}

const productList: ProductList[]  = require("../utils/productList.json");
const dataPayload: LoginData[] = require("../utils/loginData.json");
const requestPayload: Payload = require("../utils/requestData.json");

const checkboxOption: string[] = requestPayload.productCategory;

let token: string;
test.beforeAll(async () => {
  const payload = dataPayload[0];
  const apiContext = await request.newContext();
  const apiUtil = new APiUtil(apiContext, payload);
  token = await apiUtil.getToken();
});

const getToken = async (page)=>{
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
};

for (const products of productList) {
  test(`Search Product ${products.item}`, async ({ page }) => {
    const poManager = new POManager(page);
    await getToken(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    const homePage = poManager.getHomePage();
    await homePage.searchProduct(products.item);
  });

  test(`Filter Price ${products.item}`, async ({ page }) => {
    const poManager = new POManager(page);
    await getToken(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    const homePage = poManager.getHomePage();
    await homePage.filterPrice(products.item, products.price, products.minPrice, products.maxPrice);
  });
}
  test(`Filter Category`, async ({ page }) => {
    const poManager = new POManager(page);
    await getToken(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    const apiContext = await request.newContext();
    const apiUtil = new APiUtil(apiContext, requestPayload);
    const productCategory = await apiUtil.filterCategory(token);
    const compareArrays = checkboxOption.every((element, index) => element === productCategory[index]); // compare the requestData(checkboxOption) productCategory to equal each of the productCategory returned 
    expect(compareArrays).toBeTruthy();
  });