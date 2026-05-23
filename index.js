/* eslint-disable no-undef */
require('dotenv').config();

const { Telegraf } = require('telegraf');
const { generateReply } = require('./services/gemini');
const {
  getHistory,
  addMessage
} = require('./sessions/memory');
const {
  getPersona
} = require('./sessions/persona');

const bot = new Telegraf(process.env.BOT_TOKEN);

require('./commands/help')(bot);
require('./commands/reset')(bot);
require('./commands/todo')(bot);
require('./commands/note')(bot);
require('./commands/persona')(bot);
require('./commands/reminder')(bot);

bot.start((ctx) => {
  ctx.reply('Halo! Saya personal assistant kamu 🚀');
});

bot.on('text', async (ctx) => {
  try {
    const userId = ctx.from.id;
    const userMessage = ctx.message.text;
    // Skip command
    if (userMessage.startsWith('/')) {
      return;
    }

    ctx.telegram.sendChatAction(
      ctx.chat.id,
      'typing'
    );

    const history = getHistory(userId);
    const persona = getPersona(userId);
    const reply = await generateReply(
      history,
      persona,
      userMessage
    );

    addMessage(userId, 'user', userMessage);
    addMessage(userId, 'model', reply);

    ctx.reply(reply);
  } catch (error) {
    console.error(error);
    if (error.status === 429) {
      return ctx.reply(
        'AI sedang sibuk 😢 coba lagi beberapa detik.'
      );
    }
    ctx.reply('Terjadi error 😢');
  }
});

bot.launch();

process.once('SIGINT', () =>
  bot.stop('SIGINT')
);

process.once('SIGTERM', () =>
  bot.stop('SIGTERM')
);

console.log('Bot running...');