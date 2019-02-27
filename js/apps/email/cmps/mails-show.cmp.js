export default {
    props: ['mails'],
    template: `
    <section>
        <div v-if="mails">
            {{mails.id}}
            <ul>
                <li class="clean-list" v-for="(currMail, idx) in mails"> 
                    {{mails[idx]}}
                    <button v-on:click="emitDeleted(currMail.id)">Delete mail</button>
                </li>
          </ul>
        </div>  
    </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        emitDeleted(mailId) {
            this.$emit('deleted', mailId)
        }
    },
    computed: {
        
    },
    created() {
        console.log(this.mails)
    },
    mounted() {

    },
    components: {
        
    }
}