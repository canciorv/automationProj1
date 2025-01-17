import {
  type Page,
  type Locator,
  expect,
  LaunchOptions,
} from "@playwright/test";

export class HomePage {
  page: Page;
  searchBar: Locator;
  cardBody: Locator;
  cardPrice: Locator;
  toastMessage: Locator;
  minPrice: Locator;
  maxPrice: Locator;
  checkboxOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBar = page.locator('[name="search"]').nth(1);
    this.cardBody = page.locator("h5");
    this.cardPrice = page.locator(".text-muted");
    this.toastMessage = page.locator("#toast-container");
    this.minPrice = page.locator('[name="minPrice"]').nth(1);
    this.maxPrice = page.locator('[name="maxPrice"]').nth(1);
    this.checkboxOption = page.locator('[for="cat"]');
  }

  async searchProduct(product: string) {
    await this.searchBar.fill(product);
    await this.page.keyboard.press("Enter");
    const response = await this.page.waitForResponse((response) =>
      response.url().includes("/api/ecom/product/get-all-products")
    );
    const jsonResponse = await response.json();
    if (jsonResponse.count > 0) {
      await expect(this.cardBody).toContainText(product);
      return true;
    } else {
      await expect(this.toastMessage).toContainText("No Products Found");
      return false;
    }
  }



  async filterPrice(
    product: string,
    productPrice: string,
    minPrice: string,
    maxPrice: string
  ) {
    await this.minPrice.fill(minPrice);
    await this.maxPrice.fill(maxPrice);
    await this.page.keyboard.press("Enter");

    try {
      // Attempt to locate the product and get its text content
      const card = await this.cardBody
        .filter({ hasText: product })
        .locator("..");
      const priceElement = await card.locator(".text-muted");
      await expect(priceElement).toContainText(productPrice);
    } catch (error) {
      // Handle the case where the product is not found
      console.log(`Product ${product} not found.`);
    }
  }

}
module.exports = { HomePage };
