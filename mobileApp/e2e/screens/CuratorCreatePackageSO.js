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
        //await this.toBeVisibleByText(inputText, timeout);
        //await this.tapByText(inputText);
        await waitFor((by.text(inputText).withAncestor(by.id('curatorCreatePackageCityPicker')))).toBeVisible().withTimeout(15000);
        //await waitFor(element(by.id(id))).toBeVisible().withTimeout(timeout)
    }

    async tapTagPickerOption(inputText, timeout) {
        //await this.toBeVisibleByText(inputText, timeout);
        //await this.tapByText(inputText);
        await waitFor((by.text(inputText).withAncestor(by.id('curatorCreatePackageTagPicker')))).toBeVisible().withTimeout(15000);
        //await waitFor(element(by.id(id))).toBeVisible().withTimeout(timeout)
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