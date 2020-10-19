import {packages} from "../../../data";
import {PackageSO} from "../../screens/PackageSO";

const {device, expect, element, by, waitFor} = require('detox');
const {getText, getProps} = require('detox-getprops');

describe('TuristMO', () => {

    let packageSO = new PackageSO();

    beforeAll(async ()=>{
        await device.disableSynchronization();
        await device.launchApp({ permissions: { location: 'never' } });
    })

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('1.1 Sökning på stad', async () => {

        await packageSO.fillSearchField("Stockholm");
        await packageSO.clickSearchButton();
        await packageSO.findSearchResultByPackageTitle("Travelling around Stockholm", 0);
        //await packageSO.findSearchResultByPackageTitle("Stockholm Food", 1);
        //await packageSO.waitToHaveTextAtIndexById("packageTitle", "Travelling around Stockholm", 0);
        //await packageSO.waitToHaveTextAtIndexById("packageTitle", "Stockholm Food", 1);

        //await packageSO.fillSearchField("Göteborg");
        //await packageSO.clickSearchButton();
        //await packageSO.findSearchResultByPackageTitle("Göteborg culture", 0);
        //await packageSO.waitToHaveTextAtIndexById("packageTitle", "Göteborg culture ", 0);

        //const cardItem = await element(by.label("packageTitle")).atIndex(0);
        //console.log("Something: " + cardItem);

        //await sleep(3000);

        //await expect(element(by.id("curatorName")).atIndex(packages.length-1)).toExist();
    });

});