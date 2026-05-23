const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  '../data/todos.json'
);

let todos = {};

if (fs.existsSync(filePath)) {
  todos = JSON.parse(
    fs.readFileSync(filePath)
  );
}

function saveTodos() {
  fs.writeFileSync(
    filePath,
    JSON.stringify(todos, null, 2)
  );
}

function addTodo(userId, text) {

  if (!todos[userId]) {
    todos[userId] = [];
  }

  todos[userId].push({
    text,
    done: false
  });

  saveTodos();
}

function getTodos(userId) {
  return todos[userId] || [];
}

function completeTodo(userId, index) {

  const userTodos = getTodos(userId);

  if (!userTodos[index]) {
    return false;
  }

  userTodos[index].done = true;

  saveTodos();

  return true;
}

function clearTodos(userId) {

  todos[userId] = [];

  saveTodos();
}

module.exports = {
  addTodo,
  getTodos,
  completeTodo,
  clearTodos
};