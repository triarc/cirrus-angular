import { Component } from '@angular/core';
import {InputControlComponent} from './input-control/input-control.component';

@Component({
  moduleId: module.id,
  selector: 'angular2common-app',
  templateUrl: 'angular2common.component.html',
  styleUrls: ['angular2common.component.css'],
  directives: [InputControlComponent]
})
export class Angular2commonAppComponent {
  title = 'angular2common works!';
}
