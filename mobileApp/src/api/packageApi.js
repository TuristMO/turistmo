import axios from 'axios';

export default axios.create({
   baseURL: 'https://turistmo.herokuapp.com/', // prIT SHOULD GET CHANGED TO THE HEROKU URL.
   // baseURL: 'https://8196a35dc33f.ngrok.io', // prIT SHOULD GET CHANGED TO THE HEROKU URL.

})

