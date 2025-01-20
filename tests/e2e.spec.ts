import { test, expect, request } from "@playwright/test";
import { POManager } from "../pageobjects_ts/POManager";
import { APiUtil } from "../utils/APiUtil";

const loginData = JSON.parse(
  JSON.stringify(require("../utils/loginData.json"))
);
const productList = JSON.parse(
  JSON.stringify(require("../utils/productList.json"))
);

for (const credentials of loginData) {
  for (const product of productList) {
    test(`E2E ${credentials.userEmail} ${product.item}`, async ({ page }) => {
      const poManager = new POManager(page);
      const payload = credentials;
      console.log(payload);
      const apiContext = await request.newContext();
      const apiUtil = new APiUtil(apiContext, payload);
      const token = await apiUtil.getToken();
      await page.addInitScript((value) => {
        window.localStorage.setItem("token", value);
      }, token);
      if (token !== undefined) {
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
          const orderId: any = await orderVerificationPage.getOrderId();
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
          await orderHistoryPage.deleteOrder(matchingIndex);
          await orderHistoryPage.verifyDeleteOrder(orderId);

        } else {
          page.close();
        }
      } else {
        page.close();
      }
    });
  }
}
