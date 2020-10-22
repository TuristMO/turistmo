import {Utility} from "../Utility";
import {sleep} from "../helpers";

const {device, expect, element, by, waitFor} = require('detox');

export class AppSO extends Utility {

    async tapCuratorTab(timeout) {

        await this.toBeVisibleById("CuratorTab", timeout);
        await this.tapById("CuratorTab");
        await sleep(2000);  // (splash + 500ms) Required despite waitFor element in next step

    }

}