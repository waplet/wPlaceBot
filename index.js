const { filterClosestPlaces, getRandomPlace, places } = require('./src/helpers');

const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

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
            let places = filterClosestPlaces(ctx.message.location);

            /** @var {{title: String, lat: Number, lng: Number}} */
            let randomPlace = getRandomPlace(places);

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

bot.startPolling();