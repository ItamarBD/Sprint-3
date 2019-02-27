import keepService from '../services/keep-service.js';

export default {
    template: `
        <section v-if="note">
            <div>{{note.id}}</div>
            <div>{{note.title}}</div>
            <button ref="back-btn" v-on:click="backGalery">Back Galery</button>
        </section>
    `,
    data() {
        return {
            note: null,
        }
    },
    methods: {
        backGalery() {
            this.$refs['back-btn'].innerHTML = 'Returning you to galery...'
            setTimeout(() => {
                this.$router.push('/keep-app')
            }, 1000)
        },
    },
    computed: {
        
    },
    created() {
        const noteId = this.$route.params.noteId;
        keepService.getNoteById(noteId)
            .then(note => this.note = note)
    },
    mounted() {

    },
    components: {
        
    }
}