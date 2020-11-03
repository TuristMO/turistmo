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

    it('3.9 Rate:a ett paket ner', async () => {

        await packageSO.tapFirstTravelPackage();
        await packageSO.waitForPackageDetailTitleByText("Traveling around Stockholm");

        // Move to a screen object method later on when rating is implemented and behaviour is determined
        await waitFor(element(by.id("numberDislike"))).toHaveText("0").withTimeout(15000);
        await element(by.id("packageDetailDislikeButton")).tap();
        await waitFor(element(by.id("numberDislike"))).toHaveText("1").withTimeout(15000);

    });

});