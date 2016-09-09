import {Property } from './property';
import {IPropertyConfig} from './property-config';

export class StringProperty extends Property<string> {
  constructor(config: IPropertyConfig<string>) {
    super(config, 'text');
  }
}
