import { type Page, type Locator, expect } from "@playwright/test";

export class CheckoutPage {
    page: Page;
    selectCountryField: Locator;
    results: Locator;
    placeOrderButton: Locator;


    constructor(page){
        this.page = page;
        this.selectCountryField = page.locator('[placeholder="Select Country"]');
        this.results = page.locator('.ta-results').first();
        this.placeOrderButton = page.locator('.action__submit ');

    }

    async selectCountry(){
        await this.selectCountryField.pressSequentially('phi');
        await this.results.click();
    }
    
    async placeOrder(){
        await this.placeOrderButton.click();
    }


}

module.exports = { CheckoutPage };