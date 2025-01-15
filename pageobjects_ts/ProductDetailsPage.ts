import { type Page, type Locator, expect } from "@playwright/test";

export class ProductDetailsPage {
    page: Page;
    productTitle: Locator;
    addToCartButton: Locator;
    viewButton: Locator;

    constructor(page){
        this.page = page;
        this.productTitle = page.locator("h2");
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.viewButton = page.locator('css=button:has-text("View")');
    }
    
    async goTo(){
        await this.viewButton.click();
      }

    async validateDetails(productItem: string){
        await expect(this.productTitle).toHaveText(productItem);
    }

    async addToCart(){
        await this.addToCartButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { ProductDetailsPage };