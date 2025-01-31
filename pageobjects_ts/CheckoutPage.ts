import { type Page, type Locator } from "@playwright/test";

export class CheckoutPage {
  private selectCountryField: Locator;
  private results: Locator;
  private placeOrderButton: Locator;

  constructor(page: Page) {
    this.selectCountryField = page.locator('[placeholder="Select Country"]');
    this.results = page.locator(".ta-results").first();
    this.placeOrderButton = page.locator(".action__submit");
  }

  async selectCountry(): Promise<void> {
    await this.selectCountryField.pressSequentially("phi");
    await this.results.click();
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }
}

export default CheckoutPage;
