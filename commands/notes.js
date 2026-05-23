const {
  addNote,
  getNotes,
  clearNotes
} = require('./services/notes');

exports = (bot) => {
  bot.command('note', (ctx) => {

    const text = ctx.message.text
      .replace('/note', '')
      .trim();

    if (!text) {
      return ctx.reply(
        'Gunakan:\n/note isi catatan'
      );
    }

    addNote(ctx.from.id, text);

    ctx.reply('Note berhasil disimpan ✅');
  });

  bot.command('notes', (ctx) => {

    const notes = getNotes(ctx.from.id);

    if (notes.length === 0) {
      return ctx.reply(
        'Belum ada notes 😢'
      );
    }

    const formattedNotes = notes
      .map((note, index) =>
        `${index + 1}. ${note}`
      )
      .join('\n');

    ctx.reply(`
Daftar Notes:

${formattedNotes}
`);
  });

  bot.command('clearnotes', (ctx) => {

    clearNotes(ctx.from.id);

    ctx.reply('Semua notes berhasil dihapus ✅');
  });
};