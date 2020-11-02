import {Utility} from "../Utility";
import {sleep} from "../helpers";

const {device, expect, element, by, waitFor} = require('detox');

export class AppSO extends Utility {

    async tapHomeTab(timeout) {

        await this.toBeVisibleById("HomeTab", timeout);
        await this.tapById("HomeTab");
        await sleep(2000);
    }

    async tapCuratorTab(timeout) {

        await this.toBeVisibleById("CuratorTab", timeout);
        await this.tapById("CuratorTab");
        await sleep(2000);  // (splash + 500ms) Required despite waitFor element in next step

    }
    async tapGuideTab(timeout) {

        await this.toBeVisibleById("GuideTab", timeout);
        await this.tapById("GuideTab");
        await sleep(2000);
    }

}