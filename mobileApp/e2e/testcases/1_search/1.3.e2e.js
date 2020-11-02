import {PackageSO} from "../../screens/PackageSO";

const {device, expect, element, by, waitFor} = require('detox');

describe('TuristMO', () => {

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

      //  await packageSO.fillSearchField("Göteborg");
       // await packageSO.doSearch();
     //   await packageSO.waitToHaveTextById('cardPackageTitleSearchIndex0', "Göteborg culture");

    });

});