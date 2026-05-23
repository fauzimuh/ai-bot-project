const {
  clearHistory
} = require('../sessions/memory');

module.exports = (bot) => {

  bot.command('reset', (ctx) => {

    clearHistory(ctx.from.id);

    ctx.reply(
      'Memory percakapan direset ✅'
    );
  });

};