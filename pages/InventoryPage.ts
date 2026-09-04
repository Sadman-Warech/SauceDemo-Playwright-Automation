import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  private page: Page;
  private cartLink: Locator;
  private cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addProduct() {
  await this.page
    .locator('.inventory_item')
    .first()
    .getByRole('button', { name: /Add to cart/i })
    .click();
}

  getCartBadge() {
    return this.cartBadge;
  }

  async openCart() {
    await this.cartLink.click();
  }
}