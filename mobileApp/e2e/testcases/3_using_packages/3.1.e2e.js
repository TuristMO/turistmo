import {packages} from "../../../data";
import {PackageSO} from "../../screens/PackageSO";

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

    it('3.1 Gå till package details', async () => {
            // Gör klar
    });

});