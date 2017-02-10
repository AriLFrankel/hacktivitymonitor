import { browser, element, by } from 'protractor'

export class HackerspaceDisplayPage {
  navigateTo() {
    return browser.get('/')
  }

  getParagraphText() {
    return element(by.css('hd-root h1')).getText()
  }
}
