import {PackageSO} from "../../screens/PackageSO";
import {sleep} from "../../helpers";
import {AppSO} from "../../screens/AppSO";

const {device, expect, element, by, waitFor} = require('detox');

describe('TuristMO', () => {

    let packageSO = new PackageSO();
    let appSO = new AppSO();

    beforeAll(async ()=>{
        await device.launchApp({ permissions: { location: 'never' } });
    })

    beforeEach(async () => {
        await device.reloadReactNative();
        //await device.disableSynchronization();
    });

    it('3.6 Rate:a paket upp/ner', async () => {

        await packageSO.tapFirstTravelPackage();
        await packageSO.waitForPackageDetailTitleByText("Traveling around Stockholm");

        // Move to a screen object method later on when rating behaviour i determined
        await waitFor(element(by.id("numberLike"))).toHaveText("0").withTimeout(15000);
        await element(by.id("packageDetailLikeButton")).tap();
        await waitFor(element(by.id("numberLike"))).toHaveText("1").withTimeout(15000);

        //await packageSO.tapPackageDetailGoBackArrow();
        await appSO.tapHomeTab();

        // Doing a search to avoid using scroll to click other package
        await packageSO.fillSearchField("culture")
        await packageSO.doSearch();

        await packageSO.tapFirstSearchPackage();
        await packageSO.waitForPackageDetailTitleByText("Göteborg culture");

        // Move to a screen object method later on when rating behaviour i determined
        await waitFor(element(by.id("numberDislike"))).toHaveText("0").withTimeout(15000);
        await element(by.id("packageDetailDislikeButton")).tap();
        await waitFor(element(by.id("numberDislike"))).toHaveText("1").withTimeout(15000);

    });

});