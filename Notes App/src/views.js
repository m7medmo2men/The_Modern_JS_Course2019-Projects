import moment from 'moment'
import {getNotes, sortNotes} from "./notes";
import {getFilters} from "./filters";

const generateNotesDOM = (note) => {
    const noteEl = document.createElement("a");
    const text = document.createElement("p");

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

const renderNotes = () => {
    filters = getFilters();
    notes = sortNotes(filters.sortBy);
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
const initializeEditPage = (id) => {
    const input = document.querySelector("#note-title");
    const body = document.querySelector("#note-body");
    const dateElement = document.querySelector("#last-edited");

    const notes = getNotes();
    const note = notes.find((el) => el.id === noteId);

    if (note === undefined) {
        location.assign("../index.html");
    }

    input.value = note.title;
    body.value = note.body;
    dateElement.textContent = generateLastEdited(note.updateAt);

}
export {generateLastEdited, generateNotesDOM, renderNotes, initializeEditPage}