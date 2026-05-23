/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  '../data/sessions.json'
);

let userSessions = {};

// Load data saat startup
if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(filePath);

  userSessions = JSON.parse(data);
}

// Save ke file
function saveSessions() {
  fs.writeFileSync(
    filePath,
    JSON.stringify(userSessions, null, 2)
  );
}

function getHistory(userId) {

  if (!userSessions[userId]) {
    userSessions[userId] = [];
  }

  return userSessions[userId];
}

function addMessage(userId, role, text) {

  const history = getHistory(userId);

  history.push({
    role,
    parts: [{ text }]
  });

  // Batasi memory
  if (history.length > 6) {
    history.shift();
  }

  saveSessions();
}

function clearHistory(userId) {

  userSessions[userId] = [];

  saveSessions();
}

module.exports = {
  getHistory,
  addMessage,
  clearHistory
};