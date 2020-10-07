const {device, expect, element, by, waitFor} = require('detox');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('App', () => {

  beforeAll(async ()=>{
    await device.disableSynchronization();
   await device.launchApp({ permissions: { location: 'never' } });
  })

  beforeEach(async () => {
    await device.reloadReactNative();
  });


  it('Search button should be visible', async () => {
    await waitFor(element(by.id("searchButton"))).toBeVisible().withTimeout(15000);
  });

  it('Should search for Stockholm', async () => {
    await element(by.id("searchField")).typeText("Stockholm")
    await element(by.id("searchButton")).tap()
    await waitFor(element(by.id("curatorName")).atIndex(0)).toHaveText("John Doe").withTimeout(20000);
  });

});
