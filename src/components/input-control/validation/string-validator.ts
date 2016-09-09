import {Validators} from '@angular/forms';
import {IValidator} from './validator';

export class StringValidator {

  public static required(message?: string): IValidator {

    return {
      errorMessage: message || 'validator_required',
      errorKey: 'required',
      validator: Validators.required
    };
  }

  public static minLength(minLength: number, message?: string): IValidator {
    return {
      errorMessage: message || 'validator_minLength',
      errorKey: 'minlength',
      validator: Validators.minLength(minLength)
    };
  }

  public static maxLength(maxLength: number, message?: string): IValidator {
    return {
      errorMessage: message || 'validator_maxLength',
      errorKey: 'maxlength',
      validator: Validators.maxLength(maxLength)
    };
  }

  public static pattern(pattern: string, message?: string): IValidator {
    return {
      errorMessage: message || 'validator_pattern',
      errorKey: 'pattern',
      validator: Validators.pattern(pattern)
    };
  }

}
