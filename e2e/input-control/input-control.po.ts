export class InputControlPage {

  navigateTo() {
    return browser.get('/');
  }

  private parseBool(value : string){
    return value === 'true';
  }

  get firstNameInput(){
    return element(by.css('.e2e-first-name-input'));
  }
  get lastNameInput() {
    return element(by.css('.e2e-last-name-input'));
  }

  updateNameInput(value: string){
    this.firstNameInput.clear();
    this.firstNameInput.sendKeys(value);
  }

  get limbCountInput(){
    return element(by.css('.e2e-limb-count-input'));
  }

  updateLimbCountInput(value: string){
    this.limbCountInput.clear();
    this.limbCountInput.sendKeys(value);
  }

  get firstNameValid(){
    return  element(by.css('.e2e-first-name-validator')).getText().then(htmlValue => {
      return this.parseBool(htmlValue);
    });
  }

  get limbCountValid(){
    return  element(by.css('.e2e-limb-count-validator')).getText().then(htmlValue => {
      return this.parseBool(htmlValue);
    });
  }

  get firstNameModelValue(){
    return element(by.css('.e2e-first-name-model')).getText();
  }
  get lastNameModelValue(){
    return element(by.css('.e2e-last-name-model')).getText();
  }
  get limbCountModelValue(){
    return element(by.css('.e2e-limb-count-model')).getText();
  }

  get formValid(){
    return  element(by.css('.e2e-form-status')).getText().then(htmlValue => {
      return this.parseBool(htmlValue);
    });
  }

  get resetButton(){
    return element(by.css('.e2e-reset-button'));
  }

  getLastNameValue() {
    return this.lastNameInput.getAttribute('value');
  }

  updateLastName(newName: string) {
    this.lastNameInput.clear();
    return this.lastNameInput.sendKeys(newName);
  }

  focusFirstName() {
    return this.firstNameInput.click();
  }
}
