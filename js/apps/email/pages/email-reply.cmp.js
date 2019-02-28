import emailService from '../pages/email-reply.cmp.js'

export default {
    template: `
        <section>
            <header>
                <h1>Inbox</h1>
            </header>
            <main> 
            </main>
        </section>
    `,
    data() {
        return {
            mail: null,
        }
    },
    methods: {

    },
    computed: {
        
    },
    created() {
        const mailId = this.$route.params.mailId;
        emailService.getMailById(mailId)
            .then((serviceMail) => {
                this.mail = serviceMail
            })
            console.log(mail)
    },
    mounted() {

    },
    components: {
        
    }
}