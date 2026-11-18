class CartPage {
    constructor(page) {
        this.page = page;

        this.cartHeading = page.getByRole('heading', {
            name: 'Shopping cart',
            exact: true
        });

        this.termsCheckbox = page.locator('#termsofservice');
        this.checkoutButton = page.locator('#checkout');
    }

    productRow(productName) {
        return this.page.locator('tr').filter({
            has: this.page.getByRole('link', {
                name: productName,
                exact: true
            })
        });
    }

    productName(name) {
        return this.productRow(name)
            .locator('a.product-name');
    }

    productQuantity(name) {
        return this.productRow(name)
            .locator('input.qty-input');
    }

    async checkout() {
        await this.termsCheckbox.check();
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };