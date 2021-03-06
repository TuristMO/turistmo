import {AppSO} from "../../screens/AppSO";
import {SplashSO} from "../../screens/SplashSO";
import {SignupSO} from "../../screens/SignupSO";
import {SigninSO} from "../../screens/SigninSO";

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
        //await device.disableSynchronization();
    });

    it('5.1 Registrera curator konto (signup)', async () => {

        // This test should only fill sign up details without actually signing up

        let email = "minemailadress@domain.co.uk";
        let password = "123456";

        await appSO.tapCuratorTab();
        await splashSO.tapGetStartedButton();
        await signinSO.tapSignupButton();   //Also expects visibility
        await signupSO.fillEmail(email);
        await signupSO.verifySignupEmail(email);
        await signupSO.fillPassword(password);
        await signupSO.fillConfirmPassword(password);
        await signupSO.tapShowHideToggle();
        await signupSO.verifySignupPassword(password);
        await signupSO.verifyConfirmPassword(password);

    });

});