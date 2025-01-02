const {test, expect} = require('@playwright/test');

class OrderConfirmationPage {
    constructor(page){
        this.primaryText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async validateOrderId(orderConfirmationText){
        await expect(this.primaryText).toHaveText(orderConfirmationText);
        const orderId = await this.orderId.textContent();
        const extractedString = orderId.match(/[a-f0-9]{24}/)[0];
        return extractedString;
    }

}
module.exports = {OrderConfirmationPage};