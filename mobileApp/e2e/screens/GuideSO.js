import {Utility} from "../Utility";

const {device, expect, element, by, waitFor} = require('detox');

export class GuideSO extends Utility {

    async clickInstallButton(timeout) {
        await this.toBeVisibleById("install", timeout);
        await this.tapById("install");
    }

    async clickDeleteButton(timeout) {
        await this.toBeVisibleById("delete", timeout);
        await this.tapById("delete");
    }

    async clickCuratorButton(timeout) {
        await this.toBeVisibleById("curator", timeout);
        await this.tapById("curator");
    }

}