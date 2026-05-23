module.exports = (bot) => {

  bot.command('help', (ctx) => {

    ctx.reply(`
Command tersedia:

/help
/reset
/persona
/note
/notes
/clearnotes
/todo
/todos
/done
/cleartodos
/remind
`);
  });

};