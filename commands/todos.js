const {
  addTodo,
  getTodos,
  completeTodo,
  clearTodos
} = require('../services/todos');

module.exports = (bot) => {

  bot.command('todo', (ctx) => {

    const text = ctx.message.text
      .replace('/todo', '')
      .trim();

    if (!text) {
      return ctx.reply(
        'Gunakan:\n/todo isi task'
      );
    }

    addTodo(ctx.from.id, text);

    ctx.reply(
      'Todo berhasil ditambahkan ✅'
    );
  });

  bot.command('todos', (ctx) => {

    const todos = getTodos(ctx.from.id);

    if (todos.length === 0) {
      return ctx.reply(
        'Belum ada todo 😢'
      );
    }

    const formattedTodos = todos
      .map((todo, index) => {

        const status = todo.done
          ? '✅'
          : '❌';

        return `
${index + 1}. ${status} ${todo.text}
`;
      })
      .join('\n');

    ctx.reply(`
📌 Todo List

${formattedTodos}
`);
  });

  bot.command('done', (ctx) => {

    const args =
      ctx.message.text.split(' ');

    const index =
      parseInt(args[1]) - 1;

    if (isNaN(index)) {

      return ctx.reply(
        'Gunakan:\n/done nomorTodo'
      );
    }

    const success = completeTodo(
      ctx.from.id,
      index
    );

    if (!success) {

      return ctx.reply(
        'Todo tidak ditemukan 😢'
      );
    }

    ctx.reply('Todo selesai ✅');
  });

  bot.command('cleartodos', (ctx) => {

    clearTodos(ctx.from.id);

    ctx.reply(
      'Semua todo dihapus ✅'
    );
  });
  bot.command('todo', (ctx) => {

    const text = ctx.message.text
      .replace('/todo', '')
      .trim();

    if (!text) {
      return ctx.reply(
        'Gunakan:\n/todo isi task'
      );
    }

    addTodo(ctx.from.id, text);

    ctx.reply('Todo berhasil ditambahkan ✅');
  });

  bot.command('todos', (ctx) => {

    const todos = getTodos(ctx.from.id);

    if (todos.length === 0) {
      return ctx.reply(
        'Belum ada todo 😢'
      );
    }

    const formattedTodos = todos
      .map((todo, index) => {

        const status = todo.done
          ? '✅'
          : '❌';

        return `${index + 1}. ${status} ${todo.text}`;
      })
      .join('\n');

    ctx.reply(`
📌 Todo List

${formattedTodos}
`);
  });

  bot.command('done', (ctx) => {

    const args = ctx.message.text.split(' ');

    const index = parseInt(args[1]) - 1;

    if (isNaN(index)) {
      return ctx.reply(
        'Gunakan:\n/done nomorTodo'
      );
    }

    const success = completeTodo(
      ctx.from.id,
      index
    );

    if (!success) {
      return ctx.reply(
        'Todo tidak ditemukan 😢'
      );
    }

    ctx.reply('Todo selesai ✅');
  });

  bot.command('cleartodos', (ctx) => {

    clearTodos(ctx.from.id);

    ctx.reply(
      'Semua todo berhasil dihapus ✅'
    );
  });

};