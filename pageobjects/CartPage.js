const {test, expect} = require('@playwright/test');
class CartPage {
    constructor(page, productName){
        this.cartItems = page.locator("div li");
        this.checkoutButton = page.locator("text=Checkout");
        this.countryDropdown = page.locator("[placeholder*='Country']");
        this.dropdownResults = page.locator(".ta-results");
        this.emailText = page.locator(".user__name [type='text']"); 
        this.placeOrderButton = page.locator(".action__submit");
        this.orderText = page.locator(`h3:has-text('${productName}')`)
    }

    async checkout(){
        await this.cartItems.first().waitFor();
        const bool = await this.orderText.isVisible();
        expect(bool).toBeTruthy();
        await this.checkoutButton.click();
    }

    async placeOrder(username){
        await this.countryDropdown.pressSequentially("ind");
        await this.dropdownResults.waitFor();
        const optionsCount = await this.dropdownResults.locator("button").count();
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