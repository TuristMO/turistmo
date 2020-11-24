import {Utility} from "../Utility";
import {sleep} from "../helpers";

const {device, expect, element, by, waitFor} = require('detox');

export class CuratorCreatePackageSO extends Utility {

    async fillPackageTitle(textInput, timeout) {
        await this.toBeVisibleById("curatorCreatePackageTitle", timeout);
        await this.replaceTextById("curatorCreatePackageTitle", textInput)
    }

    async fillPackageDescription(textInput, timeout) {
        await this.toBeVisibleById("curatorCreatePackageDescription", timeout);
        await this.replaceTextById("curatorCreatePackageDescription", textInput)
    }

    async tapCityPickerOption(inputText, timeout) {
        await waitFor(element(by.text(inputText).withAncestor(by.id('curatorCreatePackageCityPicker')))cls).toBeVisible().withTimeout(15000);
        await element(by.text(inputText).withAncestor(by.id('curatorCreatePackageCityPicker'))).tap();
    }

    async tapTagPickerOption(inputText, timeout) {
        await waitFor(element(by.text(inputText).withAncestor(by.id('curatorCreatePackageTagPicker')))).toBeVisible().withTimeout(15000);
        await element(by.text(inputText).withAncestor(by.id('curatorCreatePackageTagPicker'))).tap();
    }

    async tapApp(textInput, timeout) {
        await this.toBeVisibleById(textInput, timeout);
        await this.tapById(textInput);
    }

    async tapSavePackageButton(timeout) {
        await this.toBeVisibleById("curatorCreatePackageSaveButton", timeout);
        await this.tapById("curatorCreatePackageSaveButton");
    }

    async tapGreatOkButton(timeout = 15000) {
        await this.toBeVisibleByText("OK!", timeout);
        await this.tapByText("OK!");
        await sleep(2000);
    }

}