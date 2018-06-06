const minDistance = 10;
/** @var {Array} */
const places = require('../resources/places');

function filterClosestPlaces(location) {
    return places.filter((place) => {
        let distance = getDistanceFromLatLonInKm(place.lat, place.lng, location.latitude, location.longitude);
        return distance < minDistance;
    });
}

//https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2-lat1);  // deg2rad below
    let dLon = deg2rad(lon2-lon1);
    let a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

function getRandomPlace(places) {
    let countPlaces = places.length;
    let randomPlaceId = Math.floor(Math.random() * countPlaces);

    return places[randomPlaceId];
}

module.exports = {
    filterClosestPlaces,
    getRandomPlace,
    places
};
