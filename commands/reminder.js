const {
  parseTime
} = require('../services/reminder');

module.exports = (bot) => {
  bot.command('remindme', (ctx) => {

    const args = ctx.message.text.split(' ');

    const timeText = args[1];

    const reminderText = args
      .slice(2)
      .join(' ');

    if (!timeText || !reminderText) {

      return ctx.reply(`
Gunakan:

/remind 10m minum obat
/remind 1h belajar nodejs
`);
    }

    const duration = parseTime(timeText);

    if (!duration) {

      return ctx.reply(
        'Format waktu tidak valid 😢'
      );
    }

    ctx.reply(`
⏰ Reminder dibuat!

Saya akan mengingatkan dalam ${timeText}
`);

    setTimeout(() => {

      ctx.reply(`
🔔 Reminder

${reminderText}
`);

    }, duration);
  });
};