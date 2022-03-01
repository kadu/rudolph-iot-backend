const functions = require("firebase-functions");
const { Telegraf } = require('telegraf');
const TOKEN = functions.config().telegrambot.key;
const bot = new Telegraf(TOKEN, {
    telegram: { webhookReply: true },
});

bot.catch((err, ctx) => {
    functions.logger.error('[Bot] Error', err)
    return ctx.reply(`Ooops, bot encountered an error for ${ctx.updateType}`, err)
});

bot.command('/start', async (ctx) => {
    console.log('chegou start');
    return ctx.reply('From firebase functions.');
});

bot.on('message', async (ctx) => {
  console.log('chegou mensagem');
  console.log(ctx.message.from);
  let chat_id = ctx.message.from.id;
  let text = ctx.message.text;
  return ctx.reply(text);
});

exports.echoBot = functions.https.onRequest(async (request, response) => {
  try {
    functions.logger.log('Incoming message', request.body);
    bot.handleUpdate(request.body, response);
  } catch (error) {
    console.log(error);
  }
});