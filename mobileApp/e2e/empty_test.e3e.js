const {device, expect, element, by, waitFor} = require('detox');

describe('TuristMO', () => {

    beforeAll(async ()=>{
        await device.launchApp({ permissions: { location: 'never' } });
    })

    beforeEach(async () => {
        await device.reloadReactNative();
        //await device.disableSynchronization();
    });

    it('Tomt test', async () => {

    });

});