const {
  setPersona,
  getAvailablePersonas
} = require('../sessions/persona');

module.exports = (bot) => {

  bot.command('persona', (ctx) => {
    const text = ctx.message.text;

    const args = text.split(' ');

    const selectedPersona = args[1];

    if (!selectedPersona) {
      return ctx.reply(`
Gunakan:

/persona santai
/persona formal
/persona jarvis

Persona tersedia:
${getAvailablePersonas().join(', ')}
`);
    }

    setPersona(ctx.from.id, selectedPersona);

    ctx.reply(`Persona diubah ke: ${selectedPersona} ✅`);
  });
};