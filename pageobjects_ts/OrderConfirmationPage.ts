import {expect, type Page, type Locator} from '@playwright/test';

export class OrderConfirmationPage {

    primaryText: Locator;
    orderId: Locator;
    page: Page;

    constructor(page: Page){
        this.primaryText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async validateOrderId(orderConfirmationText: string){
        await expect(this.primaryText).toHaveText(orderConfirmationText);
        const orderIdElement = await this.orderId.textContent();
        if (orderIdElement !== null) {
            const extractedString = orderIdElement.match(/[a-f0-9]{24}/)?.[0];
            if (extractedString) {
                return extractedString;
            }
        }
    }

}
module.exports = {OrderConfirmationPage};