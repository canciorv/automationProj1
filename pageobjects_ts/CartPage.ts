 import { type Page, type Locator, expect } from "@playwright/test";

export class CartPage {
    page: Page;
    cartPageButton: Locator;
    checkoutButton: Locator;

    constructor(page){
        this.page = page;
        this.cartPageButton = page.locator(".fa-shopping-cart").first();
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }
    
    async goTo(){
        await this.cartPageButton.click();   
     
    }

    async checkout(){
        await this.checkoutButton.click();
    }



}

module.exports = { CartPage };