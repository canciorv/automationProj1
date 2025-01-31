import { type Page, type Locator, expect } from "@playwright/test";

export class OrderVerificationPage {
  private orderId: Locator;
  private productItem: Locator;
  private productPrice: Locator;

  constructor(private page: Page) {
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async verifyProductDetails(productItem, productPrice): Promise<void>{
    this.productItem = this.page.locator(`div.title:has-text('${productItem}')`);
    this.productPrice = this.page.locator(
      `div.title:has-text('${productPrice}')`
    );
    await expect(this.productItem).toContainText(productItem);
    await expect(this.productPrice).toContainText(productPrice);
  }

  async getOrderId(): Promise<string | undefined> {
    const orderIdText = await this.orderId.textContent();
    return orderIdText?.match(/[a-f0-9]{24}/)?.[0];
  }
}

module.exports = { OrderVerificationPage };
