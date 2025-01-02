import {expect, type Page, type Locator} from '@playwright/test';
export class CartPage {

    cartItems: Locator;
    checkoutButton: Locator;
    countryDropdown: Locator;
    dropdownResults: Locator;
    emailText: Locator;
    placeOrderButton: Locator;
    orderText: Locator;
    page: Page;

    constructor(page: Page, productName){
        this.cartItems = page.locator("div li");
        this.checkoutButton = page.locator("text=Checkout");
        this.countryDropdown = page.locator("[placeholder*='Country']");
        this.dropdownResults = page.locator(".ta-results");
        this.emailText = page.locator(".user__name [type='text']"); 
        this.placeOrderButton = page.locator(".action__submit");
        this.orderText = page.locator("h3:has-text('IPHONE 13 PRO')");
        this.orderText = page.locator(`h3:has-text('${productName}')`);
    }

    async checkout(){
        await this.cartItems.first().waitFor();
        const bool: boolean = await this.orderText.isVisible();
        expect(bool).toBeTruthy();
        await this.checkoutButton.click();
    }

    async placeOrder(username: string){
        await this.countryDropdown.pressSequentially("ind");;
        await this.dropdownResults.waitFor();
        const optionsCount: number = await this.dropdownResults.locator("button").count();
        for(let i =0;i< optionsCount; ++i)
        {
            const text =  await this.dropdownResults.locator("button").nth(i).textContent();
            if(text === " India")
            {
               await this.dropdownResults.locator("button").nth(i).click();
               break;
            }
        }
       await expect(this.emailText.first()).toHaveText(username);
       await this.placeOrderButton.click();
    }
}
module.exports = {CartPage};