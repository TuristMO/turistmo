const {device, expect, element, by, waitFor} = require('detox');

describe('App', () => {

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Search button should be visible', async () => {
    await waitFor(element(by.id("searchButton"))).toBeVisible().withTimeout(15000)
  });

  it('Should search for stockholm', async () => {
    await element(by.id("searchField")).typeText("stockholm")
    await element(by.id("searchButton")).tap()
    await waitFor(element(by.id("curatorName")).atIndex(0)).toHaveText("Alissa McCarthy").withTimeout(15000)
  });

});
