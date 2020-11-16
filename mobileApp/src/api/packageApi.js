import axios from 'axios';

export default axios.create({
    //baseURL: 'https://turistmo.herokuapp.com/', // prIT SHOULD GET CHANGED TO THE HEROKU URL.
    baseURL: 'https://2dc54030fdb5.ngrok.io', // prIT SHOULD GET CHANGED TO THE HEROKU URL.

})

