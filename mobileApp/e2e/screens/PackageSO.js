import {Utility} from "../Utility";
import {sleep} from "../helpers";

const {device, expect, element, by, waitFor} = require('detox');

export class PackageSO extends Utility {

    async fillSearchField(inputText, timeout) {
        await this.toBeVisibleById("searchField", timeout);
        await this.replaceTextById("searchField", inputText);
    }

    async typeSearchField(inputText, timeout) {
        await this.toBeVisibleById("searchField", timeout);
        await this.typeTextById("searchField", inputText);
    }

    async clearSearchField(timeout) {
        await this.toBeVisibleById("searchField", timeout);
        await this.clearTextById("searchField");
    }

    async doSearch(timeout) {
        await this.toBeVisibleById("searchField", timeout);
        await this.tapReturnKeyById("searchField");
    }

    async tapFirstTravelPackage() {
        await this.toBeVisibleById("cardPackageTitleTravelIndex0");
        await this.tapById("cardPackageTitleTravelIndex0");
    }

    async tapFirstSearchPackage() {
        await this.toBeVisibleById("cardPackageTitleSearchIndex0");
        await this.tapById("cardPackageTitleSearchIndex0");
    }

    async waitForPackageDetailTitleByText(inputText) {
        await this.toBeVisibleById("packageDetailpackageTitle");
        await this.waitToHaveTextById("packageDetailpackageTitle", inputText);
    }

    async tapPackageDetailGoBackArrow() {
        await this.toBeVisibleById("packageDetailGoBackArrow");
        await this.tapById("packageDetailGoBackArrow");
        await sleep(2000);
    }

    async tapFirstSearchPackage(){
        await this.toBeVisibleById("cardPackageTitleSearchIndex0");
        await this.tapById("cardPackageTitleSearchIndex0");
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
        switch (atIndex) {
            case -1:
                await this.waitToHaveTextById("cardPackageTitle", inputText, timeout);
                break;
            default:
                await this.waitToHaveTextAtIndexById("cardPackageTitle", inputText, atIndex, timeout);
        }
    }
    /*
    async findSearchResultByPackageDescription() {
        // empty
        }
    */
}