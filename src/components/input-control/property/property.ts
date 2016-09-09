import {FormControl, Validators, AbstractControl} from '@angular/forms';
import {IPropertyConfig} from './property-config';
import {ValidatorFn, AsyncValidatorFn} from '@angular/forms/src/directives/validators';

export interface IProperty {

  name: string;
  displayName: string;
  type: string;
  control: AbstractControl;

  errors: { [key: string]: string };
  valid: boolean;
  touched: boolean;
}

export abstract class Property<TValue> implements IProperty {

  control: AbstractControl;

  protected errorMap: { [key: string]: string } = {};

  constructor(private config: IPropertyConfig<TValue>, public type: string) {

    this.initialize(config);
  }

  public get displayName(): string {
    return this.config.displayName || '';
  }

  private initialize(config: IPropertyConfig<TValue>) {
    const validatorFunctions = new Array<ValidatorFn>();
    if (config.validators) {
      config.validators.forEach(v => {
        validatorFunctions.push(v.validator);
        this.errorMap[v.errorKey] = v.errorMessage;
      });
    }

    const asyncValidatorFunctions = new Array<AsyncValidatorFn>();

    if (config.asyncValidators) {
      config.asyncValidators.forEach(av => {
        asyncValidatorFunctions.push(av.validator);
        this.errorMap[av.errorKey] = av.errorMessage;
      });
    }

    this.control = new FormControl(this.value, Validators.compose(validatorFunctions), Validators.composeAsync(asyncValidatorFunctions));
    this.control.valueChanges.subscribe(value => {
      this.value = value;
    });
  }

  public confirmValue() {
    if (typeof (this.config.confirmValue) === "function") {
      this.config.confirmValue(this.config.getValue());
    }
  }

  get name() {
    return this.config.name;
  }

  get value() {
    return this.config.getValue();
  }

  set value(newValue: TValue) {
    this.config.setValue(newValue);
  }

  get touched() {
    return this.control.touched;
  }

  get valid() {
    return this.control.valid;
  }

  get errors() {
    const result: { [key: string]: string } = {};
    if (this.valid) {
      return result;
    }
    for (let key in this.control.errors) {
      if (this.control.errors.hasOwnProperty(key)) {
        if (this.control.errors[key]) {
          result[key] = this.errorMap[key];
        }
      }
    }
    return result;
  }
}
