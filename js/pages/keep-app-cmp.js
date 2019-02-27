import keepService from '../apps/keep/services/keep-service.js';

import noteAdd from '../apps/keep/cmps/note-add.cmp.js';
import galeryShow from '../apps/keep/cmps/galery-show.cmp.js';

export default {
    template: `
        <section>
            <header>
                <h1>Header - Keep app</h1>
            </header>
            <main> 
                <h3>Main - Keep app</h3>
                <note-add 
                v-on:addNote="pushNewNote"
                ></note-add>

                <galery-show 
                v-bind:notes="notesToShow" 
                v-on:selected="selectNote"
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
            keepService.addNote(newNote)
                .then(ServiceNotes => this.notes = ServiceNotes)
        },
        selectNote(currNote) {
            this.selectedNote = currNote;
        },
    },
    computed: {
        notesToShow(){
            return this.notes;
        }
    },
    created() {
        keepService.getNotes()
            .then(ServiceNotes => this.notes = ServiceNotes)
    },
    mounted() {

    },
    components: {
        noteAdd,
        galeryShow,

    }
}