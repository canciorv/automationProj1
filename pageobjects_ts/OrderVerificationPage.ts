import { type Page, type Locator, expect } from "@playwright/test";

export class OrderVerificationPage {
  page: Page;
  orderId: Locator;
  productItem: Locator;
  productPrice: Locator;

  constructor(page) {
    this.page = page;
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async verifyProductDetails(productItem, productPrice) {
    this.productItem = this.page.locator(`div.title:has-text('${productItem}')`);
    this.productPrice = this.page.locator(
      `div.title:has-text('${productPrice}')`
    );
    await expect(this.productItem).toContainText(productItem);
    await expect(this.productPrice).toContainText(productPrice);
  }

  async getOrderId() {
    const orderIdText = await this.orderId.textContent();
    if (orderIdText !== null) {
      const extractedString = orderIdText.match(/[a-f0-9]{24}/)?.[0];
      if (extractedString) {
        return extractedString;
      }
    }
  }
}

module.exports = { OrderVerificationPage };
