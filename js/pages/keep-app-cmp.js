import keepService from '../apps/keep/services/keep-service.js';

import noteAdd from '../apps/keep/cmps/note-add.cmp.js';
import galeryShow from '../apps/keep/cmps/galery-show.cmp.js';

export default {
    template: `
        <section>
            <main> 
                <note-add 
                v-on:addNote="pushNewNote"
                v-on:clearNotes="clearAll"
                ></note-add>

                <!-- <button v-on:click="clearAll">Clear All</button> -->

                <galery-show 
                v-bind:notes="notesToShow" 
                v-on:selected="selectNote"
                v-on:onDeleteNote="deleteNote"
                v-on:onSavetostorage="savetostorage"
                ></galery-show>

                <!-- {{notes}} -->
            </main>
        </section>
    `,
    data() {
        return {
            notes: [],
            selectedNote: null,
        }
    },
    methods: {
        pushNewNote(newNote) {
            // debugger
            keepService.addNote(newNote)
                .then(ServiceNotes => this.notes = ServiceNotes)
        },
        selectNote(currNote) {
            // this.selectedNote = currNote;
        },
        deleteNote(noteId){
            keepService.deleteNote(noteId)
        },
        clearAll(){
            keepService.clearAll()
            .then(emptyNotes =>{
                this.notes = emptyNotes
           })
        },
        savetostorage(currNote){
            keepService.saveNewNote(currNote);
        }
    },
    computed: {
        notesToShow(){
            return this.notes;
        }
    },
    created() {
        keepService.getNotes()
        .then(ServiceNotes =>{
             this.notes = ServiceNotes
        })
    },
    mounted() {

    },
    components: {
        noteAdd,
        galeryShow,

    }
}