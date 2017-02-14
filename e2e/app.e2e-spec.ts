import { DynamiccomponentcompilerPage } from './app.po';

describe('dynamiccomponentcompiler App', function() {
  let page: DynamiccomponentcompilerPage;

  beforeEach(() => {
    page = new DynamiccomponentcompilerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
