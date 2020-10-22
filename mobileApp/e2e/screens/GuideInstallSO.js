import {Utility} from "../Utility";
import {sleep} from "../helpers";

const {device, expect, element, by, waitFor} = require('detox');

export class GuideInstallSO extends Utility {

    async expectVideoToExist(timeout) {
        await this.toExistById("guideVideo", timeout)
    }


}