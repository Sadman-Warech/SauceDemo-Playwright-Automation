# SauceDemo Playwright Automation

Automated end-to-end testing project for the SauceDemo web application using **Playwright** and **TypeScript**.

The project follows the **Page Object Model (POM)** design pattern to keep page locators, actions, and test scenarios organized and reusable.

---

## Project Overview

This project automates the main SauceDemo shopping and checkout flow and verifies different user behaviors, including:

* User login
* Adding products to the cart
* Opening the shopping cart
* Starting checkout
* Entering customer information
* Checkout field validation
* Checkout overview verification
* Order total verification
* Completing an order
* Order confirmation
* Negative and validation scenarios
* Different SauceDemo user accounts

---

## Technology Stack

* **Playwright**
* **TypeScript**
* **Node.js**
* **Playwright Test**
* **Page Object Model (POM)**

---

## Project Structure

```text
SauceDemo-Playwright-Automation/
│
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── CheckoutOverviewPage.ts
│   └── CheckoutCompletePage.ts
│
├── test-data/
│   └── users.ts
│
├── tests/
│   ├── checkout-happy-path.spec.ts
│   ├── checkout-user-behavior.spec.ts
│   └── negative_path.ts
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

# Test Flow

## 1. Login

Each SauceDemo user is tested independently.

The test navigates to the login page, enters the username and password, and verifies that the user reaches the inventory page.

```text
Login Page
    ↓
Enter Username
    ↓
Enter Password
    ↓
Click Login
    ↓
Verify Inventory Page
```

The test data is maintained separately in:

```text
test-data/users.ts
```

---

## 2. Add Product to Cart

The user selects a product and adds it to the shopping cart.

The test verifies that the cart contains an item.

```text
Inventory Page
    ↓
Add Product
    ↓
Verify Cart Badge
    ↓
Open Cart
```

The test does not depend on a specific product name when performing the generic user behavior flow.

---

## 3. Open Cart and Start Checkout

After adding a product, the user opens the cart.

The test verifies that the cart contains an item and then proceeds to checkout.

```text
Cart
    ↓
Verify Cart Contains Product
    ↓
Click Checkout
    ↓
Checkout Information Page
```

---

## 4. Enter Customer Information

The user enters:

* First Name
* Last Name
* Postal Code

The test then clicks **Continue** and verifies that the checkout process proceeds to the overview page.

```text
First Name
    ↓
Last Name
    ↓
Postal Code
    ↓
Click Continue
    ↓
Checkout Overview
```

---

## 5. Verify Checkout Overview

The checkout overview page is verified to ensure that the selected product is displayed correctly.

---

## 6. Verify Order Totals

The test verifies the calculated:

* Item subtotal
* Tax
* Total amount

This ensures that the order summary displays the expected values.

---

## 7. Verify Finish Button

The Finish button is checked before completing the order.

The test verifies that:

1. The Finish button is visible.
2. The Finish button is enabled.
3. Clicking Finish completes the checkout.

```text
Finish Button Visible
    ↓
Finish Button Enabled
    ↓
Click Finish
    ↓
Checkout Complete Page
```

---

## 8. Verify Order Completion

After clicking Finish, the test verifies that the order confirmation page is displayed.

The confirmation message is also verified.

Expected confirmation:

```text
Thank you for your order!
```

---

# User Behavior Tests

The `checkout-user-behavior.spec.ts` file tests the checkout flow independently for the SauceDemo users.

The users include:

* `standard_user`
* `locked_out_user`
* `problem_user`
* `performance_glitch_user`
* `error_user`
* `visual_user`

Each user is created as a separate Playwright test so that a failure for one user does not prevent the other users from being executed.

---

# Negative and Validation Tests

The `negative_path.ts` file verifies that the application correctly handles invalid or incomplete checkout information.

### Missing First Name

The test submits the checkout form without entering a first name and verifies:

```text
Error: First Name is required
```

### Missing Last Name

The test submits the checkout form without entering a last name and verifies:

```text
Error: Last Name is required
```

### Missing Postal Code

The test submits the checkout form without entering a postal code and verifies:

```text
Postal Code is required
```

### Empty Cart Checkout

The test opens an empty cart and verifies that the user cannot proceed with checkout.

---

# Page Object Model

The project uses the Page Object Model to separate test logic from page-specific locators and actions.

### LoginPage

Handles:

* Opening the login page
* Entering username
* Entering password
* Clicking Login

### InventoryPage

Handles:

* Adding products to the cart
* Opening the cart
* Checking the cart badge

### CartPage

Handles:

* Verifying cart items
* Starting checkout

### CheckoutPage

Handles:

* First name
* Last name
* Postal code
* Continue button
* Validation messages

### CheckoutOverviewPage

Handles:

* Product information
* Subtotal
* Tax
* Total
* Finish button

### CheckoutCompletePage

Handles:

* Order confirmation message

---

# Running the Tests

Install the project dependencies:

```bash
npm install
```

Install Playwright browsers if required:

```bash
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/checkout-user-behavior.spec.ts
```

Run the negative tests:

```bash
npx playwright test tests/negative_path.ts
```

---

# HTML Test Report

After running the tests, generate/view the Playwright HTML report with:

```bash
npx playwright show-report
```

The report provides:

* Passed tests
* Failed tests
* Test steps
* Assertion failures
* Execution details
* Screenshots and traces when configured

The test steps are organized to make it easy to identify which part of the checkout flow passed or failed.

---

# Test Design

The automation follows these principles:

* Page Object Model
* Reusable page actions
* Separate test data
* Independent user tests
* Positive and negative test scenarios
* Assertions for important user actions
* Generic product selection where product identity is not part of the behavior being tested
* Playwright HTML reporting

---

# Expected Result

The automation should verify that users can successfully complete the checkout process when valid information is provided and that the application prevents checkout when required information is missing or invalid.

The project also verifies specific user behaviors and application validation issues encountered during testing.

````

### One thing I would change before you publish

Your README currently says the project has:

```text
checkout-happy-path.spec.ts
checkout-user-behavior.spec.ts
negative_path.ts
````

If you actually still have **four test files**, add the fourth filename to the Project Structure section.

Also, make sure the README matches your **final code**—especially the two users with the Last Name behavior and the exact validation messages. I wouldn't document `error_user` as a Last Name issue unless that is actually what your final test does.

Once you've saved this as `README.md`, you can commit and push it with:

```bash
git add README.md
git commit -m "Add project README"
git push
```

Then your GitHub repository will have the assignment documentation alongside the automation code.
