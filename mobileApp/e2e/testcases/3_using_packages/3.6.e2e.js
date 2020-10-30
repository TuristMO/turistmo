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
        //await device.disableSynchronization();
    });

    it('3.6 Rate:a paket upp/ner', async () => {

        await waitFor(element(by.id("packageScrollView"))).toExist().withTimeout(15000);
        await element(by.id("cardPackageTitle")).atIndex(0).tap();

        await waitFor(element(by.id("numberLike"))).toHaveText("0").withTimeout(15000);
        await element(by.id("packageDetailLikeButton")).tap();
        await waitFor(element(by.id("numberLike"))).toHaveText("1").withTimeout(15000);

        await waitFor(element(by.id("numberDislike"))).toHaveText("0").withTimeout(15000);
        await element(by.id("packageDetailDislikeButton")).tap();
        await waitFor(element(by.id("numberDislike"))).toHaveText("1").withTimeout(15000);


        await sleep(3000);

    });

});