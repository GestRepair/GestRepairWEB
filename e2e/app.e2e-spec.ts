import { GestrepairFrontendPage } from './app.po';

describe('gestrepair-frontend App', () => {
  let page: GestrepairFrontendPage;

  beforeEach(() => {
    page = new GestrepairFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
