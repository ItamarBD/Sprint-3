export default {
    props: ['note'],
    template: `
    <section>

        <!-- Edit -->
        <div class="body-note" v-if="note.isEdit">
            <input type="text" v-model="note.title">
            <textarea 
            v-if="note.txt" 
            v-model="note.txt" 
            class="note-text-area align-left" type="text"></textarea>
            <div
            v-for="(currTodo,idx) in note.todos" 
            :key="currTodo.id"
            class="align-left">
                    <input type="text" v-model="currTodo.txt">
                    <button v-on:click="removeTodo(currTodo.id)">🗑️</button>
            </div>
        </div>

        <!-- Preview -->
        <div class="body-note" v-if="!note.isEdit">
            <h4>{{note.title}}</h4>
            <div class="note-text-area-show align-left text-wrap">{{note.txt}}</div>

            <div v-if="currTodo.txt"
            v-for="(currTodo,idx) in note.todos" 
            :key="currTodo.id"
            class="align-left"> 
                <div>{{currTodo.txt}}</div>
            </div>
        </div>

    </section>
        `,
    methods: {

    },
    data() {
        return {

        }
    },
    computed: {
        
    },
    created() {

    },
}