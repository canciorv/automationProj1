import { type Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { HomePage } from "./HomePage";
import { ProductDetailsPage } from "./ProductDetailsPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { OrderVerificationPage } from "./OrderVerificationPage";
import { OrderHistoryPage } from "./OrderHistoryPage";
import { ExcelFile } from "./ExcelFile";

export class POManager {
  page: Page;
  loginPage: LoginPage;
  homePage: HomePage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderVerificationPage: OrderVerificationPage;
  orderHistoryPage: OrderHistoryPage;
  excelFile: ExcelFile;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);
    this.productDetailsPage = new ProductDetailsPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.orderVerificationPage = new OrderVerificationPage(this.page);
    this.orderHistoryPage = new OrderHistoryPage(this.page);
    this.excelFile = new ExcelFile(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getHomePage() {
    return this.homePage;
  }

  getProductDetailsPage(){
    return this.productDetailsPage;
  }

  getCartPage(){
    return this.cartPage;
  }

  getCheckoutPage(){
    return this.checkoutPage
  }

  getOrderVerificationPage(){
    return this.orderVerificationPage
  }

  getOrderHistoryPage(){
    return this.orderHistoryPage
  }

  getExcelFile(){
    return this.excelFile
  }
}
module.exports = { POManager };
