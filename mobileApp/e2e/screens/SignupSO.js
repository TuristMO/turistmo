import {Utility} from "../Utility";
import {sleep} from "../helpers";

const {device, expect, element, by, waitFor} = require('detox');

export class SignupSO extends Utility {

    async tapSigninButton(timeout) {
        await this.toBeVisibleById("SignIn", timeout);
        await this.tapById("SignIn");
    }

    async tapSignupButton(timeout) {

        await this.toBeVisibleById("SignUp", timeout);
        await this.tapById("SignUp");
        await sleep(2000);  // (splash + 500ms) Required despite waitFor element in next step
    }
    /*
    async tapGoBackArrow(timeout) {
        await this.toBeVisibleById("goBackArrow", timeout);
        await this.tapById("goBackArrow");
    }
    */

    async fillEmail(inputText, timeout = 15000) {
        await this.toBeVisibleById("signupEmail", timeout);
        await this.typeTextById("signupEmail", inputText);
    }

    async fillPassword(inputText, timeout = 15000) {
        await this.toBeVisibleById("signupPassword", timeout);
        await this.typeTextById("signupPassword", inputText);
    }

    async fillConfirmPassword(inputText, timeout = 15000) {
        await this.toBeVisibleById("confirmPassword", timeout);
        await this.typeTextById("confirmPassword", inputText);
    }

    /*
    async toggleEyeHiddenCharacters(timeout = 10000) {
        await this.toBeVisibleById("foo", timeout);
        await this.tapById("foo");
    }
     */

}