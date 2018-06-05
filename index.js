const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
/** @var {Array} */
const places = require('./resources/places');

bot.start((ctx) => {
    return ctx.reply('Working');
});
bot.command('/getplace', (ctx) => {
    let countPlaces = places.length;
    let randomPlaceId = Math.floor(Math.random() * countPlaces);

    /** @var {{title: String, lat: Number, lng: Number}} */
    let randomPlace = places[randomPlaceId];
    ctx.replyWithMarkdown(`*Vieta:* ${randomPlace.title}
*Lokācija:* ${randomPlace.lat}, ${randomPlace.lng}
    `).then(() => {
        return ctx.replyWithLocation(randomPlace.lat, randomPlace.lng)
    });
});
bot.startPolling();