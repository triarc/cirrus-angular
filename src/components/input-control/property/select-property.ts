
import {Property} from './property';
import {IPropertyConfig} from './property-config';
import {ISelectable} from './selectable';

export class SelectProperty<TValue extends ISelectable<TKey>, TKey> extends Property<TValue> {

  constructor(config: IPropertyConfig<TValue>) {
    super(config, 'select');
  }
}
