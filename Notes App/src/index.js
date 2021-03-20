import {createNote} from "./notes";
import {setFilter} from "./filters";
import {renderNotes} from "./views";

const input = document.getElementById("search-text");
const createBtn = document.getElementById("create-note");

renderNotes();

input.addEventListener("input", (e) => {
    setFilter({
        searchText: e.target.value
    })
    renderNotes();
});

createBtn.addEventListener("click", (e) => {
    const id = createNote();
    location.assign(`/Notes App/note-edit.html#${id}`);
});

document.querySelector("#filter-by").addEventListener("change", (e) => {
    setFilter({
        sortBy: e.target.value
    })
    renderNotes();
});

window.addEventListener("storage", (e) => {
    if (e.keys === "notes") {
        renderNotes();
    }
});
