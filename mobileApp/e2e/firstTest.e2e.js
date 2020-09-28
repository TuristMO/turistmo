describe('App', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });




  it('Search button should be visible', async () => {
    await expect(element(by.id("searchButton"))).toBeVisible()
  });

  it('Should search for Stockholm and find John Doe', async () => {
    await element(by.id("searchField")).typeText("Stockholm")
    await element(by.id("searchButton")).tap()
    await expect(element(by.id('curatorName')).atIndex(0)).toHaveText("John Doe")
  });

});
