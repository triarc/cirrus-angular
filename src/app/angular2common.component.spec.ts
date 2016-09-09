import {addProviders, inject} from '@angular/core/testing';
import {Angular2commonAppComponent} from '../app/angular2common.component';

beforeEach(() => addProviders([Angular2commonAppComponent]));

describe('App: Angular2common', () => {
  it('should create the app',
    inject([Angular2commonAppComponent], (app: Angular2commonAppComponent) => {
      expect(app).toBeTruthy();
    }));

  it('should have as title \'angular2common works!\'',
    inject([Angular2commonAppComponent], (app: Angular2commonAppComponent) => {
      expect(app.title).toEqual('angular2common works!');
    }));
});
