const {device, expect, element, by, waitFor} = require('detox');

export class Utility {

    async typeTextById(id, inputText) {
        await element(by.id(id)).typeText(inputText);
    }

    async typeTextByLabel(label, inputText) {
        await element(by.label(label)).typeText(inputText);
    }

    async tapById(id) {
        await element(by.id(id)).tap();
    }

    async tapByLabel(label) {
        await element(by.label(label)).tap();
    }

    async toBeVisibleById(id, timeout = 10000) {
        await waitFor(element(by.id(id))).toBeVisible().withTimeout(timeout);
    }

    async toBeVisibleByLabel(label, timeout = 10000) {
        await waitFor(element(by.label(label))).toBeVisible().withTimeout(timeout);
    }

    async toExistById(id, timeout = 10000) {
        await waitFor(element(by.id(id))).toExist().withTimeout(timeout);
    }

    async toExistByLabel(label, timeout = 10000) {
        await waitFor(element(by.label(label))).toExist().withTimeout(timeout);
    }

    async waitToHaveTextById(id, inputText, timeout = 10000) {
        await waitFor(element(by.id(id))).toHaveText(inputText).withTimeout(timeout);
    }

    async waitToHaveTextAtIndexById(id, inputText, index = 0, timeout = 10000) {
        await waitFor(element(by.id(id)).atIndex(index)).toHaveText(inputText).withTimeout(timeout);
    }

}