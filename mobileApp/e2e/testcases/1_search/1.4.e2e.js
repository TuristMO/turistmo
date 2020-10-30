import {PackageSO} from "../../screens/PackageSO";
import {sleep} from "../../helpers";

const {device, expect, element, by, waitFor} = require('detox');

describe('TuristMO', () => {

    let packageSO = new PackageSO();

    beforeAll(async ()=>{
        await device.launchApp({ permissions: { location: 'never' } });
    })

    beforeEach(async () => {
        await device.reloadReactNative();
        //await device.disableSynchronization();
    });

    it('1.4 Sökning på kategori', async () => {

        await packageSO.fillSearchField("Culture");
        await packageSO.doSearch();
        await packageSO.waitToHaveTextById('cardPackageTitleSearchIndex0', "Göteborg culture");

        await waitFor(element(by.id('cardPackageTitleSearchIndex1'))).toHaveText("Mixing business with culture").whileElement(by.id('searchPackageFlatList')).scroll(250, 'right');
        await waitFor(element(by.id('cardPackageTitleSearchIndex2'))).toHaveText("The Culture in history").whileElement(by.id('searchPackageFlatList')).scroll(250, 'right');

    });

});