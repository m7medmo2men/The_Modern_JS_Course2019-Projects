import uuidv4 from 'uuid/v4';
import moment from 'moment';

let notes = [];

const loadNotes = () => {
    const notesJSON = localStorage.getItem("notes");
    try {
        return notesJSON !== null ? JSON.parse(notesJSON) : [];
    } catch (e) {
        return [];
    }
};

const getNotes = () => notes;

const removeNote = (id) => {
    notes = notes.filter((el) => el.id !== id);
    saveNotes();
};



const saveNotes =  () => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

const createNote = () => {
    const id = uuidv4();
    notes.push({
        id,
        title: "",
        body: "",
        createdAt: moment().valueOf(),
        updatedAt: moment().valueOf(),
    });
    saveNotes();
    return id;
}

const sortNotes = (sortBy) => {
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

const updateNote = (id, updates) => {
    const note = notes.find(el => el.id === id);
    if (!note) {
        return
    }
    if (typeof updates.title === "string") {
        note.title = updates.title;
        note.updateAt = moment().valueOf();
    }
    if (typeof updates.body === "string") {
        note.body = updates.body;
        note.updateAt = moment().valueOf();
    }
    saveNotes();
    return note;
}

notes = loadNotes();

export {getNotes, createNote, removeNote, sortNotes, updateNote};