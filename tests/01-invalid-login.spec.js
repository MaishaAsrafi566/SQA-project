const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Q1 - Invalid Login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.login(
        'invalid@example.com',
        'WrongPassword123'
    );

    await expect(loginPage.errorMessage).toBeVisible();

    await expect(loginPage.errorMessage).toContainText(
        'Login was unsuccessful. Please correct the errors and try again.'
    );

    await expect(loginPage.errorMessage).toContainText(
    'The credentials provided are incorrect'
);

    await expect(loginPage.loginLink).toBeVisible();

    await expect(page.getByRole('link', {
        name: 'Log out',
        exact: true
    })).toHaveCount(0);

});