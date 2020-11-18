import {Utility} from "../Utility";
import {sleep} from "../helpers";

const {device, expect, element, by, waitFor} = require('detox');

export class SignupSO extends Utility {

    async tapSigninButton(timeout) {
        await this.toBeVisibleById("signupSignIn", timeout);
        await this.tapById("signupSignIn");
    }

    async tapSignupButton(timeout) {

        await this.toBeVisibleById("signupSignUp", timeout);
        await this.tapById("signupSignUp");
        await sleep(2000);  // (splash + 500ms) Required despite waitFor element in next step
    }

    async tapGoBackArrow(timeout) {
        await this.toBeVisibleById("signupGoBackArrow", timeout);
        await this.tapById("signupGoBackArrow");
        await sleep(2000);
    }

    async fillEmail(inputText, timeout = 15000) {
        await this.toBeVisibleById("signupEmail", timeout);
        await this.replaceTextById("signupEmail", inputText);
    }

    async verifySignupEmail(inputText, timeout = 15000) {
        await this.waitToHaveTextById("signupEmail", inputText, timeout);
    }

    async fillPassword(inputText, timeout = 15000) {
        await this.toBeVisibleById("signupPassword", timeout);
        await this.replaceTextById("signupPassword", inputText);
    }

    async verifySignupPassword(inputText, timeout = 15000) {
        await this.waitToHaveTextById("signupPassword", inputText, timeout);
    }

    async fillConfirmPassword(inputText, timeout = 15000) {
        await this.toBeVisibleById("confirmPassword", timeout);
        await this.replaceTextById("confirmPassword", inputText);
    }

    async verifyConfirmPassword(inputText, timeout = 15000) {
        await this.waitToHaveTextById("confirmPassword", inputText, timeout);
    }

    async fillFirstName(inputText, timeout = 15000) {
        await this.toBeVisibleById("signupfirstName", timeout);
        await this.replaceTextById("signupfirstName", inputText);
    }

    async fillLastName(inputText, timeout = 15000) {
        await this.toBeVisibleById("signuplastName", timeout);
        await this.replaceTextById("signuplastName", inputText);
    }

    async tapShowHideToggle(timeout = 15000) {
        await this.toBeVisibleById("signupShowHideToggle", timeout);
        await this.tapById("signupShowHideToggle")
    }

}