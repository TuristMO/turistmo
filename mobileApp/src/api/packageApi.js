import axios from 'axios';

export default axios.create({
    //baseURL: 'https://turistmo.herokuapp.com/', // prIT SHOULD GET CHANGED TO THE HEROKU URL.
    baseURL: 'https://115dd4dfb129.ngrok.io', // prIT SHOULD GET CHANGED TO THE HEROKU URL.

})

