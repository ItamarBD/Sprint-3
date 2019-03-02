import { eventBus, EVENT_TOGGLE_SEARCH } from '../../../event-bus.js';

export default {
    template: `
    <section>
        <div class="add-new-note-section flex wrap align-center">

            <input v-on:keyup.enter="emitNewNote(); cleanPost();" 
            class="new-note-main" ref="mainInput" 
            v-model="newNote.title" type="text" placeholder="Add title">

            <button v-bind:class="{ active: typeChoose === 'text' }"
            v-on:click="changeType('text')"><img src="img/icons/afont2.png"></button>

            <button v-bind:class="{ active: typeChoose === 'imgUrl' }"
            v-on:click="changeType('imgUrl')">📸</button>

            <button v-bind:class="{ active: typeChoose === 'videoUrl' }"
            v-on:click="changeType('videoUrl')">🎥</button>

            <button v-bind:class="{ active: typeChoose === 'audioUrl' }"
            v-on:click="changeType('audioUrl')">🎶</button>

            <button v-bind:class="{ active: typeChoose === 'todo' }"
            v-on:click="changeType('todo')">📝</button>

            <button v-bind:class="{ active: typeChoose === 'upload' }"
            v-on:click="changeType('upload')"><img src="img/icons/cloud.png"></button>

            <!-- <button v-on:click="cleanPost">🔥</button> -->
        </div>

        <textarea class="new-note-text-area" v-if="typeChoose === 'text'" 
            v-model="newNote.txt" placeholder="Add text"></textarea>

        <input class="new-note-input" 
            v-on:keyup.enter="emitNewNote(); cleanPost();" v-if="typeChoose === 'imgUrl'" 
            v-model="newNote.imgUrl.src"  type="text" placeholder="Add Image URL">

        <input class="new-note-input" 
            v-on:keyup.enter="emitNewNote(); cleanPost();" v-if="typeChoose === 'videoUrl'" 
            v-model="newNote.vdoUrl.src" type="text" placeholder="Add Video URL">

        <input class="new-note-input" 
            v-on:keyup.enter="emitNewNote(); cleanPost();" v-if="typeChoose === 'audioUrl'" 
            v-model="newNote.adoUrl.src" type="text" placeholder="Add Audio URL">

        
        <div v-if="typeChoose === 'todo'">
            <div ref="lines-todo" 
            v-for="currTodo in newNote.todos" :key="currTodo.id">
            <div>
                <input class="new-note-input" type="text" v-on:keyup.enter="emitNewNote(); cleanPost();" 
                v-model="currTodo.txt" placeholder="Write Todo">
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
            v-on:click="emitNewNote(); cleanPost();">ADD NOTE &nbsp;<span style="font-size: 0.8em;">(Enter)</span></button>

            <button v-bind:class="toggleSearchBtn"
            v-on:click="onFilterClicked">{{toggleSearchName}}</button>

            <button class="new-note-clear-btn"
            v-on:click="emitClearAllNotes">Delete All !!</button>
        </div>

    </section>
    `,
    data() {
        return {
            newNote: {
                title: null,
                txt: null,
                imgUrl: { src: '', isNew: false },
                vdoUrl: { src: '', isNew: false },
                adoUrl: { src: '', isNew: false },
                upload: null,
                todos: [{ id: 0, txt: '' }, { id: 1, txt: '' }],
                isPin: false,
                isEdit: false,
                color: '',
            },
            typeChoose: '',
            todosIdCounter: 2,
            toggleSearchName: 'Open Search',
            toggleSearchBtn: 'filter-open',
            window: {
                width: 0,
                height: 0
            },
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
            if (newType === this.typeChoose) {
                this.typeChoose = '';
            } else {
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
        cleanPost() {
            this.newNote = {
                title: null,
                txt: null,
                imgUrl: { src: '', isNew: false },
                vdoUrl: { src: '', isNew: false },
                adoUrl: { src: '', isNew: false },
                upload: null,
                todos: [{ id: 0, txt: '' }, { id: 1, txt: '' }],
                isPin: false,
                isEdit: false,
                color: '',
            }
            this.typeChoose = '';
        },
        checkForTodos() {
            var text = '';
            this.newNote.todos.forEach(todo => {
                if (todo.txt.length) {
                    text += todo.txt;
                }
            })
            if (text.length === 0) {
                this.newNote.todos = [];
            }
        },
        onFilterClicked() {
            eventBus.$emit(EVENT_TOGGLE_SEARCH);

            if (this.toggleSearchName === 'Open Search') {
                this.toggleSearchName = 'Close Search';
            } else {
                this.toggleSearchName = 'Open Search';
            }

            if (this.toggleSearchBtn === 'filter-open') {
                this.toggleSearchBtn = 'filter-close';
            } else {
                this.toggleSearchBtn = 'filter-open';
            }
        },
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        },
    },
    computed: {
        addTitle() {

        }
    },
    created() {
        window.addEventListener('resize', this.handleResize)
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize)
    },
    mounted() {
        this.handleResize();
        if (this.window.width > 500) {
            this.$refs.mainInput.focus();
        }
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
            console.log('how fun')
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}