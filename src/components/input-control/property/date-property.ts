import {IPropertyConfig} from './property-config';
import {Property} from './property';

export class DateProperty extends Property<Date> {
  constructor(config: IPropertyConfig<Date>) {
    super(config, 'date');
  }
}
