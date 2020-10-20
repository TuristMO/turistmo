const {device, expect, element, by, waitFor} = require('detox');

export class Utility {

    defaultTimeout = 15000;

    async typeTextById(id, inputText) {
        await element(by.id(id)).typeText(inputText);
    }

    async typeTextByLabel(label, inputText) {
        await element(by.label(label)).typeText(inputText);
    }

    async replaceTextById(id, inputText) {
        await element(by.id(id)).replaceText(inputText);
    }

    async replaceTextByLabel(label, inputText) {
        await element(by.label(label)).replaceText(inputText);
    }

    async tapById(id) {
        await element(by.id(id)).tap();
    }

    async tapByLabel(label) {
        await element(by.label(label)).tap();
    }

    async tapReturnKeyById(id) {
        await element(by.id(id)).tapReturnKey();
    }

    async tapReturnKeyByLabel(label) {
        await element(by.label(label)).tapReturnKey();
    }

    async clearTextById(id) {
        await element(by.id(id)).clearText();
    }

    async clearTextByLabel(label) {
        await element(by.label(label)).clearText();
    }

    async toBeVisibleById(id, timeout = this.defaultTimeout) {
        await waitFor(element(by.id(id))).toBeVisible().withTimeout(timeout);
    }

    async toBeVisibleByLabel(label, timeout = this.defaultTimeout) {
        await waitFor(element(by.label(label))).toBeVisible().withTimeout(timeout);
    }

    async toExistById(id, timeout = this.defaultTimeout) {
        await waitFor(element(by.id(id))).toExist().withTimeout(timeout);
    }

    async toExistByLabel(label, timeout = this.defaultTimeout) {
        await waitFor(element(by.label(label))).toExist().withTimeout(timeout);
    }

    async waitToHaveTextById(id, inputText, timeout = this.defaultTimeout) {
        await waitFor(element(by.id(id))).toHaveText(inputText).withTimeout(timeout);
    }

    async waitToHaveTextAtIndexById(id, inputText, index = 0, timeout = this.defaultTimeout) {
        await waitFor(element(by.id(id)).atIndex(index)).toHaveText(inputText).withTimeout(timeout);
    }

}