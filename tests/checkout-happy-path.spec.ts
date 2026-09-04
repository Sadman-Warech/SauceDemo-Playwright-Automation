import { test, expect, Page } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

import { users } from '../test-data/users';


// Generic login helper
async function loginAsUser(
  page: Page,
  username: string,
  password: string
) {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(username, password);
}


test.describe('Script 1 - Happy Path', () => {

  test('User should complete the checkout successfully', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const overviewPage = new CheckoutOverviewPage(page);
    const completePage = new CheckoutCompletePage(page);


    // 1. LOGIN
    await test.step('User should be logged in with valid credentials', async () => {
      await loginAsUser(
        page,
        users.standard.username,
        users.standard.password
      );

      await expect(page).toHaveURL(/inventory.html/);
    });


// 2. ADD PRODUCT
await test.step(
  'Verify that user can add a product to the cart',
  async () => {

    await inventoryPage.addProduct();

    await expect(
      inventoryPage.getCartBadge()
    ).toHaveText('1');

  }
);


    // 3. VERIFY PRODUCT IS IN CART
    await test.step('Verify product is in the cart', async () => {
      await inventoryPage.openCart();

      await expect(
        cartPage.getProduct('Sauce Labs Backpack')
      ).toBeVisible();

      await expect(
        cartPage.getCartItems()
      ).toHaveCount(1);
    });


    // 4. START CHECKOUT
    await test.step('Start checkout', async () => {
      await cartPage.checkout();

      await expect(page).toHaveURL(/checkout-step-one.html/);
    });


    // 5. FILL CUSTOMER INFORMATION
    await test.step('Verify that user can enter customer information successfully', async () => {
      await checkoutPage.fillFirstName('Sadman');
      await checkoutPage.fillLastName('Test');
      await checkoutPage.fillPostalCode('1207');

      await checkoutPage.continue();

      await expect(page).toHaveURL(/checkout-step-two.html/);
    });


    // 6. VERIFY PRODUCT ON OVERVIEW
    await test.step('Verify product on checkout overview', async () => {
      await expect(
        overviewPage.getProduct('Sauce Labs Backpack')
      ).toBeVisible();
    });


    // 7. VERIFY TOTALS
    await test.step('Verify subtotal amount is correct', async () => {
      await expect(
        overviewPage.getSubtotal()
      ).toHaveText('Item total: $29.99');

      await expect(
        overviewPage.getTax()
      ).toHaveText('Tax: $2.40');

      await expect(
        overviewPage.getTotal()
      ).toHaveText('Total: $32.39');
    });


    // 8. COMPLETE ORDER
    await test.step('Verify that user can successfully Complete the order', async () => {
      await overviewPage.finish();

      await expect(page).toHaveURL(/checkout-complete.html/);
    });


    // 9. VERIFY ORDER CONFIRMATION
    await test.step('Verify order completion confirmation', async () => {
      await expect(
        completePage.getConfirmationMessage()
      ).toBeVisible();

      await expect(
        completePage.getConfirmationMessage()
      ).toHaveText('Thank you for your order!');
    });

  });

});