import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postCode = faker.location.zipCode();

test.beforeEach(async ({ page }) => {

const bankHomePage = new BankHomePage(page);
const addCustomerPage = new AddCustomerPage(page);

  page.on('dialog', dialog => dialog.accept());

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();
  await addCustomerPage.clickAddCustomerTab();
  
  await addCustomerPage.fillCustomerForm(firstName, lastName, postCode);
  await addCustomerPage.clickSubmitButton(); 

  await page.reload();
});
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */


test('Assert manager can delete customer', async ({ page }) => {

const customersListPage = new CustomersListPage(page);

  await customersListPage.clickCustomersTab();

  await expect(customersListPage.tableRows.first()).toBeVisible();

  await customersListPage.deleteCustomerByName(firstName);

  await expect(customersListPage.tableRows.filter({ hasText: firstName })).toHaveCount(0);

  await page.reload();
  await expect(customersListPage.tableRows.filter({ hasText: firstName })).toHaveCount(0);
});
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */

