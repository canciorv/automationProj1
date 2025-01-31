import { type Page, type Locator } from "@playwright/test";

export class CartPage {
  private cartPageButton: Locator;
  private checkoutButton: Locator;

  constructor(page: Page) {
    this.cartPageButton = page.locator(".fa-shopping-cart").first();
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
  }

  async goTo(): Promise<void> {
    await this.cartPageButton.click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}

export default CartPage;
