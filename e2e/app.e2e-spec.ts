import { HackerspaceDisplayPage } from './app.po';

describe('hackerspace-display App', function() {
  let page: HackerspaceDisplayPage;

  beforeEach(() => {
    page = new HackerspaceDisplayPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('HD works!');
  });
});
