import axios from 'axios';

export default axios.create({
    baseURL: 'https://turistmo.herokuapp.com/', // prIT SHOULD GET CHANGED TO THE HEROKU URL.
    //baseURL: 'https://bd2b37cbfe94.ngrok.io', // prIT SHOULD GET CHANGED TO THE HEROKU URL.

})

