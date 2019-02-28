import emailService from '../services/email-service.js'

export default {
    template: `
        <section v-if="mail">
            <header>
                <h1>Mail details</h1>
            </header>
            <main class="mail-details-container flex"> 
               <div class="mail-details"><span>Sent form: </span>{{mail.sentFrom}} </div>
               <div class="mail-details"><span>Sent At: </span>{{mail.sentAt}} </div>
               <div class="mail-details"><span>Subject: </span>{{mail.subject}} </div>
               <div class="mail-details message"><div>Message: </div> {{mail.body}} </div>
               <!-- <div><span>Sent: </span>{{mail}} </div> -->
               <router-link class="link" exact to="/email-app">Back</router-link>
               <router-link class="link" exact to="/email-app/reply">Reply</router-link>

            </main>
        </section>
    `,
    data() {
        return {
            mail: null,
        }
    },
    
    computed: {
        
    },

    methods: {
        backBtn() {
            
        }
    },

    created() {
        const mailId = this.$route.params.mailId;
        emailService.getMailById(mailId)
            .then((serviceMail) => {
                this.mail = serviceMail
            })
    },
    mounted() {
        
    },
    components: {
        
    }
}