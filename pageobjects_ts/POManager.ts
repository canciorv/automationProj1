import { type Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { HomePage } from "./HomePage";
import { ProductDetailsPage } from "./ProductDetailsPage";
import { CartPage } from "./CartPage";

export class POManager {
  page: Page;
  loginPage: LoginPage;
  homePage: HomePage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);
    this.productDetailsPage = new ProductDetailsPage(this.page);
    this.cartPage = new CartPage(this.page);
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
}
module.exports = { POManager };
