import {Utility} from "../Utility";

export class CuratorCreatePackageSO extends Utility {

    async fillPackageTitle(textInput, timeout) {
        await this.toBeVisibleById("curatorCreatePackageTitleInput", timeout);
        await this.replaceTextById("curatorCreatePackageTitleInput", textInput)
    }

    async fillPackageDescription(textInput, timeout) {
        await this.toBeVisibleById("curatorCreatePackageDescriptionInput", timeout);
        await this.replaceTextById("curatorCreatePackageDescriptionInput", textInput)
    }

    async tapPickerOption(inputText, timeout) {
        await this.toBeVisibleByText(inputText, timeout);
        await this.tapByText(inputText);
    }

    async tapApp(textInput, timeout) {
        await this.toBeVisibleById(textInput, timeout);
        await this.tapById(textInput);
    }

    async tapSavePackageButton(timeout) {
        await this.toBeVisibleById("curatorCreatePackageSaveButton", timeout);
        await this.tapById("curatorCreatePackageSaveButton");
    }

}