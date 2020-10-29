import {AppSO} from "../../screens/AppSO";
import {SplashSO} from "../../screens/SplashSO";
import {SigninSO} from "../../screens/SigninSO";
import {SignupSO} from "../../screens/SignupSO";
import {sleep} from "../../helpers";

const {device, expect, element, by, waitFor} = require('detox');

describe('TuristMO', () => {

    let appSO = new AppSO();
    let splashSO = new SplashSO();
    let signinSO = new SigninSO();
    let signupSO = new SignupSO();

    beforeAll(async ()=>{
        await device.launchApp({ permissions: { location: 'never' } });
    })

    beforeEach(async () => {
        await device.reloadReactNative();
        await device.disableSynchronization();
    });

    it('5.7 Registrera konto med icke accepterade lösenord', async () => {

        // Testcase to be extended

        await appSO.tapCuratorTab();
        await splashSO.tapGetStartedButton();
        await signinSO.tapSignupButton();   //Also expects visibility
        await signupSO.fillEmail("minemailadress@domain.co.uk");
        await signupSO.waitToHaveTextById("signupEmail", "minemailadress@domain.co.uk");
        await signupSO.fillPassword("12345");
        await signupSO.fillConfirmPassword("12345");
        await signupSO.tapSignupButton();   //Also expects visibility
        //Expect error
        await signupSO.fillPassword("012345678901234567890");
        await signupSO.fillConfirmPassword("012345678901234567890");
        await signupSO.tapSignupButton();   //Also expects visibility
        //Expect error

    });

});