const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
/** @var {Array} */
const places = require('./resources/places');
const minDistance = 10;

bot.start((ctx) => {
    return ctx.reply('Working');
});
bot.command('/getplace', (ctx) => {
    /** @var {{title: String, lat: Number, lng: Number}} */
    let randomPlace = getRandomPlace(places);
    ctx.replyWithMarkdown(`*Vieta:* ${randomPlace.title}
*Lokācija:* ${randomPlace.lat}, ${randomPlace.lng}
    `).then(() => {
        return ctx.replyWithLocation(randomPlace.lat, randomPlace.lng)
    });
});

bot.command('/getplacel', (ctx) => {
    let newPlaces = places;
    let option = {
        "parse_mode": "Markdown",
        "reply_markup": {
            "one_time_keyboard": true,
            "keyboard": [[{
                text: "Send my location",
                request_location: true
            }], ["Cancel"]]
        }
    };

    ctx.replyWithMarkdown('Provide your location', option)
    .then(() => {
        bot.on("location", (ctx) => {
            newPlaces = filterClosestPlaces(ctx.message.location);

            /** @var {{title: String, lat: Number, lng: Number}} */
            let randomPlace = getRandomPlace(newPlaces);

            ctx.replyWithMarkdown(`*Vieta:* ${randomPlace.title}
    *Lokācija:* ${randomPlace.lat}, ${randomPlace.lng}
            `, {
                reply_markup: {
                    hide_keyboard: true
                }
            }).then(() => {
                return ctx.replyWithLocation(randomPlace.lat, randomPlace.lng)
            });
        })
    });

});


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

bot.startPolling();