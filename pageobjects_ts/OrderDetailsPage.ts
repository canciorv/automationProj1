import { type Page, type Locator, expect } from "@playwright/test";

export class OrderDetailsPage {
    page: Page;
    orderIdElement: Locator;
    productNameElement: Locator;
    productPriceElement: Locator;
    tableRow: Locator;

    constructor(page){
        this.page = page;
        this.orderIdElement = page.locator('.-main').nth(0);
        this.productNameElement = page.locator('.title').nth(0);
        this.productPriceElement = page.locator('.price').nth(0);
        this.tableRow = page.locator("tr.ng-star-inserted");
    }

    async viewOrderDetails(matchingIndex){
        await this.tableRow.nth(matchingIndex).locator('[tabindex="0"]').click();
    }
    
    async verifyOrderDetails(orderId: string, productName: string, productPrice: string){
        await expect(this.orderIdElement).toContainText(orderId);
        await expect(this.productNameElement).toContainText(productName);
        await expect(this.productPriceElement).toContainText(productPrice);
    }
}

module.exports = { OrderDetailsPage };