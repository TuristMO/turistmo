import {PackageSO} from "../../screens/PackageSO";
import {sleep} from "../../helpers";

const {device, expect, element, by, waitFor} = require('detox');

describe('TuristMO', () => {

    let packageSO = new PackageSO();

    beforeAll(async ()=>{
        await device.launchApp({ permissions: { location: 'never' } });
    })

    beforeEach(async () => {
        await device.reloadReactNative();
        await device.disableSynchronization();
    });

    it('1.1 Sökning på stad', async () => {

        await packageSO.fillSearchField("Malmö");
        await packageSO.doSearch();
        await packageSO.waitToBeVisibleByTextAtIndex0("The Culture in history");
        await packageSO.fillSearchField("Göteborg");
        await packageSO.doSearch();
        await packageSO.waitToBeVisibleByTextAtIndex0("Göteborg culture");

    });

});