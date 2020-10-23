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


  it('Search field should be visible', async () => {
    await waitFor(element(by.id("searchField"))).toBeVisible().withTimeout(15000);
  });

  it('Should search for Stockholm', async () => {
    await element(by.id("searchField")).typeText("Stockholm")
    await element(by.id("searchField")).tapReturnKey()
    await waitFor(element(by.id("curatorName")).atIndex(0)).toHaveText("Alissa McCarthy").withTimeout(20000);
  });
});
