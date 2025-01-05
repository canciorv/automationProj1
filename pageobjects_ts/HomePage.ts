import {type Page, type Locator, expect} from '@playwright/test';

export class HomePage {
    page : Page;
    searchBar: Locator;
    cardBody: Locator;
    toastMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.searchBar = page.locator('[name="search"]').nth(1);
        this.cardBody = page.locator('h5');
        this.toastMessage = page.locator("#toast-container");
    }

    async searchProduct(product: string){
        await this.page.waitForLoadState('networkidle');
        await this.searchBar.fill(product);
        await this.page.keyboard.press('Enter');
        const response = await this.page.waitForResponse(response => 
            response.url().includes('/api/ecom/product/get-all-products')
        );
        const jsonResponse = await response.json();
        if(jsonResponse.count > 0){
            await expect(this.cardBody).toContainText(product);
        } else{
            await expect(this.toastMessage).toContainText("No Products Found");
        }

    }
}
module.exports = {HomePage};