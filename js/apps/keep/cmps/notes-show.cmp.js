import notePreview from './note-preview.cmp.js';

export default {
    props: ['notes'],
    template: `
    <section class="note-list">
        <p class="p-galery-pin">Pinned Notes</p>
        <ul class="wrap flex-col space-even align-center">
            <li v-if="notes && currNote.isPin"
                v-for="(currNote, idx) in notes"
                v-bind:key="currNote.id"
                v-bind:class="{'marked-note': currNote.isPin}"
                class="square-note clean-list"
                >
                <note-preview
                    v-on:click.native="$emit('selected', currNote)"
                    v-bind:note="currNote">
                </note-preview>
                <div class="container-note-ed flex space-between">
                    <button  class="btn-note-ed delete-note"
                        v-on:click="emitDeleteNote(currNote.id)"
                    >✗</button>

                    <label v-bind:for="idx" class="label-pic-color">🎨</label>
                    <input v-bind:id="idx" v-on:change="changeBgNote(currNote,$event)"
                    class="note-color-input" type="color" value="#f7f1de" list="colors" />
                    <datalist id="colors">
                        <option>#ffef96</option>
                        <option>#eea29a</option>
                        <option>#deeaee</option>
                        <option>#b5e7a0</option>
                        <option>#d5e1df</option>
                        <option>#e6e2d3</option>
                        <option>#92a8d1</option>
                        <option>#f4e1d2</option>
                        <option>#c94c4c</option>
                        <option>#618685</option>
                    </datalist>

                    <router-link :to="'/keep-edit/' + currNote.id">
                        <button class="btn-note-ed">✍</button>
                    </router-link>

                    <button class="btn-note-ed" v-if="currNote.isPin"
                        v-on:click="togglePin(currNote); emitSaveToStorage(currNote)"
                        ><img src="img/icons/star.png"></button>
                        
                    <button class="btn-note-ed" v-if="currNote.isEdit"
                        v-on:click="toggleEditMode(currNote); emitSaveToStorage(currNote)"
                        >💾</button>
                    <button class="btn-note-ed" v-if="!currNote.isEdit"
                        v-on:click="toggleEditMode(currNote)"
                        ><img src="img/icons/keyboard.png"></button>
                </div>
            </li>
        </ul> 

        <p class="p-galery-pin">Other Notes</p>
        <ul class="wrap flex-col space-even align-center">
            <li v-if="notes && !currNote.isPin"
                v-for="(currNote, idx) in notes"
                v-bind:key="currNote.id"
                v-bind:class="{'marked-note': currNote.isPin}"
                class="square-note clean-list"
                >

                <note-preview
                    v-on:click.native="$emit('selected', currNote)"
                    v-bind:note="currNote">
                </note-preview>

                <div class="container-note-ed flex space-between">
                    <button  class="btn-note-ed delete-note"
                        v-on:click="emitDeleteNote(currNote.id)"
                    >✗</button>

                    <label v-bind:for="idx" class="label-pic-color">🎨</label>
                    <input v-bind:id="idx" v-on:change="changeBgNote(currNote,$event)"
                    class="note-color-input" type="color" value="#f7f1de" list="colors" />
                    <datalist id="colors">
                        <option>#ffef96</option>
                        <option>#eea29a</option>
                        <option>#deeaee</option>
                        <option>#b5e7a0</option>
                        <option>#d5e1df</option>
                        <option>#e6e2d3</option>
                        <option>#92a8d1</option>
                        <option>#f4e1d2</option>
                        <option>#c94c4c</option>
                        <option>#618685</option>
                    </datalist>

                    <router-link :to="'/keep-edit/' + currNote.id">
                        <button class="btn-note-ed">✍</button>
                    </router-link>

                    <button class="btn-note-ed" v-if="!currNote.isPin"
                        v-on:click="togglePin(currNote); emitSaveToStorage(currNote)"
                        ><img src="img/icons/unstar.png"></button>
                        
                    <button class="btn-note-ed" v-if="currNote.isEdit"
                        v-on:click="toggleEditMode(currNote); emitSaveToStorage(currNote)"
                        >💾</button>
                    <button class="btn-note-ed" v-if="!currNote.isEdit"
                        v-on:click="toggleEditMode(currNote)"
                        ><img src="img/icons/keyboard.png"></button>
                </div>
            </li>
        </ul> 

    </section>
    `,
    data() {
        return {}
    },
    methods: {
        emitDeleteNote(noteId) {
            this.$emit('onDeleteNote', noteId)
        },
        toggleEditMode(currNote) {
            currNote.isEdit = !currNote.isEdit;
        },
        togglePin(currNote) {
            currNote.isPin = !currNote.isPin;
        },
        emitSaveToStorage(currNote) {
            this.$emit('onSavetostorage', currNote)
        },
        changeBgNote(currNote,event){
            currNote.color = event.path[0].value;
            this.emitSaveToStorage(currNote);
        }
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