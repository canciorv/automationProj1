import { type Page, type Locator, expect } from "@playwright/test";

export class ProductDetailsPage {
    private productTitle: Locator;
    private addToCartButton: Locator;
    private viewButton: Locator;

    constructor(private page: Page){
        this.productTitle = page.locator("h2");
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.viewButton = page.locator('css=button:has-text("View")');
    }
    
    async goTo(): Promise<void>{
        await this.viewButton.click();
      }

    async validateDetails(productItem: string): Promise<void>{
        await expect(this.productTitle).toHaveText(productItem);
    }

    async addToCart(): Promise<void>{
        await this.addToCartButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

export default ProductDetailsPage;