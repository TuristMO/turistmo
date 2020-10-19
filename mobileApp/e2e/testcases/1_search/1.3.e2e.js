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
    /*
    it('1.3 Sökning på app', async () => {

        await packageSO.fillSearchField("SL");
        await packageSO.clickSearchButton();
        await waitFor(element(by.id("test123")).atIndex(0)).toExist().withTimeout(10000);

        // await packageSO.findSearchResultByAppTitle("SL", 0);
    });
     */
});