"use strict";

const input = document.querySelector("#note-title");
const body = document.querySelector("#note-body");
const dateElement = document.querySelector("#last-edited");
const removeBtn = document.querySelector("#remove-note");

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find((el) => el.id === noteId);

if (note === undefined) {
  location.assign("../index.html");
}

input.value = note.title;
body.value = note.body;
dateElement.textContent = `Last Edited ${moment(note.updatedAt).fromNow()}`;

input.addEventListener("input", (e) => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  localStorage.setItem("notes", JSON.stringify(notes));
});

body.addEventListener("input", (e) => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = `Last Edited ${moment(note.updatedAt).fromNow()}`;
  localStorage.setItem("notes", JSON.stringify(notes));
});

removeBtn.addEventListener("click", (e) => {
  removeNote(noteId);
  localStorage.setItem("notes", JSON.stringify(notes));
  dateElement.textContent = `Last Edited ${moment(note.updatedAt).fromNow()}`;
  location.assign("../index.html");
});

window.addEventListener("storage", (e) => {
  if (e.keys === "notes") {
    notes = JSON.parse(e.newValue);
    note = notes.find((el) => el.id === noteId);

    if (note === undefined) {
      location.assign("../index.html");
    }

    input.value = note.title;
    body.querySelector("#note-body").value = note.body;
    dateElement.textContent = `Last Edited ${moment(note.updatedAt).fromNow()}`;
  }
});
