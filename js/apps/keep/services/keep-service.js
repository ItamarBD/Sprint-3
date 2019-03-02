import utilService from '../../../services/util-service.js'
import storageService from '../../../services/storage-service.js'

export default {
    getNotes,
    addNote,
    getNoteById,
    deleteNote,
    clearAll,
    saveNewNote,
}

var gNotes = [];
var NOTES_KEY = 'notes bla bla'

function saveNewNote(UpdateNote) {
    var noteIdx = gNotes.findIndex(note => UpdateNote.id === note.id)
    gNotes.splice(noteIdx, 1, UpdateNote);
    storageService.store(NOTES_KEY, gNotes);
}

function deleteNote(noteId) {
    var noteIdx = gNotes.findIndex(note => noteId === note.id)
    gNotes.splice(noteIdx, 1);
    storageService.store(NOTES_KEY, gNotes);

    return Promise.resolve()
}

function clearAll() {
    gNotes = [];
    storageService.store(NOTES_KEY, gNotes);

    return Promise.resolve()
}

function addNote(newNote) {
    var note = _createNote(newNote)
    gNotes.unshift(note);
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
    for (let i = 0; i < 4; i++) {
        notes.push(_createNote({
            title: `title Name ${i + 1}`,
            imgUrl: { src: '', isNew: false },
            vdoUrl: { src: '', isNew: false },
            adoUrl: { src: '', isNew: false },
            isPin: false,
            isEdit: false,
            todos: [{ id: 1, txt: 'I have some thing todo' },
                    { id: 2, txt: 'but i forgat what is was..' },
                    { id: 3, txt: 'blabla' }],
            txt: null,
            upload: null,
            color: ''
        }))
    }
    notes.push(_createNote({
        title: 'My flower favorite',
        txt: null,
        imgUrl: { src: 'https://images.pexels.com/photos/1037994/pexels-photo-1037994.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', isNew: false },
        vdoUrl: { src: '', isNew: false },
        adoUrl: { src: '', isNew: false },
        isPin: true,
        isEdit: false,
        todos: [],
        upload: null,
        color: '',
    }))
    notes.push(_createNote({
        title: 'See this video - remind!',
        txt: null,
        imgUrl: { src: '', isNew: false },
        vdoUrl: { src: 'https://streamable.com/s/z05ev/ivbclw%22%20frameborder=%220%22', isNew: false },
        adoUrl: { src: '', isNew: false },
        isPin: true,
        isEdit: false,
        todos: [],
        upload: null,
        color: '',
    }))
    notes.push(_createNote({
        title: 'Listan to this music!',
        txt: null,
        imgUrl: { src: '', isNew: false },
        vdoUrl: { src: '', isNew: false },
        adoUrl: { src: 'https://s0.vocaroo.com/media/download_temp/Vocaroo_s0EBWrZEVc6m.mp3', isNew: false },
        isPin: true,
        isEdit: false,
        todos: [],
        upload: null,
        color: '',
    }))

    storageService.store(NOTES_KEY, notes);
    gNotes = notes;
}

function _createNote(newNote) {
    var uniqueId = utilService.sureUniqueId(gNotes);
    return {
        id: uniqueId,
        title: newNote.title,
        txt: newNote.txt,
        imgUrl: newNote.imgUrl,
        vdoUrl: newNote.vdoUrl,
        adoUrl: newNote.adoUrl,
        upload: newNote.upload,
        todos: newNote.todos,
        isPin: newNote.isPin,
        isEdit: newNote.isEdit,
        color: newNote.color,
    }
}