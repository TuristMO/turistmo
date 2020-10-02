const {device, expect, element, by, waitFor} = require('detox');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('App', () => {

  beforeAll(async ()=>{
    await sleep(15000);
   // await device.launchApp({ permissions: { location: 'never' } });
  })

  beforeEach(async () => {
    await device.reloadReactNative();
  });



  it('Search button should be visible', async () => {
    await expect(element(by.id("searchButton"))).toBeVisible()
  });

  it('Should search for Stockholm', async () => {
    await element(by.id("searchField")).typeText("Stockholm")
    await element(by.id("searchButton")).tap()
    await expect(element(by.id("curatorName")).atIndex(0)).toHaveText("John Doe")
  });

});
