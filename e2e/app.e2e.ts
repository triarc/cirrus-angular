import { Angular2commonPage } from './app.po';

describe('angular2common App', function() {
  let page: Angular2commonPage;

  beforeEach(() => {
    page = new Angular2commonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('angular2common works!');
  });
});
