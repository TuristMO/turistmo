import {packages} from "../../../data";
import {PackageSO} from "../../screens/PackageSO";

const {device, expect, element, by, waitFor} = require('detox');
const {getText, getProps} = require('detox-getprops');

describe('App', () => {

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('search should show results', async () => {

        let packageSO = new PackageSO();

        await packageSO.fillSearchField("Stockholm");
        await packageSO.clickSearchButton();

        //const cardItem = await element(by.label("packageTitle")).atIndex(0);
        //console.log("Something: " + cardItem);

        //await sleep(3000);

        //await expect(element(by.id("curatorName")).atIndex(packages.length-1)).toExist();
    });

});