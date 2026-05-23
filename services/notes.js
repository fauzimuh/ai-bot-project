/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  '../data/notes.json'
);

let notes = {};

if (fs.existsSync(filePath)) {
  notes = JSON.parse(
    fs.readFileSync(filePath)
  );
}

function saveNotes() {
  fs.writeFileSync(
    filePath,
    JSON.stringify(notes, null, 2)
  );
}

function addNote(userId, text) {

  if (!notes[userId]) {
    notes[userId] = [];
  }

  notes[userId].push(text);

  saveNotes();
}

function getNotes(userId) {
  return notes[userId] || [];
}

function clearNotes(userId) {

  notes[userId] = [];

  saveNotes();
}

module.exports = {
  addNote,
  getNotes,
  clearNotes
};