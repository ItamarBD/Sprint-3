import notePreview from '../cmps/note-preview.cmp.js';

export default {
    props: ['notes'],
    template: `
    <section class="note-list">
        <p style="margin: 2px 0">Galery of Notes</p>
        <ul class="wrap flex-col space-even align-center">
            <li v-if="notes"
            v-for="(currNote, idx) in notes"
            v-bind:key="currNote.id"
            v-bind:class="{'marked-note': currNote.isPin}"
            class="clean-list"
            >
            <note-preview
                v-on:click.native="$emit('selected', currNote)"
                v-bind:note="currNote">
            </note-preview>
        
        <div class="container-note-ed flex space-between">
            <button  class="btn-note-ed delete-note"
                v-on:click="emitDeleteNote(currNote.id)"
            >✗</button>
            <button class="btn-note-ed">🎨</button>
            <router-link :to="'/keep-edit/' + currNote.id">
                    <button class="btn-note-ed">✍</button>
            </router-link>
            <button class="btn-note-ed" v-if="currNote.isEdit"
                v-on:click="toggleEditMode(currNote); emitSavetostorage(currNote)"
                >💾</button>
            <button class="btn-note-ed" v-if="!currNote.isEdit"
                v-on:click="toggleEditMode(currNote)"
                >⌨</button>
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
        toggleEditMode(currNote) {
            currNote.isEdit = !currNote.isEdit;
        },
        emitSavetostorage(currNote){
            this.$emit('onSavetostorage', currNote)
        }
    },
    computed: {
        // getKeyboard(currNote){
        //     console.log(currNote.isEdit)
        //     if (currNote.isEdit) {
        //         return '💾';
        //     } else {
        //         return '⌨';
        //     }
        // }

    },
    created() {

    },
    mounted() {

    },
    components: {
        notePreview
    }
}