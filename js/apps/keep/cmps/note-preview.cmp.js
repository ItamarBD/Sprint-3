export default {
    props: ['note', 'idx'],
    template: `
    <section>

        <div class="body-note">
            <div>{{note.title}}</div>
            <div>{{note.url}}</div>
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
        
    }
}