const {device, expect, element, by, waitFor} = require('detox');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('App', () => {

  beforeAll(async ()=>{
    await sleep(15000);
  })

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show the step one message', async () => {
    await expect(element(by.id("stepOne"))).toHaveText("Step One")
  });

  it('Search button should be visible', async () => {
    await expect(element(by.id("searchButton"))).toBeVisible()
  });

  it('Should search for Stockholm', async () => {
    await element(by.id("searchField")).typeText("Stockholm")
    await element(by.id("searchButton")).tap()
    await sleep(10000)
    await expect(element(by.id('curatorName')).atIndex(0)).toHaveText("John Doe")
  });

});
