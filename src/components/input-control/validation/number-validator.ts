import {AbstractControl} from '@angular/forms';
import {IValidator} from './validator';

export class NumberValidator {

  static min(min: number, message?: string): IValidator {
    return {
      errorKey: 'min',
      errorMessage: message || 'validator_min',
      validator: this.minValidator(min)
    };
  }

  static max(max: number, message?: string): IValidator {
    return {
      errorKey: 'max',
      errorMessage: message || 'validator_max',
      validator: this.maxValidator(max)
    };
  }

  static required(message?: string): IValidator {
    return {
      errorKey: 'required',
      errorMessage: message || 'validator_required',
      validator: this.requiredValidator
    };
  }

  private static requiredValidator(control: AbstractControl) {
    if (isNaN(control.value) || control.value === null) {
      return { 'required': true };
    }
    return null;
  }

  private static minValidator(min: number) {
    return (control: AbstractControl) => {
      if (isNaN(control.value) || control.value >= min) {
        return null;
      }
      return { 'min': true };
    };
  }

  private static maxValidator(max: number) {
    return (control: AbstractControl) => {
      if (isNaN(control.value) || control.value <= max) {
        return null;
      }
      return { 'max': true };
    };
  }
}

