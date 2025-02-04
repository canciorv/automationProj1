import { test, request, Page } from "@playwright/test";
import { POManager } from "../pageobjects_ts/POManager";
import { APiUtil } from "../utils/APiUtil";

export interface LoginData {
  userEmail: string;
  userPassword: string;
}

interface ProductList {
  item: string;
  price: string;
  minPrice: string;
  maxPrice: string;
}

const loginData: LoginData[] = require("../utils/loginData.json");
const productList: ProductList[] = require("../utils/productList.json");

const setupPageWithToken = async (page: Page, token: string): Promise<void> => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
}

const performOrderFlow = async (page: Page, poManager: POManager, product: ProductList, credentials: LoginData): Promise<void> => {
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  const homePage = poManager.getHomePage();
  const productFound = await homePage.searchProduct(product.item);
  if (productFound) {
    const productDetailsPage = poManager.getProductDetailsPage();
    await productDetailsPage.goTo();
    await productDetailsPage.validateDetails(product.item);
    await productDetailsPage.addToCart();
    const myCartPage = poManager.getCartPage();
    await myCartPage.goTo();
    await myCartPage.checkout();
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.selectCountry();
    await checkoutPage.placeOrder();
    const orderVerificationPage = poManager.getOrderVerificationPage();
    await orderVerificationPage.verifyProductDetails(product.item, product.price);
    const orderId: string | undefined = await orderVerificationPage.getOrderId();
    if(orderId){
    const excelFile = poManager.getExcelFile();
    await excelFile.validateCellValue('/Users/2226004/Downloads/automationProjData.xlsx', 'data', orderId);
    await excelFile.validateCellValue('/Users/2226004/Downloads/automationProjData.xlsx', 'data', product.item);
    await excelFile.validateCellValue('/Users/2226004/Downloads/automationProjData.xlsx', 'data', product.price);
    await excelFile.validateCellValue('/Users/2226004/Downloads/automationProjData.xlsx', 'data', credentials.userEmail);
    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.goTo();
    const matchingIndex = await orderHistoryPage.verifyOrder(orderId);
    const orderDetailsPage = poManager.getOrderDetailsPage();
    await orderDetailsPage.viewOrderDetails(matchingIndex);
    await orderDetailsPage.verifyOrderDetails(orderId, product.item, product.price);
    await orderHistoryPage.goTo();
    await orderHistoryPage.deleteOrder(orderId);
    await orderHistoryPage.verifyDeleteOrder(orderId);
    await homePage.logout();
    await loginPage.localStorageIsEmpty();
  } else {
    await page.close();
  }
  }
    
}

for (const credentials of loginData) {
  for (const product of productList) {
    test(`E2E ${credentials.userEmail} ${product.item}`, async ({ page }) => {
      const poManager = new POManager(page);
      const apiContext = await request.newContext();
      const apiUtil = new APiUtil(apiContext, credentials);
      const token = await apiUtil.getToken();
      if (token) {
        await setupPageWithToken(page, token);
        await performOrderFlow(page, poManager, product, credentials);
      } else {
        await page.close();
      }
    });
  }
}