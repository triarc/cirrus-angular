import {ValidatorFn} from '@angular/forms/src/directives/validators';

export interface IValidator {
  errorMessage: string;
  errorKey: string;
  validator: ValidatorFn;
}
