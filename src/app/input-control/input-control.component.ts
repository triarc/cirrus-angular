import { Component, OnInit } from '@angular/core';
import {PersonVm} from './person.vm';
import moment = require('moment/moment');
import {PersonEditVm} from './person-edit.vm';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-input-control',
  templateUrl: 'input-control.component.html',
  styleUrls: ['input-control.component.css'],
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class InputControlComponent implements OnInit {

  person: PersonEditVm;

  personX: PersonVm;

  constructor() {}

  ngOnInit() {
    this.createDummyPerson();
  }

  createDummyPerson() {
    const person = new PersonVm();
    person.firstName = 'Hans';
    person.lastName = 'Maier';
    person.birthDate = moment([1990, 11, 10]).toDate();
    person.email = 'ml@triarc-labs.com';
    person.limbCount = 4;

    this.personX = person;

    this.person = new PersonEditVm(person);

  }

  reset() {
    this.personX.firstName = 'Hans';
    this.personX.limbCount = 4;
  }
}
