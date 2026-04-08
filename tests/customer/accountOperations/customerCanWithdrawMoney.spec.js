import { test, expect } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Customer should be able to withdraw money', async ({ page }) => {
const loginPage = new CustomerLoginPage(page);
const accountPage = new CustomerAccountPage(page);

  await loginPage.open();
  await loginPage.selectCustomer('Hermoine Granger');
  await loginPage.clickLoginButton();

const initialBalance = Number(await accountPage.balanceValue.innerText());
const withdrawAmount = 1;

  await accountPage.withdraw(withdrawAmount.toString());
  
  await expect(page.getByText('Transaction successful')).toBeVisible();

const expectedBalance = (initialBalance - withdrawAmount).toString();

  await expect(accountPage.balanceValue).toHaveText(expectedBalance);
});







