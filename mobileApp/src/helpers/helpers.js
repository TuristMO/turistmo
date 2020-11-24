export const tagColor = color => {
    switch(color) {
        case 'Travel':
            return '#FFAA7D';
        case 'Culture':
            return '#F07D75';
        case 'Food':
            return '#B3F2BA';
        case 'Business':
            return '#7D7DFF';
        default:
            return '#4AB4FF';

    }
}

export const silhouette = city => {
    switch(city) {
        case 'Stockholm':
            return {uri: 'https://res.cloudinary.com/hkiuhnuto/image/upload/v1606125209/sthlm-w_ismqbd.png'};
        case 'Göteborg':
            return {uri: 'https://res.cloudinary.com/hkiuhnuto/image/upload/v1606125209/gbg-w_jsbucd.png'};
        case 'Malmö':
            return {uri: 'https://res.cloudinary.com/hkiuhnuto/image/upload/v1606125209/malmo-w_ruyqm2.png'};
    }
}

//TODO MOVE THIS TO A REDUCER
export const getCityByCoordinates = ({latitude, longitude},searchResult) => {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude
        + '&key=' + "AIzaSyDIS1NEPG3DGage-GpC4COw3TWwZ_bjo34")
        .then((response) => response.json())
        .then((responseJson) => {
            const city = responseJson.results[0].address_components[3].long_name;
            //TODO : call API TO GET PACKAGES BASED ON THE CITY
            searchResult(city)
        })
};

//DOES NOT WORK!
// Geolocation.getCurrentPosition(
//     ({ coords }) => getCityByCoordinates(coords),
//     error => console.log(error), //Om permission denied utöka till städer som redan finns lagrade.
//     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
// );
