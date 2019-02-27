export default {
    template: `
    <section>
        <div>
            {{newNote}}
            <input v-model="newNote.title" type="text" value="Add title">

            <input v-model="newNote.txt" type="text" value="Add text">
            <input v-model="newNote.url" type="text" value="Url">

            <!-- <input type="file" name="image" onchange="onFileInputChange(event)" /> -->

            <label for="upload-note-file" class="custom-upload-note-file">Choose File ☁
            </label>
            <input id="upload-note-file" class="upload-note-file" multiple type="file"/>

            <button v-on:click="emitNewNote">ADD NOTE</button>
        </div>
    </section>
    `,
    data() {
        return {
            newNote: {
                title: null,
                txt: null,
                url: null,
                upload: null,
                isPin: false,
            }
        }
    },
    methods: {
        emitNewNote() {
            this.$emit('addNote', { ...this.newNote })
        }
    },
    computed: {
        addTitle() {

        }
    },
    created() {

    },
    mounted() {

    },
    components: {

    }
}