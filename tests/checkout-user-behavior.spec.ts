import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

import { users } from '../test-data/users';


for (const [userType, user] of Object.entries(users)) {

  test.describe(`Verify User behavior - ${userType}`, () => {

    test(`${user.username} should complete checkout successfully`, async ({ page }) => {

      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);
      const overviewPage = new CheckoutOverviewPage(page);
      const completePage = new CheckoutCompletePage(page);


      // 1. LOGIN
      await test.step(
        `${user.username} can login successfully`,
        async () => {

          await loginPage.goto();

          await loginPage.login(
            user.username,
            user.password
          );

          await expect(page).toHaveURL(/inventory.html/);

        }
      );



// 2. ADD PRODUCT
await test.step(
  'Verify that user can add a product to cart',
  async () => {

    await inventoryPage.addProduct();

    await expect(
      inventoryPage.getCartBadge()
    ).toHaveText('1');

  }
);


      // 3. VERIFY PRODUCT IN CART
      await test.step(
        'Verify that selected product is displayed on cart',
        async () => {

          await inventoryPage.openCart();

          await expect(
            cartPage.getProduct('Sauce Labs Backpack')
          ).toBeVisible();

        }
      );


      await test.step(
        'Verify that Cart contains the desired product',
        async () => {

          await expect(
            cartPage.getCartItems()
          ).toHaveCount(1);

        }
      );


      // 4. START CHECKOUT
      await test.step(
        'Checkout page opens successfully',
        async () => {

          await cartPage.checkout();

          await expect(page).toHaveURL(
            /checkout-step-one.html/
          );

        }
      );


      // 5. CUSTOMER INFORMATION
      await test.step(
        'Customer information can be entered',
        async () => {

          await checkoutPage.fillFirstName('Sadman');

          await checkoutPage.fillLastName('Test');

          if (
            userType === 'problem' ||
            userType === 'SECOND_USER'
          ) {

            await checkoutPage.fillPostalCode('1207');

            await checkoutPage.continue();

            await expect(
              checkoutPage.getErrorMessage()
            ).toBeVisible();

            await expect(
              checkoutPage.getErrorMessage()
            ).toContainText(
              'Last Name is required'
            );

            return;
          }


          // Normal users
          await checkoutPage.fillPostalCode('1207');

          await checkoutPage.continue();

        }
      );

      if (
        userType === 'problem' ||
        userType === 'SECOND_USER'
      ) {
        return;
      }


      // 6. VERIFY CHECKOUT OVERVIEW
      await test.step(
        'Checkout overview page opens',
        async () => {

          await expect(page).toHaveURL(
            /checkout-step-two.html/
          );

        }
      );


      await test.step(
        'Sauce Labs Backpack is displayed on overview',
        async () => {

          await expect(
            overviewPage.getProduct(
              'Sauce Labs Backpack'
            )
          ).toBeVisible();

        }
      );


      // 7. VERIFY ORDER TOTALS
      await test.step(
        'Subtotal is $29.99',
        async () => {

          await expect(
            overviewPage.getSubtotal()
          ).toHaveText(
            'Item total: $29.99'
          );

        }
      );


      await test.step(
        'Tax is $2.40',
        async () => {

          await expect(
            overviewPage.getTax()
          ).toHaveText(
            'Tax: $2.40'
          );

        }
      );


      await test.step(
        'Total is $32.39',
        async () => {

          await expect(
            overviewPage.getTotal()
          ).toHaveText(
            'Total: $32.39'
          );

        }
      );


      // 8. FINISH BUTTON
      await test.step(
        'Finish button is visible',
        async () => {

          await expect(
            overviewPage.getFinishButton()
          ).toBeVisible();

        }
      );


      await test.step(
        'Finish button is clickable',
        async () => {

          await expect(
            overviewPage.getFinishButton()
          ).toBeEnabled();

        }
      );


      await test.step(
        'Finish button is Functional',
        async () => {

          await overviewPage.finish();

          await expect(page).toHaveURL(
            /checkout-complete.html/
          );

        }
      );


      // 9. VERIFY ORDER COMPLETION
      await test.step(
        'PASS: Order confirmation message is visible',
        async () => {

          await expect(
            completePage.getConfirmationMessage()
          ).toBeVisible();

        }
      );


      await test.step(
        'PASS: Order confirmation says "Thank you for your order!"',
        async () => {

          await expect(
            completePage.getConfirmationMessage()
          ).toHaveText(
            'Thank you for your order!'
          );

        }
      );

    });

  });

}