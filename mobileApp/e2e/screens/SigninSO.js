import {Utility} from "../Utility";
import {sleep} from "../helpers";

const {device, expect, element, by, waitFor} = require('detox');

export class SigninSO extends Utility {

    async tapSigninButton(timeout) {
        await this.toBeVisibleById("signinSignin", timeout);
        await this.tapById("signinSignin");
        await sleep(2000);
    }

    async tapSignupButton(timeout) {
        await this.toBeVisibleById("signinSignUp", timeout);
        await this.tapById("signinSignUp");
        await sleep(2000);
    }

    async tapGoBackArrow(timeout) {
        await this.toBeVisibleById("signinGoBackArrow", timeout);
        await this.tapById("signinGoBackArrow");
        await sleep(2000);
    }

    async fillSigninEmail(inputText, timeout = 15000) {
        await this.toBeVisibleById("signinEmail", timeout);
        await this.replaceTextById("signinEmail", inputText);
    }

    async verifySigninEmail(inputText, timeout = 15000) {
        await this.waitToHaveTextById("signinEmail", inputText, timeout);
    }

    async fillPassword(inputText, timeout = 15000) {
        await this.toBeVisibleById("signinPassword", timeout);
        await this.replaceTextById("signinPassword", inputText);
    }

    async verifySigninPassword(inputText, timeout = 15000) {
        await this.waitToHaveTextById("signinPassword", inputText, timeout);
    }

    async tapShowHideToggle(timeout = 15000) {
        await this.toBeVisibleById("signinShowHideToggle", timeout);
        await this.tapById("signinShowHideToggle")
    }

    async tapWelcomeOkButton(timeout = 15000) {
        await this.toBeVisibleByText("OK!", timeout);
        await this.tapByText("OK!");
        await sleep(2000);
    }

}