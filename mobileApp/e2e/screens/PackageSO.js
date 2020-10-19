import {Utility} from "../Utility";

const {device, expect, element, by, waitFor} = require('detox');

export class PackageSO extends Utility {

    async fillSearchField(inputText, timeout) {
        await this.toBeVisibleById("searchField", timeout);
        await this.typeTextById("searchField", inputText, timeout);
    }

    async clickSearchButton(timeout) {
        await this.toBeVisibleById("searchButton", timeout);
        await this.tapById("searchButton");
    }

    async findSearchResultByCuratorName(inputText, atIndex = -1, timeout) {
        switch(atIndex) {
            case -1:
                await this.waitToHaveTextById("curatorName", inputText, timeout);
                break;
            default:
                await this.waitToHaveTextAtIndexById("curatorName", inputText, atIndex, timeout);

        }
    }

    async findSearchResultByPackageTitle(inputText, atIndex = -1, timeout) {
        switch(atIndex) {
            case -1:
                await this.waitToHaveTextById("packageTitle", inputText, timeout);
                break;
            default:
                await this.waitToHaveTextAtIndexById("packageTitle", inputText, atIndex, timeout);
        }
    }

    /*
    async findSearchResultByPackageDescription() {
        // empty
        }
    */
}