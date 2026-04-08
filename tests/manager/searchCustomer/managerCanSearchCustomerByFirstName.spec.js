import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
const bankHomePage = new BankHomePage(page);
const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  page.on('dialog', dialog => dialog.accept());

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();
  await addCustomerPage.clickAddCustomerTab();
  await addCustomerPage.fillCustomerForm(firstName, lastName, postalCode);
  await addCustomerPage.clickSubmitButton();
});

test('Assert manager can search customer by First Name', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Fill the firstName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
const customersListPage = new CustomersListPage(page);

  await customersListPage.clickCustomersTab();
  await customersListPage.searchCustomer(firstName);

const rows = page.locator('table tbody tr');

  await expect(rows).toHaveCount(1);
  await expect(rows).toContainText(firstName);
});

