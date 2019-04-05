const minDistance = 10;
/** @var {Array} */
const places = require('../resources/places_dodies');

function filterClosestPlaces(location) {
    return places.filter((place) => {
        let distance = getDistanceFromLatLonInKm(place.lat, place.lng, location.latitude, location.longitude);
        return distance < minDistance;
    });
}

//https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1);  // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
     // Distance in km
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function getRandomPlace(places) {
    let countPlaces = places.length;
    let randomPlaceId = Math.floor(Math.random() * countPlaces);

    return places[randomPlaceId];
}

function replyLocation(ctx) {
    let currentPlaces = places;

    if (typeof ctx.message.location !== "undefined") {
        currentPlaces = filterClosestPlaces(ctx.message.location);
    }

    /** @var {{title: String, lat: Number, lng: Number}} */
    let randomPlace = getRandomPlace(currentPlaces);

    return ctx.replyWithMarkdown(`*Vieta:* ${randomPlace.title}
*Lokācija:* ${randomPlace.lat}, ${randomPlace.lng}`, {
        reply_markup: {
            hide_keyboard: true
        }
    }).then(() => {
        return ctx.replyWithLocation(randomPlace.lat, randomPlace.lng)
    });
}

module.exports = {
    replyLocation,
};
