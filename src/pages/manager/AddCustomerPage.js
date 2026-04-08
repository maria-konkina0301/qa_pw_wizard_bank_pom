import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;

    this.addCustomerTab = page.getByRole('button', { name: 'Add Customer' }).first();

    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postCodeInput = page.getByPlaceholder('Post Code');

    this.submitButton = page.locator('form button:has-text("Add Customer")');

  }

  async clickAddCustomerTab() {
    await this.addCustomerTab.click();
  }

  async fillCustomerForm(firstName, lastName, postCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
 }
}
