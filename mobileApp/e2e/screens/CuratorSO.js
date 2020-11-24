import {Utility} from "../Utility";
import {sleep} from "../helpers";

const {device, expect, element, by, waitFor} = require('detox');

export class CuratorSO extends Utility {

    async verifyCuratorEmail(inputText, timeout) {
        await this.toBeVisibleById("curatorEmail", timeout);
        await this.waitToHaveTextById("curatorEmail", inputText, timeout);
    }

    async tapCreatePackageButton(timeout) {
        await this.toBeVisibleById("curatorCreateButton", timeout);
        await this.tapById("curatorCreateButton");
    }

    async verifyPackage(inputText, timeout) {
        //await this.toBeVisibleByText(inputText, timeout);

        await waitFor(element(by.text(inputText).withAncestor(by.id('curatorView')))).toBeVisible().withTimeout(15000);
        //await element(by.text(inputText).withAncestor(by.id('curatorCreatePackageTagPicker'))).tap();

    }

}