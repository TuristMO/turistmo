import {Utility} from "../Utility";
import {sleep} from "../helpers";

const {device, expect, element, by, waitFor} = require('detox');

export class SplashSO extends Utility {

    async tapGetStartedButton(timeout) {

        await this.toBeVisibleById("getStarted", timeout);
        await this.tapById("getStarted");
        await sleep(2000);  // (splash + 500ms) Required despite waitFor element in next step

    }

}