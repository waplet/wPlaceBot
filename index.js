const { replyLocation } = require('./src/helpers');

const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    return ctx.reply('Working');
});

bot.command('/getplace', replyLocation);

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

    ctx.replyWithMarkdown('Provide your location', option);
});

bot.on("location", replyLocation);

bot.startPolling();