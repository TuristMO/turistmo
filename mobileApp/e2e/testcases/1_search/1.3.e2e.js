import {PackageSO} from "../../screens/PackageSO";
import {AppSO} from "../../screens/AppSO";

const {device, expect, element, by, waitFor} = require('detox');

describe('TuristMO', () => {

    let appSO = new AppSO();
    let packageSO = new PackageSO();

    beforeAll(async ()=>{
        await device.launchApp({ permissions: { location: 'never' } });
    })

    beforeEach(async () => {
        await device.reloadReactNative();
        //await device.disableSynchronization();
    });

    it('1.3 Sökning på app', async () => {

        await packageSO.fillSearchField("SL");
        await packageSO.doSearch();
        await packageSO.tapFirstSearchPackage();
        await packageSO.toExistById("SL")

        await appSO.tapHomeTab();

        await packageSO.fillSearchField("aimo");
        await packageSO.doSearch();
        await packageSO.tapFirstSearchPackage();
        await packageSO.toExistById("Aimo")

    });

});