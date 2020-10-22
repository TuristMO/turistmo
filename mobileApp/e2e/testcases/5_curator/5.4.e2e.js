import {AppSO} from "../../screens/AppSO";
import {SplashSO} from "../../screens/SplashSO";
import {SigninSO} from "../../screens/SigninSO";
import {sleep} from "../../helpers";

const {device, expect, element, by, waitFor} = require('detox');

describe('TuristMO', () => {

    let appSO = new AppSO();
    let splashSO = new SplashSO();
    let signinSO = new SigninSO();

    beforeAll(async ()=>{
        await device.disableSynchronization();
        await device.launchApp({ permissions: { location: 'never' } });
    })

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('5.4 Logga in som curator', async () => {

        // Change later

        await appSO.tapCuratorTab();
        await splashSO.tapGetStartedButton();
        await signinSO.fillSigninEmail("minemailadress@domain.co.uk");
        await signinSO.waitToHaveTextById("email", "minemailadress@domain.co.uk");
        await signinSO.fillPassword("123456");
        await signinSO.tapById("showHideToggle");
        await signinSO.waitToHaveTextById("password", "123456");
        await signinSO.tapSigninButton();   //Also expects visibility

        //await signinSO.toBeVisibleById("goBackArrow");
        //await signinSO.tapById("goBackArrow");
        //await splashSO.tapGetStartedButton();  //Also expects visibility

    });

});