class SearchPage {
    constructor(page) {
        this.page = page;
        this.searchInput = page.locator('#small-searchterms');

        this.searchButton = page.getByRole('button', {
            name: 'Search',
            exact: true
        });
    }

    async open() {
        await this.page.goto('https://demowebshop.tricentis.com/');
    }

    async search(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    searchResult(productName) {
        return this.page.locator('.product-title').getByRole('link', {
            name: productName,
            exact: true
        });
    }
}

module.exports = { SearchPage };