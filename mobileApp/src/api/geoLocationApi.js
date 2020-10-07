import axios from 'axios';

export default axios.create({
  baseURL: 'https://maps.googleapis.com',
  params:{
    key:'AIzaSyDIS1NEPG3DGage-GpC4COw3TWwZ_bjo34'
  }
})

