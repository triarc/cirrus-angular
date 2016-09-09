import {IValidator} from './../validation/validator';
import {IAsyncValidator} from './../validation/async-validator';

export interface IPropertyConfig<TValue> {
  name: string;
  displayName?: string;
  getValue: () => TValue;
  setValue: (value: TValue) => void;
  confirmValue?: (value: TValue) => void;
  validators?: IValidator[];
  asyncValidators?: IAsyncValidator[];
}
