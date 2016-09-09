import {Property } from './property';
import {IPropertyConfig} from './property-config';

export class NumericProperty extends Property<number> {

  constructor(config: IPropertyConfig<number>) {
    super(config, 'number');

  }
}
