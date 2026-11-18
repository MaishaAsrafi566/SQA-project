const { test, expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');
const { RegisterPage } = require('../pages/RegisterPage');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');

test('Q2 - Register and Add Product to Cart', async ({ page }) => {

    test.setTimeout(60000);

    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    const firstName = 'Test';
    const lastName = 'Customer';
    const email = `sqa${randomUUID()}@example.com`;
    const password = 'Test@12345';
    const productName = 'Health Book';
    const quantity = 1;

    // Register new customer
    await registerPage.open();

    await registerPage.register(
        firstName,
        lastName,
        email,
        password
    );

    const logoutLink = page.getByRole('link', {
        name: 'Log out',
        exact: true
    });

    await expect(logoutLink).toBeVisible();

    // Logout and login
    await logoutLink.click();

    await loginPage.open();
    await loginPage.login(email, password);

    await expect(logoutLink).toBeVisible();

    await expect(page.getByRole('link', {
        name: email,
        exact: true
    })).toBeVisible();

    // Navigate to product category
    await productPage.openBooks();

    // Select product
    await productPage.selectProduct();

    await expect(productPage.productName)
        .toHaveText(productName);

    // Add product to cart
    await productPage.addToCart(quantity);

    await expect(productPage.successMessage)
        .toBeVisible();

    // Open shopping cart
    await productPage.openCart();

    await expect(cartPage.cartHeading).toBeVisible();

    // Verify product name
    await expect(cartPage.productName(productName))
        .toBeVisible();

    // Verify quantity
    await expect(cartPage.productQuantity(productName))
        .toHaveValue(String(quantity));

});