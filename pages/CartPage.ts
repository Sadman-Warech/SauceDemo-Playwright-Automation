import { Page, Locator } from '@playwright/test';

export class CartPage {
  private page: Page;
  private checkoutButton: Locator;
  private cartItems: Locator;

  constructor(page: Page) {
    this.page = page;

    this.checkoutButton = page.getByRole('button', {
      name: 'Checkout'
    });

    this.cartItems = page.locator('.cart_item');
  }

  getCartItems() {
    return this.cartItems;
  }

  getProduct(product: string) {
    return this.page.getByText(product, { exact: true });
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async removeProduct(product: string) {
    const cartItem = this.page
      .locator('.cart_item')
      .filter({ hasText: product });

    await cartItem
      .getByRole('button', { name: /remove/i })
      .click();
  }
}