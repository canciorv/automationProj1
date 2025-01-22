import { type Page, type Locator, expect } from "@playwright/test";

export class LoginPage {
  page: Page;
  email: Locator;
  password: Locator;
  loginButton: Locator;
  toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator("#login");
    this.email = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.toastMessage = page.locator("#toast-container");
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async userLogin(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
    const response = await this.page.waitForResponse((response) =>
      response.url().includes("/api/ecom/auth/login")
    );
    if (response.status() !== 200) {
      await expect(this.toastMessage).toContainText(
        "Incorrect email or password."
      );
    }
  }

  async localStorageIsEmpty() {
    const isEmpty = await this.page.evaluate(() => {
      return localStorage.length === 0;
    });
    await expect(isEmpty).toBe(true);
  }
}
module.exports = { LoginPage };
