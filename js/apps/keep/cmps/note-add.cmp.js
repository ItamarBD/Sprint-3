export default {
    template: `
    <section>
        <div class="add-new-note-section flex wrap align-center">

            <input class="new-note-main" autofocus v-model="newNote.title" type="text" placeholder="Add title">

            <button v-on:click="changeType('text')">𝔸</button>
            <button v-on:click="changeType('url')">📸</button>
            <button v-on:click="changeType('url')">🎥</button>
            <button v-on:click="changeType('url')">📢</button>
            <button v-on:click="changeType('todo')">📝</button>
            <button v-on:click="changeType('upload')">☁</button>
        </div>

            <textarea class="note-text-area" v-if="typeChoose === 'text'" v-model="newNote.txt" rows="6" placeholder="Add text"></textarea>

            <input v-if="typeChoose === 'url'" v-model="newNote.url" type="text" placeholder="Add URL">

            <label v-if="typeChoose === 'upload'" for="upload-note-file" class="custom-upload-note-file">☁
            </label>
            <input  id="upload-note-file" class="upload-note-file" multiple type="file"/>

            <div v-if="typeChoose === 'todo'">
                

                <div ref="lines-todo"
                v-for="currTodo in newNote.todos" :key="currTodo.id">
                    <div>
                        <input type="text" v-model="currTodo.txt">
                        <button v-on:click="removeTodo(currTodo.id)">🗑️</button>
                    </div>
                </div>

                <button v-on:click="makeNewTodo">Add todo</button>
            </div>

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
                todos: [{ id: 0, txt: 'b' }, { id: 1, txt: 'a' }],
                isPin: false,
            },
            typeChoose: 'todo',
            todosIdCounter: 2,
        }
    },
    methods: {
        emitNewNote() {
            this.$emit('addNote', { ...this.newNote })
        },
        changeType(newType) {
            this.typeChoose = newType;
        },
        makeNewTodo() {
            var toPush = {id:this.todosIdCounter, txt: ''}
            this.newNote.todos.push(toPush);
            this.todosIdCounter = this.todosIdCounter + 1;
        },
        removeTodo(todoId) {
            var todoIdx = this.newNote.todos.findIndex(function (todo) {
                return todoId === todo.id
            })
            this.newNote.todos.splice(todoIdx, 1);
        },
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