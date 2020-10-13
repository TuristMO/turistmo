import {packages} from "../../../data";

const {device, expect, element, by, waitFor} = require('detox');

describe('App', () => {

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('Search field should be visible', async () => {
        await waitFor(element(by.id("searchField"))).toBeVisible().withTimeout(15000);
    });

    it('Empty search should show results with all packages of mockdata', async () => {
        await waitFor(element(by.id("searchField"))).typeText("stockholm").withTimeout(15000);
        await waitFor(element(by.id("searchButton"))).tap().withTimeout(15000);
        let cardItem = await waitFor(element(by.id("resultItem"))).getAttribute("accessibilityLabel").withTimeout(15000);
        console.log(cardItem);

        //await expect(element(by.id("curatorName")).atIndex(packages.length-1)).toExist();

    });

});