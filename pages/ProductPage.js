class ProductPage {
    constructor(page) {
        this.page = page;

        this.booksCategory = page
            .locator('a[href="/books"]').first();

        this.healthBook = page.getByRole('link', {
            name: 'Health Book',
            exact: true
        });

        this.productName = page.locator('h1[itemprop="name"]');

        this.quantity = page.locator('#addtocart_22_EnteredQuantity');

        this.addToCartButton = page.locator('#add-to-cart-button-22');

        this.successMessage = page.locator('p.content').filter({
            hasText: 'The product has been added to your'
        });

        this.cartLink = this.successMessage.locator('a[href="/cart"]');
    }

    async openBooks() {
        await this.booksCategory.click();
    }

    async selectProduct() {
        await this.healthBook.click();
    }

    async addToCart(quantity) {
        await this.quantity.fill(String(quantity));
        await this.addToCartButton.click();
    }

    async openCart() {
        await this.cartLink.click();
    }
}

module.exports = { ProductPage };