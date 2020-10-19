import {PackageSO} from "../../screens/PackageSO";

const {device, expect, element, by, waitFor} = require('detox');
//const {getText, getProps} = require('detox-getprops');

describe('TuristMO', () => {

    let packageSO = new PackageSO();

    beforeAll(async ()=>{
        await device.disableSynchronization();
        await device.launchApp({ permissions: { location: 'never' } });
    })

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('1.4 Sökning på kategori', async () => {

        /*
        await packageSO.fillSearchField("Travel");
        await packageSO.clickSearchButton();
        await packageSO.findSearchResultByPackageTitle("Travelling around Stockholm", 0);
        await packageSO.findSearchResultByPackageTitle("Stockholm Food", 1);

        await packageSO.clearSearchField();

        await packageSO.fillSearchField("Göteborg");
        await packageSO.clickSearchButton();
        await packageSO.findSearchResultByPackageTitle("Göteborg culture", 0);
        */

    });

});