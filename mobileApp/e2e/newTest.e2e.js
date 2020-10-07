import {packages} from "../data";

const {device, expect, element, by, waitFor} = require('detox');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('App', () => {

    beforeAll(async ()=>{
        await sleep(15000);
        //await device.launchApp({ permissions: { location: 'never' } });
    })

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('Search field should be visible', async () => {
        await expect(element(by.id("searchField"))).toBeVisible();
    });

    it('Empty search should show results with all packages of mockdata', async () => {
        await expect(element(by.id("searchField"))).toBeVisible();
        await element(by.id("searchButton")).tap();
        await expect(element(by.id("curatorName")).atIndex(packages.length-1)).toExist();

        //await expect(element(by.id("curatorName"))).toHaveLength(packages.length);

    });

});