export default {
    template: `
    <section>
        <div class="add-new-note-section flex wrap align-center">

            <input class="new-note-main" autofocus v-model="newNote.title" type="text" placeholder="Add title">

            <button v-on:click="changeType('text')"><img src="img/icons/afont2.png"></button>
            <button v-on:click="changeType('imgUrl')">📸</button>
            <button v-on:click="changeType('videoUrl')">🎥</button>
            <button v-on:click="changeType('audioUrl')">🎶</button>
            <button v-on:click="changeType('todo')">📝</button>
            <button v-on:click="changeType('upload')"><img src="img/icons/cloud.png"></button>
            <!-- <button v-on:click="cleanPost">🔥</button> -->
        </div>

        <textarea class="new-note-text-area" v-if="typeChoose === 'text'" v-model="newNote.txt" placeholder="Add text"></textarea>

        <input class="new-note-input" v-if="typeChoose === 'imgUrl'" v-model="newNote.url" type="text" placeholder="Add Image URL">
        <input class="new-note-input" v-if="typeChoose === 'videoUrl'" v-model="newNote.url" type="text" placeholder="Add Video URL">
        <input class="new-note-input" v-if="typeChoose === 'audioUrl'" v-model="newNote.url" type="text" placeholder="Add Audio URL">

        
        <div v-if="typeChoose === 'todo'">
            <div ref="lines-todo" 
            v-for="currTodo in newNote.todos" :key="currTodo.id">
            <div>
                <input class="new-note-input" type="text" v-model="currTodo.txt" placeholder="Write Todo">
                <button v-on:click="removeTodo(currTodo.id)"
                class="new-note-remove-btn">🗑️</button>
            </div>
        </div>
        <button class="new-note-add-todo" v-on:click="makeNewTodo">Add todo</button>
      </div>

        <label v-if="typeChoose === 'upload'" for="upload-note-file" class="custom-upload-note-file">Upload File ☁
        </label>
        <input id="upload-note-file" class="upload-note-file" multiple type="file"/>

        <div class="flex wrap align-center space-even">
            <button class="new-note-add-btn" 
            v-on:click="emitNewNote(); cleanPost();">ADD NOTE</button>
            <button class="new-note-clear-btn" 
            v-on:click="emitClearAllNotes">Clear All</button>
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
                todos: [{ id: 0, txt: '' }, { id: 1, txt: '' }],
                isPin: false,
                isEdit: false,
            },
            typeChoose: '',
            todosIdCounter: 2,
        }
    },
    methods: {
        emitNewNote() {

            this.checkForTodos();

            var copy = this.newNote;
            var newNote = JSON.parse(JSON.stringify(copy))
            this.$emit('addNote', newNote)
            // this.$emit('addNote', { ...this.newNote })

            this.newNote.todos = [{ id: 0, txt: '' }, { id: 1, txt: '' }];
        },
        emitClearAllNotes() {
            this.$emit('clearNotes')
        },
        changeType(newType) {
            if(newType === this.typeChoose){
                this.typeChoose = '';
            }else{
                this.typeChoose = newType;
            }
        },
        makeNewTodo() {
            var toPush = { id: this.todosIdCounter, txt: '' }
            this.newNote.todos.push(toPush);
            this.todosIdCounter = this.todosIdCounter + 1;
        },
        removeTodo(todoId) {
            var todoIdx = this.newNote.todos.findIndex(function (todo) {
                return todoId === todo.id
            })
            this.newNote.todos.splice(todoIdx, 1);
        },
        cleanPost(){
            this.newNote = {
                title: null,
                txt: null,
                url: null,
                upload: null,
                todos: [{ id: 0, txt: '' }, { id: 1, txt: '' }],
                isPin: false,
                isEdit: false,
            }
        },
        checkForTodos(){
            var text = '';
            this.newNote.todos.forEach(todo => {
                if(todo.txt.length){
                    text += todo.txt;
                }
            })
            if(text.length === 0){
                this.newNote.todos = [];
            }
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
        img.onload = function () {
            console.log('how fun ')
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}