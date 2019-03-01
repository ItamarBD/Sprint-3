export default {
    props: ['note'],
    template: `
    <section>

        <!-- Edit -->
        <div class="body-note" v-if="note.isEdit">

            <label style="display: inline-block; float:left; margin-top: 3px;">Title:</label>
            <input type="text" v-model="note.title" class="note-title-edit">

            <textarea 
            v-if="note.txt" 
            v-model="note.txt" 
            class="note-area-edit" type="text"></textarea>

            <input v-if="note.url" class="note-url-edit" v-model="note.url"
            type="text" placeholder="Change URL">
            <img v-if="note.url"
            class="note-edit-img"
            v-bind:src="note.url">

            <div
            v-for="(currTodo,idx) in note.todos"
            :key="currTodo.id"
            class="flex wrap space-between">
                <input class="note-todo-edit" type="text" v-model="currTodo.txt">
                <button class="note-todo-remove" v-on:click="removeTodo(currTodo.id)">🗑️</button>
            </div>
            <button class="note-todo-add" v-on:click="makeNewTodo">Add todo</button>

            <button v-if="!note.url" class="note-todo-add" v-on:click="makeNewUrl">Add URL</button>

        </div>

        <!-- Preview -->
        <div class="body-note" v-if="!note.isEdit">

            <div class="title">
                <label style="display: inline-block; float:left; margin-top: 3px;">Title:</label>
                <h4 style="display: inline-block">{{note.title}}</h4>
            </div>

            <pre v-if="note.txt" class="note-area-show align-left text-wrap">{{note.txt}}</pre>

            <img v-if="note.url"
            class="note-preview-img"
            v-bind:src="note.url">

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
        makeNewTodo() {
            var toPush = {
                id: this.todosIdCounter + 'edit',
                txt: ''
            }
            this.note.todos.push(toPush);
            this.todosIdCounter = this.todosIdCounter + 1;
        },
        makeNewUrl() {
            console.log('okkkk')
        }
    },

    computed: {

    },
    created() {

    },
}