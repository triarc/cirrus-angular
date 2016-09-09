import {AsyncValidatorFn} from '@angular/forms/src/directives/validators';

export interface IAsyncValidator {
  errorMessage: string;
  errorKey: string;
  validator: AsyncValidatorFn;
}
