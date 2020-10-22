import {Utility} from "../Utility";
import {AppSO} from "./AppSO";

const {device, expect, element, by, waitFor} = require('detox');

export class GuideSO extends Utility {

    async clickInstallButton(timeout) {
        await this.toBeVisibleById("guideInstallButton", timeout);
        await this.tapById("guideInstallButton");
    }

    async clickDeleteButton(timeout) {
        await this.toBeVisibleById("guideDeleteButton", timeout);
        await this.tapById("guideDeleteButton");
    }

    async clickCuratorButton(timeout) {
        await this.toBeVisibleById("guideCuratorButton", timeout);
        await this.tapById("guideCuratorButton");
    }

}