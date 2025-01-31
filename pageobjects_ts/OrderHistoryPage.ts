import { type Page, type Locator, expect } from "@playwright/test";

export class OrderHistoryPage {
  private ordersButton: Locator;
  private orderIdElement: Locator;
  private tableRow: Locator;

  constructor(private page: Page) {
    this.ordersButton = page
      .locator('[routerlink="/dashboard/myorders"]')
      .first();
    this.orderIdElement = page.locator('tr.ng-star-inserted th[scope="row"]');
    this.tableRow = page.locator("tr.ng-star-inserted");
  }

  async goTo(): Promise<void> {
    await this.ordersButton.click();
  }

  async verifyOrder(orderId: string): Promise<number | undefined> {
    await this.page.waitForSelector('tr.ng-star-inserted th[scope="row"]');
    const count: number = await this.orderIdElement.count();

    for (let i = 0; i < count; i++) {
      const index: string | null = await this.orderIdElement.nth(i).textContent();
      if (index === orderId) {
        const matchingRowIndex = i;

        const currentDate = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "America/New_York",
          weekday: "short",
          month: "short",
          day: "2-digit",
        };
        const estDate = new Intl.DateTimeFormat("en-US", options).format(currentDate);
        const formattedDate = estDate.replace(",", "");

        const dateCell = await this.tableRow.nth(matchingRowIndex).locator("td:nth-child(5)").textContent();
        if (formattedDate === dateCell) {
          await expect(formattedDate).toEqual(dateCell);
        }

        return matchingRowIndex;
      }
    }

    throw new Error('Order history is empty');
  }

  async deleteOrder(orderId): Promise<void> {
    await this.page
      .getByRole("row", { name: `${orderId}` })
      .locator(".btn-danger")
      .click();
  }

  async verifyDeleteOrder(orderId): Promise<void> {
    await expect(
      this.page.locator(`:has-text("${orderId}")`).nth(8)
    ).toBeHidden();
  }

}

export default OrderHistoryPage;
