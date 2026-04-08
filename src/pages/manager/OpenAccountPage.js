import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.openAccountTab = page.getByRole('button', { name: 'Open Account' });
    this.customerSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async clickOpenAccountTab() {
    await this.openAccountTab.click();
  }

  async selectCustomer(customerName) {
  await this.customerSelect.waitFor({ state: 'visible' });
  await this.customerSelect.selectOption({ label: customerName });
  }

  async selectCurrency(currencyName) {
    await this.currencySelect.selectOption({ label: currencyName });
  }

  async clickProcessButton() {
    await this.processButton.click();
  }
}

