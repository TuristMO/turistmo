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
        await packageSO.findSearchResultByPackageTitle("The Culture in history", 0);
        await packageSO.fillSearchField("Göteborg");
        await packageSO.doSearch();
        await packageSO.findSearchResultByPackageTitle("Göteborg culture", 0);

    });

});