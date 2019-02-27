export default {
    template: `
    <section>
        <div class="add-new-note-section flex wrap align-center">

            <input class="new-note-main" autofocus v-model="newNote.title" type="text" placeholder="Add title">

            <button>𝔸</button>
            <button>📸</button>
            <button>🎥</button>
            <button>📢</button>
            <button>📝</button>
            <button>💾</button>
        </div>

            <textarea v-if="typeChoose === 'text'" v-model="newNote.txt" name="" id="" cols="40" rows="8" placeholder="Add text"></textarea>

            <input v-if="typeChoose === 'url'" v-model="newNote.url" type="text" placeholder="Add URL">

            <label v-if="typeChoose === 'upload'" for="upload-note-file" class="custom-upload-note-file">☁💾
            </label>
            <input  id="upload-note-file" class="upload-note-file" multiple type="file"/>

        <hr>
        <button v-on:click="emitNewNote">ADD NOTE</button>

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
            },
            typeChoose: 'text',
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

// Select img to upload
function onFileInputChange(ev) {
    handleImageFromUpload(ev, renderCanvasGallery);
    moveToEdit();
}

//UPLOAD IMG WITH INPUT FILE
function handleImageFromUpload(ev, onImageReady) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        // img.onload = onImageReady.bind(null, img);
        img.onload = function() {
            console.log('how fun ')
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}