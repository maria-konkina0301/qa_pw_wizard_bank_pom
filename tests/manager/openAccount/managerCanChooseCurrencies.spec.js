import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {

const bankHomePage = new BankHomePage(page);
const openAccountPage = new OpenAccountPage(page);

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();
  
  await openAccountPage.clickOpenAccountTab();

const currencies = ['Dollar', 'Pound', 'Rupee'];

  for (const currency of currencies) {
    await openAccountPage.selectCurrency(currency);
    await expect(openAccountPage.currencySelect).toHaveValue(currency);
  }
  /* 
  Test:
  1. Open the Open account page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
  2. Select currency Dollar
  3. Assert the drop-dwon has value Dollar
  4. Select currency Pound
  5. Assert the drop-dwon has value Pound
  6. Select currency Rupee
  7. Assert the drop-dwon has value Rupee
  */
});

