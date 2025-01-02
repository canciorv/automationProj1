import {type Page, type Locator} from '@playwright/test';

export class DashboardPage {

    products: Locator;
    productsTest: Locator;
    cart: Locator;
    page: Page;

    constructor(page: Page){
        this.products = page.locator(".card-body");
        this.productsTest = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProductAddCart(productName: string){
        
        const titles: string[]= await this.productsTest.allTextContents();
        console.log(titles);
        const count: number = await this.products.count();
        for(let i =0; i < count; ++i)
        {
        if(await this.products.nth(i).locator("b").textContent() === productName)
        {
            //add to cart
            await this.products.nth(i).locator("text= Add To Cart").click();
            break;
         }
        }

    }

    async navigateToCart(){
        await this.cart.click();
    }

}

module.exports = {DashboardPage};