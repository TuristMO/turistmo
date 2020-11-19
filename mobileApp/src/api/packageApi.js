import axios from 'axios';

export default axios.create({
    baseURL: 'https://turistmo.herokuapp.com/', // prIT SHOULD GET CHANGED TO THE HEROKU URL.
    // baseURL: 'https://709a7572aa24.ngrok.io', // prIT SHOULD GET CHANGED TO THE HEROKU URL.

})

