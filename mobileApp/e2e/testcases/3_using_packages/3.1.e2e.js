import {packages} from "../../../data";
import {PackageSO} from "../../screens/PackageSO";

const {device, expect, element, by, waitFor} = require('detox');
const {getText, getProps} = require('detox-getprops');

describe('TuristMO', () => {

    let packageSO = new PackageSO();

    beforeAll(async ()=>{
        await device.disableSynchronization();
        await device.launchApp({ permissions: { location: 'never' } });
    })

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('3.1 Gå till package details', async () => {

    });

});