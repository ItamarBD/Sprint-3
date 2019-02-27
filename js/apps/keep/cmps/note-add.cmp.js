export default {
    props: ['notes'],
    template: `
    <section>
        <div>
            <input type="text" value="Add text">
            <input type="text" value="Url">
            <button>Upload</button>

            <button v-on:click="emitNewNote">ADD NOTE</button>
        </div>
    </section>
    `,
    data() {
        return {
            newNote: {
                id: null,
                url: null,
                upload: null,
                isPin: false,
                title: null,
                txt: null,
            }
        }
    },
    methods: {
        emitNewNote(){
            this.$emit('addNote', { ...this.newNote })
        }

    },
    computed: {
        
    },
    created() {
        
    },
    mounted() {

    },
    components: {
        
    }
}