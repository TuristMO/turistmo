import axios from 'axios';

export default axios.create({
    baseURL: 'https://turistmo.herokuapp.com/', // prIT SHOULD GET CHANGED TO THE HEROKU URL.
    // baseURL: 'https://63c8a3c98e7c.ngrok.io', // prIT SHOULD GET CHANGED TO THE HEROKU URL.

})

