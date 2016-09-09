import {createForm} from "../../components/input-control/property/form-factory";
import {IProperty} from "../../components/input-control/property/property";
import {ThingyVm} from "./thingy.vm";
import {SelectProperty} from "../../components/input-control/property/select-property";
import {StringValidator} from "../../components/input-control/validation/string-validator";
import {StringProperty} from "../../components/input-control/property/string-property";
import {DateValidator} from "../../components/input-control/validation/date-validator";
import {DateProperty} from "../../components/input-control/property/date-property";
import {NumberValidator} from "../../components/input-control/validation/number-validator";
import {NumericProperty} from "../../components/input-control/property/numeric-property";
import {PersonVm} from "./person.vm";
import {FormGroup} from "@angular/forms";

export class PersonEditVm {
  firstName: StringProperty;
  lastName: StringProperty;
  limbCount: NumericProperty;
  birthDay: DateProperty;
  email: StringProperty;
  thingy: SelectProperty<ThingyVm, string>;
  private _tempLastName: string;

  constructor(private person: PersonVm) {
    this.initializeProperties();
  }

  protected initializeProperties() {
    this.firstName = new StringProperty({
      name: 'firstName',
      displayName: 'Firstname*',
      getValue: () => this.person.firstName,
      setValue: value => this.firstNameChanged(value),
      validators: [
        StringValidator.required(),
        StringValidator.minLength(3),
        StringValidator.pattern('[A-Z]{1}[a-z]+')
      ]
    });
    this._tempLastName = this.person.lastName;
    this.lastName = new StringProperty({
      name: 'lastName',
      displayName: 'Lastname*',
      getValue: () => this._tempLastName,
      setValue: value => this._tempLastName = value,
      validators: [
        StringValidator.required()
      ],
      confirmValue: value => this.lastNameChanged(value)
    });

    this.limbCount = new NumericProperty({
      name: 'limbCount',
      displayName: 'Number of Limbs*',
      getValue: () => this.person.limbCount,
      setValue: value => this.limbCountChanged(value),
      validators: [
        NumberValidator.required(),
        NumberValidator.min(0),
        NumberValidator.max(4)
      ]
    });

    this.birthDay = new DateProperty({
      name: 'birthDay',
      displayName: 'Date of Birth*',
      setValue: value => this.birthDateChanged(value),
      getValue: () => this.person.birthDate,
      validators: [
        DateValidator.required()
      ]
    });

    this.email = new StringProperty({
      name: 'email',
      displayName: 'Email*',
      getValue: () => this.person.email,
      setValue: (value) => this.person.email = value,
      validators: [
        StringValidator.required(),
        StringValidator.pattern('^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$')
      ]
    });

    this.thingy = new SelectProperty<ThingyVm, string>({
      name: 'thingy',
      displayName: 'Favourite Thingy',
      getValue: () => this.person.thingy,
      setValue: (value) => console.log(value)
    });

    const properties: IProperty[] = [
      this.firstName,
      this.lastName,
      this.limbCount,
      this.birthDay,
      this.email,
      this.thingy
    ];
    this.formGroup = createForm(properties);
  }

  get valid() {
    return this.formGroup.valid;
  }

  private firstNameChanged(value: string) {
    this.person.firstName = value;
  }

  private limbCountChanged(value: number) {
    this.person.limbCount = value;
  }

  private lastNameChanged(value: string) {
    this.person.lastName = value;
  }

  private birthDateChanged(value: Date) {
    this.person.birthDate = value;
  }

  formGroup: FormGroup;
}
