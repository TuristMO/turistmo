import {Utility} from "../Utility";

const {device, expect, element, by, waitFor} = require('detox');

export class SignupSO extends Utility {

    async clickSigninButton(timeout = 10000) {
        await this.toBeVisibleById("SignIn", timeout);
        await this.tapById("SignIn");
    }

    async clickSignupButton(timeout = 10000) {
        await this.toBeVisibleById("SignUp", timeout);
        await this.tapById("SignUp");
    }
    /*
    async clickGoBackArrow(timeout = 10000) {
        await this.toBeVisibleById("foo", timeout);
        await this.tapById("foo");
    }
    */

    async fillEmail(inputText, timeout = 10000) {
        await this.toBeVisibleById("email", timeout);
        await this.typeTextById("email", inputText);
    }

    async fillPassword(inputText, timeout = 10000) {
        await this.toBeVisibleById("password", timeout);
        await this.typeTextById("password", inputText);
    }

    async fillConfirmPassword(inputText, timeout = 10000) {
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