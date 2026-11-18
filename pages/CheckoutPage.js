class CheckoutPage {
    constructor(page) {
        this.page = page;

        this.country = page.locator('#BillingNewAddress_CountryId');
        this.city = page.locator('#BillingNewAddress_City');
        this.address = page.locator('#BillingNewAddress_Address1');
        this.zip = page.locator('#BillingNewAddress_ZipPostalCode');
        this.phone = page.locator('#BillingNewAddress_PhoneNumber');

        this.billingContinue = page.locator(
            '#billing-buttons-container'
        ).getByRole('button', { name: 'Continue' });

        this.shippingContinue = page.locator(
            '#shipping-buttons-container'
        ).getByRole('button', { name: 'Continue' });

        this.shippingMethodContinue = page.locator(
            '#shipping-method-buttons-container'
        ).getByRole('button', { name: 'Continue' });

        this.paymentMethodContinue = page.locator(
            '#payment-method-buttons-container'
        ).getByRole('button', { name: 'Continue' });

        this.paymentInfoContinue = page.locator(
            '#payment-info-buttons-container'
        ).getByRole('button', { name: 'Continue' });

        this.confirmButton = page.locator(
            '#confirm-order-buttons-container'
        ).getByRole('button', { name: 'Confirm' });

        this.orderSuccess = page.getByText(
            'Your order has been successfully processed!',
            { exact: true }
        );

        this.orderDetails = page.getByRole('link', {
            name: /order details/i
        });
    }

    async fillBillingAddress() {
        await this.country.selectOption({
            label: 'Bangladesh'
        });

        await this.city.fill('Dhaka');
        await this.address.fill('Test Address 123');
        await this.zip.fill('1207');
        await this.phone.fill('01700000000');

        await this.billingContinue.click();
    }

    async completeShipping() {
        await this.shippingContinue.click();

        await this.page.getByRole('radio', {
            name: /Ground/i
        }).check();

        await this.shippingMethodContinue.click();
    }

    async completePayment() {
        await this.page.getByRole('radio', {
            name: /Cash On Delivery/i
        }).check();

        await this.paymentMethodContinue.click();
        await this.paymentInfoContinue.click();
    }

    async confirmOrder() {
        await this.confirmButton.click();
    }

    async viewOrderDetails() {
        await this.orderDetails.click();
    }
}

module.exports = { CheckoutPage };