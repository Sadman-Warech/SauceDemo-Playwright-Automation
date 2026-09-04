import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
  private page: Page;
  private subtotal: Locator;
  private tax: Locator;
  private total: Locator;
  private finishButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.subtotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');

    this.finishButton = page.getByRole('button', {
      name: 'Finish'
    });
  }

  getSubtotal() {
    return this.subtotal;
  }

  getTax() {
    return this.tax;
  }

  getTotal() {
    return this.total;
  }

  getProduct(product: string) {
    return this.page.getByText(product, { exact: true });
  }

  async finish() {
    await this.finishButton.click();
  }

  getFinishButton() {
  return this.finishButton;
}
}