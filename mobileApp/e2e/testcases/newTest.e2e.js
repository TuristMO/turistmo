import {packages} from "../../data";

const {device, expect, element, by, waitFor} = require('detox');

describe('App', () => {

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