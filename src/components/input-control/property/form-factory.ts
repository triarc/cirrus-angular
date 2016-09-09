import {FormGroup} from '@angular/forms';

import {IProperty} from './property';
import {AbstractControl} from '@angular/forms';

export const createForm =
  (properties: IProperty[]) => {

    const propertyMap = properties.reduce<{ [key: string]: AbstractControl }>((map, item) => {
      map[item.name] = item.control;
      return map;
    }, {});

    return new FormGroup(propertyMap);
  };
