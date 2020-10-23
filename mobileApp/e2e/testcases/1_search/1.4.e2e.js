import {PackageSO} from "../../screens/PackageSO";

const {device, expect, element, by, waitFor} = require('detox');

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

        // Utöka senare med ny mockdata
        await packageSO.fillSearchField("Culture");
        await packageSO.doSearch();
        await packageSO.findSearchResultByPackageTitle("Göteborg Culture", 0);

    });

});