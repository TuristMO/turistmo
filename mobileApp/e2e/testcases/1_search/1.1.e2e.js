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

    it('1.1 Sökning på stad', async () => {

        await packageSO.fillSearchField("Stockholm");
        await packageSO.doSearch();
        await packageSO.findSearchResultByPackageTitle("Travelling around Stockholm", 0);
        await packageSO.findSearchResultByPackageTitle("Stockholm Food", 1);
        await packageSO.fillSearchField("Göteborg");
        await packageSO.doSearch();
        await packageSO.findSearchResultByPackageTitle("Göteborg culture",0);

    });

});