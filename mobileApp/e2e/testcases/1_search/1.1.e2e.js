import {packages} from "../../../data";

const {device, expect, element, by, waitFor} = require('detox');
const {getText, getProps} = require('detox-getprops');

describe('App', () => {

    beforeEach(async () => {
        await device.reloadReactNative();

        console.log("Before each!!!");
    });

    it('search should show results', async () => {
        await waitFor(element(by.id("searchField"))).toBeVisible().withTimeout(15000);
        await element(by.id("searchField")).typeText("Stockholm");
        await element(by.id("searchButton")).tap();
        await waitFor(element(by.label("resultItem"))).toBeVisible().withTimeout(15000);
        //await waitFor(element(by.id("packageTitle"))).toHaveText("Travelling around Stockholm").withTimeout(15000);
        //const cardItem = await element(by.label("packageTitle")).atIndex(0);
        //console.log("Something: " + cardItem);

        //await sleep(3000);

        //await expect(element(by.id("curatorName")).atIndex(packages.length-1)).toExist();
    });

});