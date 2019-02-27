import utilService from '../../../services/util-service.js'
import storageService from '../../../services/storage-service.js'

export default {
    getNotes,
    addNote,
    getNoteById,
    deleteNote,
    clearAll,
}

var gNotes = [];
var NOTES_KEY = 'notes'

function deleteNote(noteId) {
    var noteIdx = gNotes.findIndex(note => noteId === note.id)
    gNotes.splice(noteIdx, 1);
    storageService.store(NOTES_KEY, gNotes);

    return Promise.resolve()
}

function clearAll(){
    gNotes = [];
    storageService.store(NOTES_KEY, gNotes);

    return Promise.resolve()
}

function addNote(newNote) {
    var note = _createNote(newNote)
    gNotes.push(note);
    storageService.store(NOTES_KEY, gNotes);
    return Promise.resolve(gNotes);
}

function getNotes() {
    // debugger
    var tempgNotes = storageService.load(NOTES_KEY);
    if (tempgNotes && tempgNotes.length) {
        gNotes = tempgNotes;
    } else {
        _createNotes();
    }
    return Promise.resolve(gNotes);
}

function getNoteById(noteId) {
    gNotes = storageService.load(NOTES_KEY);
    var note = gNotes.find(function (note) {
        return noteId === note.id
    })
    return Promise.resolve(note)
}

function _createNotes() {
    // debugger
    gNotes = storageService.load(NOTES_KEY);
    if (gNotes && gNotes.length) return;


    var notes = []
    for (let i = 0; i < 5; i++) {
        notes.push(_createNote({ title: 'title Name' }))
    }

    storageService.store(NOTES_KEY, notes);
    gNotes = notes;
}

function _createNote(newNote) {
    var uniqueId = utilService.sureUniqueId(gNotes);
    return {
        id: uniqueId,
        url: newNote.url,
        upload: newNote.upload,
        isPin: newNote.isPin,
        title: newNote.title,
        txt: newNote.txt,
    }
}