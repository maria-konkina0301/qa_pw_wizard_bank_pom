import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customersTab = page.getByRole('button', { name: 'Customers' });
    this.tableRows = page.locator('table tbody tr');
    this.searchCustomerInput = page.locator('input[ng-model="searchCustomer"]');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickCustomersTab() {
    await this.customersTab.click();
  }

  async deleteCustomerByName(customerName) {
    const row = this.tableRows.filter({ hasText: customerName });
    await row.getByRole('button', { name: 'Delete' }).click();
  }

  async searchCustomer(text) {
    await this.searchCustomerInput.fill(text);
  }
}
