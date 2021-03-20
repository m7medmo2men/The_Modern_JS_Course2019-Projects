"use strict";

const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");
  try {
    return notesJSON !== null ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

const removeNote = (id) => {
  notes = notes.filter((el) => el.id !== id);
};

const generateNotesDOM = (note) => {
  const noteEl = document.createElement("a");
  const text = document.createElement("p");
  // const button = document.createElement("button");
  // button.addEventListener("click", () => {
  //   removeNote(note.id);
  //   localStorage.setItem("notes", JSON.stringify(notes));
  //   renderNotes(notes, filters);
  // });
  //
  // button.textContent = "x";
  // div.appendChild(button);
  text.classList.add("list-item__title")
  const status = document.createElement("p");

  text.textContent = note.title.length > 0 ? note.title : "Unnamed Note"; // p.textContent Overrides every thing in <p></p>
  //p.setAttribute("href", `/Notes App/note-edit.html#${note.id}`);
  noteEl.setAttribute("href", `/Notes App/note-edit.html#${note.id}`);
  noteEl.classList.add("list-item")
  noteEl.appendChild(text);
  status.textContent = generateLastEdited(note.updatedAt)
  status.classList.add("list-item__subtitle")
  noteEl.appendChild(status);
  return noteEl;
};

// Sort by last edited or last created or alphabetically
const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => b.updatedAt - a.updatedAt);
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => b.createdAt - a.createdAt);
  } else {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    });
  }
};

const renderNotes = (notes, filters) => {
  notes = sortNotes(notes, filters.sortBy);
  const filterNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  document.querySelector("#notes").innerHTML = "";
  if (filterNotes.length > 0) {
    filterNotes.forEach((note) => {
      const p = generateNotesDOM(note);
      document.querySelector("#notes").appendChild(p);
    });
  } else {
    const p = document.createElement("p");
    p.textContent = "No Notes To Show";
    p.classList.add("empty-message");
    document.querySelector("#notes").appendChild(p);
  }
};

const generateLastEdited = (timestamp) => {
  return `Last edited ${moment(timestamp).fromNow()}`
}