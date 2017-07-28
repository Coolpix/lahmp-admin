import { LahmpAdminPage } from './app.po';

describe('lahmp-admin App', () => {
  let page: LahmpAdminPage;

  beforeEach(() => {
    page = new LahmpAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
