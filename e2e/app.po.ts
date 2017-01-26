import { browser, element, by } from 'protractor';

export class HackerspaceDisplayPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('HD-root h1')).getText();
  }
}
