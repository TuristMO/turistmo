import {Utility} from "../Utility";
import {AppSO} from "./AppSO";
import {sleep} from "../helpers";

const {device, expect, element, by, waitFor} = require('detox');

export class GuideSO extends Utility {

    async clickInstallButton(timeout) {
        await this.toBeVisibleById("guideInstallButton", timeout);
        await this.tapById("guideInstallButton");
        await sleep(2000);
    }

    async clickDeleteButton(timeout) {
        await this.toBeVisibleById("guideDeleteButton", timeout);
        await this.tapById("guideDeleteButton");
        await sleep(2000);
    }

    async clickCuratorButton(timeout) {
        await this.toBeVisibleById("guideCuratorButton", timeout);
        await this.tapById("guideCuratorButton");
        await sleep(2000);
    }

}