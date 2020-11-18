import {AppSO} from "../../screens/AppSO";
import {SplashSO} from "../../screens/SplashSO";
import {SigninSO} from "../../screens/SigninSO";
import {sleep} from "../../helpers";
import {CuratorSO} from "../../screens/CuratorSO";

const {device, expect, element, by, waitFor} = require('detox');

describe('TuristMO', () => {

    let appSO = new AppSO();
    let splashSO = new SplashSO();
    let signinSO = new SigninSO();
    let curatorSO = new CuratorSO();


    beforeAll(async ()=>{
        await device.launchApp({ permissions: { location: 'never' } });
    })

    beforeEach(async () => {
        await device.reloadReactNative();
        //await device.disableSynchronization();
    });

    it('5.4 Logga in som curator', async () => {

        let email = "rikardlof@gmail.com";
        let password = "expleo123";

        await appSO.tapCuratorTab();
        await splashSO.tapGetStartedButton();
        await signinSO.fillSigninEmail(email);
        await signinSO.verifySigninEmail(email);
        await signinSO.fillPassword(password);
        await signinSO.tapShowHideToggle();
        await signinSO.verifySigninPassword(password);
        await signinSO.tapSigninButton();   //Also expects visibility
        await curatorSO.verifyCuratorEmail(email);

    });

});