# SQA 19 - Demo Web Shop Automation & API Testing

## Project Overview

This project covers UI automation testing of Demo Web Shop and API automation testing of JSONPlaceholder as part of the SQA 19 Project Assignment.

## Testing URLs

UI: https://demowebshop.tricentis.com/

API: https://jsonplaceholder.typicode.com/users

## Technology Stack

- JavaScript
- Node.js
- Playwright
- Page Object Model (POM)
- Postman
- Newman
- Allure Report
- HTML Report
- Git and GitHub

## Project Setup

Clone the repository:

`git clone https://github.com/MaishaAsrafi566/SQA-project.git`

Navigate to the project:

`cd SQA-project`

Install dependencies:

`npm ci`

Install Playwright browsers:

`npx playwright install`

## UI Automation

### Q1 - Invalid Login

Verify the error message and confirm that the user is not logged in after entering invalid credentials.

Run:

`npx playwright test invalid-login --project=chromium --headed`

### Q2 - Register and Add Product to Cart

Register a new customer, log in, navigate to Books, select Health Book, add it to the cart, and verify product name and quantity.

Run:

`npx playwright test register-cart --project=chromium --headed`

### Q3 - End-to-End Order Checkout

Search for Health Book, verify search results, increase quantity, add to cart, agree to terms, complete checkout, confirm the order, and verify order details.

Run:

`npx playwright test checkout --project=chromium --headed`

### Run All UI Tests Sequentially

`npx playwright test --project=chromium --workers=1`

### UI Reporting

After each UI execution, generate the Allure report:

`npx allure generate allure-results --clean`

Open the Allure report:

`npx allure open`

Open the Playwright HTML report:

`npx playwright show-report`

Screenshots are captured automatically by Playwright.

## API Automation

The Postman collection is available in the api-tests directory.

The GET request validates the status code, response array, and user information. A user ID is extracted and used in the PUT request. The PUT request dynamically updates the name, email, and company name while preserving other user information.

Run the API collection using Newman:

`npx newman run api-tests/SQA19-API.postman_collection.json -r cli,htmlextra,allure --reporter-htmlextra-export api-reports/API-Report.html --reporter-allure-resultsDir api-allure-results`

Generate the API Allure report:

`npx allure generate api-allure-results -o api-allure-report --clean`

Open the API Allure report:

`npx allure open api-allure-report`

API HTML report location:

`api-reports/API-Report.html`

The GET request must execute before PUT because the PUT request uses variables collected from GET.

## Combined Execution

Execute the complete UI suite with one worker, generate the UI Allure report, then execute the Newman API collection and generate the API Allure report using the commands above.

## GitHub Branches

- main
- q1-invalid-login
- q2-register-cart
- q3-end-to-end
- api-automation

Each automation branch is merged into the main branch using Git.

## Repository

https://github.com/MaishaAsrafi566/SQA-project