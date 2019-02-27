import utilService from '../../../services/util-service.js'
import storageService from '../../../services/storage-service.js'

export default {
    getNotes,
    addNote,

}

var gNotes = [];
var NOTES_KEY = 'notes'

_createNotes();

function addNote(newNote) {
    var note = _createBook(newNote)
    gNotes.push(note);
    storageService.store(NOTES_KEY, gNotes);
    return Promise.resolve(gNotes);
}

function getNotes() {
    var tempgNotes = storageService.load(NOTES_KEY);
    if (tempgNotes && tempgNotes.length) {
        gNotes = tempgNotes;
    }
    storageService.store(NOTES_KEY, gNotes);
    return Promise.resolve(gNotes);
}

function _createNotes() {
    gNotes = storageService.load(NOTES_KEY);
    if (gNotes && gNotes.length) return;

    var notes = []
    for (let i = 0; i < 5; i++) {
        notes.push(_createNote({ title: 'title Name' }) )
    }
    storageService.store(NOTES_KEY, notes);
    gNotes = notes;
}

function _createNote(newNote) {
    var uniqueId = utilService.sureUniqueId(gNotes);
    return {
        id: uniqueId,
        url: null,
        upload: null,
        isPin: false,
        title: newNote.title,
        txt: null,
    }
}