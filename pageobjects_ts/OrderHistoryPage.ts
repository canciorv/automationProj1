import { type Page, type Locator, expect } from "@playwright/test";

export class OrderHistoryPage {
  page: Page;
  ordersButton: Locator;
  orderIdElement: Locator;
  tableRow: Locator;

  constructor(page) {
    this.page = page;
    this.ordersButton = page
      .locator('[routerlink="/dashboard/myorders"]')
      .first();
    this.orderIdElement = page.locator('tr.ng-star-inserted th[scope="row"]');
    this.tableRow = page.locator("tr.ng-star-inserted");
  }

  async goTo() {
    await this.ordersButton.click();
  }

  async verifyOrder(orderId) {
    await this.page.waitForSelector('tr.ng-star-inserted th[scope="row"]');
    const count = await this.orderIdElement.count();
    let matchingRowIndex: number = 0;

    for (let i = 0; i < count; i++) {
      let index = await this.orderIdElement.nth(i).textContent();
      if (index === orderId) {
        await expect(index).toEqual(orderId);
        matchingRowIndex = i;
        return matchingRowIndex;
      }
    }

    const currentDate = new Date();
    const options: {} = {
      timeZone: "America/New_York",
      weekday: "short",
      month: "short",
      day: "2-digit",
    };
    const estDate = new Intl.DateTimeFormat("en-US", options).format(
      currentDate
    );
    const formattedDate = estDate.replace(",", "");

    const dateCell = await this.tableRow
      .nth(matchingRowIndex)
      .locator("td:nth-child(5)")
      .textContent();
    if (formattedDate === dateCell) {
      await expect(formattedDate).toEqual(dateCell);
    }
  }

  async deleteOrder(matchingIndex){
    await this.tableRow.nth(matchingIndex).locator('.btn-danger').click();
  }
  
  async verifyDeleteOrder(order){
    await expect(this.page.locator(`:has-text("${order}")`).nth(0)).toBeHidden();
  }
}

module.exports = { OrderHistoryPage };
