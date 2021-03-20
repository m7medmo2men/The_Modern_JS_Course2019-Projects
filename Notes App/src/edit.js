import {generateLastEdited, initializeEditPage} from "./views";
import {updateNote, removeNote} from "./notes";

const input = document.querySelector("#note-title");
const body = document.querySelector("#note-body");
const dateElement = document.querySelector("#last-edited");
const removeBtn = document.querySelector("#remove-note");
const noteId = location.hash.substring(1);

initializeEditPage(noteId);

input.addEventListener("input", (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt);
});

body.addEventListener("input", (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updateAt);
});

removeBtn.addEventListener("click", (e) => {
    removeNote(noteId);
    location.assign("../index.html");
});

window.addEventListener("storage", (e) => {
    if (e.keys === "notes") {
        initializeEditPage(noteId);
    }
});



