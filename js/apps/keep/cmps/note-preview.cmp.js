export default {
    props: ['note'],
    template: `
    <section>

        <!-- Edit -->
        <div class="body-note" 
        v-if="note.isEdit"
        v-bind:style= "[ note.color ? { backgroundColor: note.color } : {}]">

            <label style="display: inline-block; float:left; margin-top: 3px;">Title:</label>
            <input type="text" v-model="note.title" class="note-title-edit">

            <textarea 
            v-if="note.txt" 
            ref="textAreaRef"
            v-on:keyup="resizeArea"
            v-model="note.txt" 
            class="note-area-edit" type="text"></textarea>


            <div class="flex wrap space-between" v-if="note.url.src || note.url.isNew">
                <input  class="note-url-edit" v-model="note.url.src"
                type="text" placeholder="Write URL">
                <button class="note-todo-remove" v-on:click="removeUrl()">🗑️</button>
            </div>
            <img v-if="note.url.src"
            class="note-edit-img"
            v-bind:src="note.url.src">

            <div
                v-for="(currTodo,idx) in note.todos"
                :key="currTodo.id"
                class="flex wrap space-between">
                <input class="note-todo-edit" type="text" v-model="currTodo.txt" placeholder="Write Todo">
                <button class="note-todo-remove" v-on:click="removeTodo(currTodo.id)">🗑️</button>
            </div>
            <button class="note-todo-add" v-on:click="makeNewTodo">Add Todo</button>

            <button v-if="!note.url.src && !note.url.isNew" class="note-todo-add" v-on:click="makeNewUrl">Add URL</button>

        </div>

        <!-- Preview -->
        <div class="body-note" 
            v-if="!note.isEdit"
            v-bind:style= "[ note.color ? { backgroundColor: note.color } : {}]">

            <div class="title">
                <label style="display: inline-block; float:left; margin-top: 3px;">Title:</label>
                <h4 style="display: inline-block">{{note.title}}</h4>
            </div>

            <pre v-if="note.txt" class="note-area-show align-left text-wrap">{{note.txt}}</pre>

            <img v-if="note.url.src"
            class="note-preview-img"
            v-bind:src="note.url.src">

            <div v-if="currTodo.txt"
            v-for="(currTodo,idx) in note.todos" 
            :key="currTodo.id"
            class="align-left"> 
                <div>🔸{{currTodo.txt}}</div>
            </div>
        </div>

    </section>
        `,
    data() {
        return {
            todosIdCounter: 2,
        }
    },
    methods: {
        removeTodo(todoId) {
            var todoIdx = this.note.todos.findIndex(function (todo) {
                return todoId === todo.id
            })
            this.note.todos.splice(todoIdx, 1);
        },
        removeUrl(){
            this.note.url.isNew = false;
        },
        makeNewTodo() {
            var toPush = {
                id: this.todosIdCounter + 'edit',
                txt: ''
            }
            this.note.todos.push(toPush);
            this.todosIdCounter = this.todosIdCounter + 1;
        },
        makeNewUrl() {
            this.note.url.isNew = true;
        },
        resizeArea(){
            this.$refs.textAreaRef.style.height = "5px";
            this.$refs.textAreaRef.style.height = (this.$refs.textAreaRef.scrollHeight)+"px";
        }
    },

    computed: {

    },
    created() {

    },
}