
import {InputControlPage} from "./input-control.po";
describe('input-control', () => {

  let page: InputControlPage;

  beforeEach(() => {
    page = new InputControlPage();
    page.navigateTo();
  });


  it('model should update on changes in inputs', () => {

    const nameValue = 'Max';
    const limbValue = '3';
    page.updateLimbCountInput(limbValue);
    page.updateNameInput(nameValue);

    var modelNameValue = page.firstNameModelValue;
    var modelLimbValue = page.limbCountModelValue;

    expect(modelNameValue).toBe(nameValue);
    expect(modelLimbValue).toBe(limbValue);
  });

  it('validators should show on invalid input', () => {

    const invalidName = 'max';
    const invalidLimbCount = '5';

    page.updateLimbCountInput(invalidLimbCount);
    page.updateNameInput(invalidName);

    expect(page.limbCountValid).toBe(false);
    expect(page.firstNameValid).toBe(false);

    expect(page.formValid).toBe(false);

  });

  it('reset button should reset the model and the inputs', () => {

    const ogNameValue = page.firstNameModelValue;
    const ogLimbCountValue = page.limbCountModelValue;

    page.updateLimbCountInput('2');
    page.updateNameInput('Klaus');

    const button = page.resetButton;

    button.click();

    expect(page.firstNameModelValue).toBe(ogNameValue);
    expect(page.limbCountModelValue).toBe(ogLimbCountValue);
    expect(page.limbCountInput.getAttribute('value')).toBe(ogLimbCountValue);
    expect(page.firstNameInput.getAttribute('value')).toBe(ogNameValue);

  });
  it ('should be possible to manipualte an input and only write the value on blur', (done)=> {
    page.getLastNameValue().then(initialValue => {
      let newName = 'Hugo';
      page.updateLastName(newName);
      expect(page.lastNameModelValue).not.toBe(newName);
      page.focusFirstName();
      expect(page.getLastNameValue()).toBe(newName);
      done();
    });
  })
});
