import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
  private page: Page;
  private confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.confirmationMessage = page.getByText(
      'Thank you for your order!',
      { exact: true }
    );
  }

  getConfirmationMessage() {
    return this.confirmationMessage;
  }
}