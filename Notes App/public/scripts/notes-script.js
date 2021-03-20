"use strict";

const input = document.getElementById("search-text");
const createBtn = document.getElementById("create-note");

/*const notes = [
  {
    title: "my next trip",
    body: "I would like to go to Spain",
  },
  {
    title: "Habbits to work on",
    body: "Exercise. Eating a bit better.",
  },
  {
    title: "Office modification",
    body: "Get a new seat",
  },
];*/

let notes = getSavedNotes();

const filters = {
  searchText: "",
  sortBy: "byEdited",
};

renderNotes(notes, filters);

input.addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

createBtn.addEventListener("click", (e) => {
  const id = uuidv4();
  notes.push({
    id,
    title: "",
    body: "",
    createdAt: moment().valueOf(),
    updatedAt: moment().valueOf(),
  });
  localStorage.setItem("notes", JSON.stringify(notes));
  // renderNotes(notes, filters);
  location.assign(`/Notes App/note-edit.html#${id}`);
});

document.querySelector("#filter-by").addEventListener("change", (e) => {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

window.addEventListener("storage", (e) => {
  if (e.keys === "notes") {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});

const now = moment();
console.log(now);
