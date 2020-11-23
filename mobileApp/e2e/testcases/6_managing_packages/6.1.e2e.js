import {AppSO} from "../../screens/AppSO";
import {SplashSO} from "../../screens/SplashSO";
import {SignupSO} from "../../screens/SignupSO";
import {SigninSO} from "../../screens/SigninSO";
import {CuratorSO} from "../../screens/CuratorSO";
import {CuratorCreatePackageSO} from "../../screens/CuratorCreatePackageSO";
import {sleep} from "../../helpers";

const {device, expect, element, by, waitFor} = require('detox');

describe('TuristMO', () => {

    let appSO = new AppSO();
    let splashSO = new SplashSO();
    let signinSO = new SigninSO();
    let curatorSO = new CuratorSO();
    let curatorCreatePackageSO = new CuratorCreatePackageSO();

    beforeAll(async ()=>{
        await device.launchApp({ permissions: { location: 'never' } });
    })

    beforeEach(async () => {
        await device.reloadReactNative();
        //await device.disableSynchronization();
    });

    it('6.1 Skapa ett paket som curator', async () => {

        let email = "rikardlof@gmail.com";
        let password = "expleo123";
        let successLoginMsg = "Successful login!";
        let successCreateMsg = "Package is created successfully!";

        await appSO.tapCuratorTab();
        await splashSO.tapGetStartedButton();
        await signinSO.fillSigninEmail(email);
        await signinSO.verifySigninEmail(email);
        await signinSO.fillPassword(password);
        await signinSO.tapShowHideToggle();
        await signinSO.verifySigninPassword(password);
        await signinSO.tapSigninButton();   //Also expects visibility
        await signinSO.toBeVisibleByText(successLoginMsg);
        await signinSO.tapWelcomeOkButton();
        await curatorSO.verifyCuratorEmail(email);
        await curatorSO.tapCreatePackageButton();
        await curatorCreatePackageSO.fillPackageTitle("Test Package");
        await curatorCreatePackageSO.fillPackageDescription("Test Description");
        await curatorCreatePackageSO.tapPickerOption("Select city");
        await curatorCreatePackageSO.tapPickerOption("Göteborg");
        await curatorCreatePackageSO.tapPickerOption("Select Tag");
        await curatorCreatePackageSO.tapPickerOption("Travel");
        await curatorCreatePackageSO.tapPickerOption("Food");
        await curatorCreatePackageSO.tapPickerOption("2 tags have been selected.");
        await curatorCreatePackageSO.tapApp("SL");
        await curatorCreatePackageSO.tapApp("Aimo");
        await curatorCreatePackageSO.tapSavePackageButton();
        await curatorCreatePackageSO.toBeVisibleByText(successCreateMsg);
        await curatorCreatePackageSO.tapGreatOkButton();
        await curatorSO.verifyCuratorEmail(email);

        await device.reloadReactNative();
        // Fix: "Multiple views" problem because curatorcreatepackagescreen already open with package description field filled in
        await curatorSO.verifyPackage("Test Package")

    });

});