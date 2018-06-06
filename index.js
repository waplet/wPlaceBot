const Telegraf = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const bot = new Telegraf(BOT_TOKEN);
/** @var {Array} */
const places = require('./resources/places');

bot.command('/getplace', (ctx) => {
    if (CHAT_ID && ctx.chat.id.toString() !== CHAT_ID) {
        return;
    }

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