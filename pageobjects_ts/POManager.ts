import { type Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { HomePage } from "./HomePage";
import { ProductDetailsPage } from "./ProductDetailsPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { OrderVerificationPage } from "./OrderVerificationPage";
import { OrderHistoryPage } from "./OrderHistoryPage";
import { ExcelFile } from "./ExcelFile";
import { OrderDetailsPage } from "./OrderDetailsPage";


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
  orderDetailsPage: OrderDetailsPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
    this.productDetailsPage = new ProductDetailsPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.orderVerificationPage = new OrderVerificationPage(page);
    this.orderHistoryPage = new OrderHistoryPage(page);
    this.excelFile = new ExcelFile(page);
    this.orderDetailsPage = new OrderDetailsPage(page);
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

  getOrderDetailsPage(){
    return this.orderDetailsPage
  }
}

export default POManager;
