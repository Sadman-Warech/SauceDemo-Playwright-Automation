import { test, expect, Page } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

import { users } from '../test-data/users';


async function loginAsUser(
  page: Page,
  username: string,
  password: string
) {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(username, password);
}


test.describe('Script 2 - Negative and Validation', () => {


  // TEST 1 - MISSING FIRST NAME

  test('Verify that system should show error when first name is missing', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);


    await test.step('Login as standard user', async () => {

      await loginAsUser(
        page,
        users.standard.username,
        users.standard.password
      );

      await expect(page).toHaveURL(/inventory.html/);

    });


    await test.step(
      'Verify that user can add a product to the cart',
      async () => {

        await inventoryPage.addProduct();

        await expect(
          inventoryPage.getCartBadge()
        ).toHaveText('1');

        await inventoryPage.openCart();

        await expect(
          cartPage.getCartItems()
        ).toHaveCount(1);

        await cartPage.checkout();

        await expect(
          page
        ).toHaveURL(/checkout-step-one.html/);

      }
    );


    await test.step(
      'Verify user cannot proceed without first name',
      async () => {

        await checkoutPage.fillLastName('Test');
        await checkoutPage.fillPostalCode('1207');

        await checkoutPage.continue();

        await expect(
          checkoutPage.getErrorMessage()
        ).toHaveText(
          'Error: First Name is required'
        );

      }
    );

  });


  // TEST 2 - MISSING LAST NAME

  test('Verify that system should show error when last name is missing', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);


    await test.step('Login as standard user', async () => {

      await loginAsUser(
        page,
        users.standard.username,
        users.standard.password
      );

      await expect(page).toHaveURL(/inventory.html/);

    });


    await test.step(
      'Verify that user can add a product to the cart',
      async () => {

        await inventoryPage.addProduct();

        await expect(
          inventoryPage.getCartBadge()
        ).toHaveText('1');

        await inventoryPage.openCart();

        await expect(
          cartPage.getCartItems()
        ).toHaveCount(1);

        await cartPage.checkout();

        await expect(
          page
        ).toHaveURL(/checkout-step-one.html/);

      }
    );


    await test.step(
      'Verify user cannot proceed without last name',
      async () => {

        await checkoutPage.fillFirstName('Sadman');
        await checkoutPage.fillPostalCode('1207');

        await checkoutPage.continue();

        await expect(
          checkoutPage.getErrorMessage()
        ).toHaveText(
          'Error: Last Name is required'
        );

      }
    );

  });


  // TEST 3 - MISSING POSTAL CODE

  test('Verify that system should show error when postal code is missing', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);


    await test.step('Login as standard user', async () => {

      await loginAsUser(
        page,
        users.standard.username,
        users.standard.password
      );

      await expect(page).toHaveURL(/inventory.html/);

    });


    await test.step(
      'Verify that user can add a product to the cart',
      async () => {

        await inventoryPage.addProduct();

        await expect(
          inventoryPage.getCartBadge()
        ).toHaveText('1');

        await inventoryPage.openCart();

        await expect(
          cartPage.getCartItems()
        ).toHaveCount(1);

        await cartPage.checkout();

        await expect(
          page
        ).toHaveURL(/checkout-step-one.html/);

      }
    );


    await test.step(
      'Verify user cannot proceed without postal code',
      async () => {

        await checkoutPage.fillFirstName('Sadman');
        await checkoutPage.fillLastName('Test');

        await checkoutPage.continue();

        await expect(
          checkoutPage.getErrorMessage()
        ).toContainText(
          'Postal Code is required'
        );

      }
    );

  });


  // TEST 4 - EMPTY CART

  test(
    'Verify that system should prevent checkout with an empty cart',
    async ({ page }) => {

      const inventoryPage = new InventoryPage(page);
      const cartPage = new CartPage(page);


      await test.step('Login as standard user', async () => {

        await loginAsUser(
          page,
          users.standard.username,
          users.standard.password
        );

        await expect(page).toHaveURL(/inventory.html/);

      });


      await test.step('Verify that user can open an empty cart', async () => {

        await inventoryPage.openCart();

        await expect(
          page
        ).toHaveURL(/cart.html/);

        await expect(
          cartPage.getCartItems()
        ).toHaveCount(0);

      });


      await test.step(
        'Verify user cannot proceed to checkout with an empty cart',
        async () => {

          await cartPage.checkout();

          await expect(
            page
          ).toHaveURL(/cart.html/);

        }
      );

    }
  );

});
