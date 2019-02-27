export default {
    props: ['mails'],
    template: `
    <section>
        <div v-if="mails">
            <ul>
                <li class="clean-list" v-for="(currMail, idx) in mails" @click.native="selectMail(currMail)"> 
                    <div class="mail-preview">
                        <span>{{currMail.id}}</span>
                        <span>{{currMail.subject}}</span>
                        <button v-on:click="emitDeleted(currMail.id)">Delete mail</button>
                    </div>
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
        },
        selectMail(mail) {
            console.log('mail', mail)
            this.$emit('selected', mail)
            if (mail === this.selectedMail) this.selectedMail = null
            else this.selectedMail = mail
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