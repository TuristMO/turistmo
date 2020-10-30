import {AppSO} from "../../screens/AppSO";
import {GuideInstallSO} from "../../screens/GuideInstallSO";
import {GuideSO} from "../../screens/GuideSO";

const {device, expect, element, by, waitFor} = require('detox');

describe('TuristMO', () => {

    let appSO = new AppSO();
    let guideSO = new GuideSO();
    let guideInstallSO = new GuideInstallSO();

    beforeAll(async ()=>{
        await device.launchApp({ permissions: { location: 'never' } });
    })

    beforeEach(async () => {
        await device.reloadReactNative();
        //await device.disableSynchronization();
    });

    it('2.2 Deleteguide spelas upp', async () => {
        await appSO.tapGuideTab();
        await guideSO.clickDeleteButton();
        await guideInstallSO.expectVideoToExist();

    });

});