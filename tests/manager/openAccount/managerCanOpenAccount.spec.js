import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postCode;
let fullName;

test.beforeEach(async ({ page }) => {

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();
  fullName = `${firstName} ${lastName}`;

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
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */

test('Assert manager can open account for new customer', async ({ page }) => {

const openAccountPage = new OpenAccountPage(page);
const customersListPage = new CustomersListPage(page);

  await openAccountPage.clickOpenAccountTab();
  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency('Dollar');

  await openAccountPage.clickProcessButton();
  await customersListPage.clickCustomersTab();
  
const row = page.locator('table tbody tr').filter({ hasText: lastName });
  
  try {
    await expect(row).toBeVisible({ timeout: 5000 });
  } catch (e) {
    await page.reload();
    await page.waitForLoadState('networkidle');
  }

  await expect(row).toBeVisible({ timeout: 10000 });
  
const accountNumberCell = row.locator('td').nth(3);
  await expect(accountNumberCell).toContainText(/\d+/);
});


  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */


  
