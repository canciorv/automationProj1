import { type Page, type Locator, expect } from "@playwright/test";

export class LoginPage {
  private email: Locator;
  private password: Locator;
  private loginButton: Locator;
  private toastMessage: Locator;

  constructor(private page: Page) {
    this.loginButton = page.locator("#login");
    this.email = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.toastMessage = page.locator("#toast-container");
  }

  async goTo(): Promise<void> {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async userLogin(email: string, password: string): Promise<void> {
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

  async localStorageIsEmpty(): Promise<void> {
    const isEmpty = await this.page.evaluate(() => {
      return localStorage.length === 0;
    });
    await expect(isEmpty).toBe(true);
  }
}

export default LoginPage;
