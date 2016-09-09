import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';
import {IValidator} from './validator';

export class DateValidator {

  public static required(message?: string): IValidator {
    return {
      errorKey: 'required',
      errorMessage: message || 'validator_required',
      validator: this.requiredValidator
    };
  }

  public static requiredValidator(control: AbstractControl) {
    if (!DateValidator.isDate(control.value)) {
      return { 'required': true };
    }
    return null;
  }

  public static min(date: Date, message?: string): IValidator {
    return {
      errorKey: 'mindate',
      errorMessage: message || 'validator_mindate',
      validator: this.minValidator(date)
    };
  }

  public static minValidator(date: Date) {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!DateValidator.isDate(value) ||
        moment(value).isAfter(date) ||
        moment(value).isSame(date)) {
        return null;
      }
      return { 'mindate': true };
    };
  }

  public static max(date: Date, message?: string): IValidator {
    return {
      errorKey: 'maxdate',
      errorMessage: message || 'vaidator_maxdate',
      validator: this.maxValidator(date)
    };
  }

  public static maxValidator(date: Date) {
    return (control: AbstractControl) => {
      let value = control.value;
      if (!DateValidator.isDate(value) ||
        moment(value).isBefore(date) ||
        moment(value).isSame(date)) {
        return null;
      }
      return { 'maxdate': true };
    };
  }

  private static isDate(value: any): boolean {
    return Object.prototype.toString.call(value) === '[object Date]' && isFinite(value);
  }
}
