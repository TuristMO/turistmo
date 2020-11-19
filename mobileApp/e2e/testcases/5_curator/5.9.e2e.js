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
        //await device.disableSynchronization();
    });

    it('5.9 Registrera konto med icke matchande lösenord', async () => {

        let email = "minemailadress@domain.co.uk";
        let password = "12345678";
        let firstName = "förnamn";
        let lastName = "efternamn";
        let errorMsg = "Password " + password + " doesn't match with your password confirmation " + password + "a!";

        await appSO.tapCuratorTab();
        await splashSO.tapGetStartedButton();
        await signinSO.tapSignupButton();   //Also expects visibility
        await signupSO.fillEmail(email);
        await signupSO.verifySignupEmail(email)
        await signupSO.fillPassword(password);
        await signupSO.fillConfirmPassword(password + "a");
        await signupSO.tapShowHideToggle();
        await signupSO.verifySignupPassword(password);
        await signupSO.verifyConfirmPassword(password + "a");
        await signupSO.fillFirstName(firstName);
        await signupSO.fillLastName(lastName);
        await signupSO.tapSignupButton();   //Also expects visibility
        await signupSO.toBeVisibleByText(errorMsg);

    });

});