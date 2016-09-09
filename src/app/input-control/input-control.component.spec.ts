import {
  addProviders
} from '@angular/core/testing';

import {InputControlComponent} from './input-control.component';
beforeEach(() => addProviders([InputControlComponent]));
describe('Component: InputControl', () => {
  it('should create an instance', () => {
    let component = new InputControlComponent();
    expect(component).toBeTruthy();
  });
});

