import { type Page, type Locator, expect } from "@playwright/test";

export class OrderHistoryPage {
  page: Page;
  ordersButton: Locator;

  constructor(page) {
    this.page = page;
    this.ordersButton = page.locator('[routerlink="/dashboard/myorders"]').first();
  }

  async goTo() {
    await this.ordersButton.click();
  }
}

module.exports = { OrderHistoryPage };
