export class Angular2commonPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angular2common-app h1')).getText();
  }
}
