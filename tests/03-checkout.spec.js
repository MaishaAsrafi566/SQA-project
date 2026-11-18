const { test, expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');

const { RegisterPage } = require('../pages/RegisterPage');
const { SearchPage } = require('../pages/SearchPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('Q3 - End to End Order Checkout', async ({ page }) => {

    test.setTimeout(120000);

    const registerPage = new RegisterPage(page);
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const email = `sqa${randomUUID()}@example.com`;
    const password = 'Test@12345';

    const productName = 'Health Book';
    const quantity = 2;

    // Create an independent customer
    await registerPage.open();

    await registerPage.register(
        'Test',
        'Customer',
        email,
        password
    );

    await expect(page.getByRole('link', {
        name: 'Log out',
        exact: true
    })).toBeVisible();

    // Search product
    await searchPage.open();
    await searchPage.search(productName);

    // Verify search result
    await expect(
        searchPage.searchResult(productName)
    ).toBeVisible();

    // Open product
    await searchPage.searchResult(productName).click();

    await expect(productPage.productName)
        .toHaveText(productName);

    // Increase quantity and add to cart
const [cartResponse] = await Promise.all([
    page.waitForResponse(response =>
        response.url().includes('/addproducttocart/details/')
        && response.request().method() === 'POST',
        { timeout: 30000 }
    ),
    productPage.addToCart(quantity)
]);

console.log('Cart response:', await cartResponse.text());

expect(cartResponse.ok()).toBeTruthy();

// Verify shopping cart quantity
const shoppingCart = page.getByRole('link', {
    name: /Shopping cart\s*\(2\)/i
});

await expect(shoppingCart).toBeVisible({
    timeout: 15000
});

// Open shopping cart
await shoppingCart.click();

    // Verify cart product and quantity
    await expect(cartPage.productName(productName))
        .toBeVisible();

    await expect(cartPage.productQuantity(productName))
        .toHaveValue(String(quantity));

    // Agree to terms and checkout
    await cartPage.checkout();

    // Complete checkout
    await checkoutPage.fillBillingAddress();
    await checkoutPage.completeShipping();
    await checkoutPage.completePayment();

    // Confirm order
    await checkoutPage.confirmOrder();

    await expect(checkoutPage.orderSuccess)
        .toBeVisible();

    // Attach order confirmation screenshot
    await test.info().attach('Order Confirmation', {
        body: await page.screenshot(),
        contentType: 'image/png'
    });

    // View order details
    await checkoutPage.viewOrderDetails();

    await expect(page).toHaveURL(/orderdetails/i);

    await expect(page.getByRole('link', {
        name: productName,
        exact: true
    })).toBeVisible();

});