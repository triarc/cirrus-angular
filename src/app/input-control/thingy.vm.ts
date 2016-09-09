import {ISelectable} from '../../components/input-control/property/selectable';
export class ThingyVm implements ISelectable<string> {

  constructor() {

  }

  public get value() {
    return this.id;
  }

  public get label() {
    return this.name;
  }

  id: string;
  name: string;

}
