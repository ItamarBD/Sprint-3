import notePreview from '../cmps/note-preview.cmp.js';

export default {
    props: ['notes'],
    template: `
    <section class="note-list">
        <p>Galery of Notes</p>
        <ul class="flex wrap space-even align-center">
            <li v-if="notes" 
            class="clean-list"
            v-for="(currNote, idx) in notes"
            v-bind:key="currNote.id"
            v-bind:class="{'marked-note': currNote.isPin}"
            >
                <router-link :to="'/keep-edit/' + currNote.id">
                    <note-preview
                        v-on:click.native="$emit('selected', currNote)"
                        v-bind:note="currNote">
                    </note-preview>
                </router-link>

                <div class="container-note-ed">
                    <button  class="btn-note-ed delete-note"
                    v-on:click="emitDeleteNote(currNote.id)"
                    >✗</button>
                    <button class="btn-note-ed">🎨</button>
                    <button class="btn-note-ed">⌨</button>
                </div>

            </li>
        </ul> 
    </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        emitDeleteNote(noteId) {
            this.$emit('onDeleteNote', noteId)
        },
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    components: {
        notePreview
    }
}