const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const { replyLocation } = require('./src/helpers');

const Telegraf = require('telegraf');

const bot = new Telegraf(BOT_TOKEN);

bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;
});

bot.start((ctx) => {
    return ctx.reply('Working');
});

bot.command('/getplace', (ctx) => {
    if (CHAT_ID && ctx.chat.id.toString() !== CHAT_ID && ctx.chat.id.toString() !== '423326924') {
        return;
    }

    return replyLocation(ctx);
});

/**
 * Create weird behaviour of every location received it will respond, that's not needed
 */
// bot.command('/getplacel', (ctx) => {
//     if (CHAT_ID && ctx.chat.id.toString() !== CHAT_ID) {
//         return;
//     }
//
//     let option = {
//         "parse_mode": "Markdown",
//         "reply_markup": {
//             "one_time_keyboard": true,
//             "keyboard": [[{
//                 text: "Send my location",
//                 request_location: true
//             }]]
//         }
//     };
//
//     return ctx.replyWithMarkdown('Provide your location', option);
// });

// bot.on("location", ctx => {
//     if (CHAT_ID && ctx.chat.id.toString() !== CHAT_ID) {
//         return;
//     }
//
//     return replyLocation(ctx);
// });

bot.startPolling();
