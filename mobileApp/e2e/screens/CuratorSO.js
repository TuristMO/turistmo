import {Utility} from "../Utility";
import {sleep} from "../helpers";

const {device, expect, element, by, waitFor} = require('detox');

export class CuratorSO extends Utility {

    async verifyCuratorEmail(inputText, timeout) {
        await this.toBeVisibleById("curatorEmail", timeout);
        await this.waitToHaveTextById("curatorEmail", inputText, timeout);
    }


}