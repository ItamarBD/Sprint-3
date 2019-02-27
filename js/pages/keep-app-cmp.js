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
                v-on:addNote="pushNewNote(newNote)"
                >
                </note-add>
                <p>Galery of Notes</p>
                <galery-show></galery-show>
                {{notes}}
            </main>
        </section>
    `,
    data() {
        return {
            notes: [],
        }
    },
    methods: {
        pushNewNote(newNote){
            keepService.addNote(newNote)
            .then(ServiceNotes => this.notes = ServiceNotes)
        }
    },
    computed: {

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