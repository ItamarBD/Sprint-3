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
               <div class="mail-details message"><div> </div> {{mail.body}} </div>
               <!-- <div><span>Sent: </span>{{mail}} </div> -->
               <router-link class="link" exact to="/email-app">Back</router-link>
               <!------------- change *to="/email-app/reply"* to  *v-bind:to="pathToReply"*-------------->
               <router-link class="link" exact v-bind:to="pathToReply">Reply</router-link>
            </main>

        </section>
    `,
    data() {
        return {
            mail: null,
            // omer add:
            pathToReply: null
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
                if(!serviceMail)return;
                this.mail = serviceMail
                this.pathToReply = '/email-app/' + serviceMail.id + '/reply';
        })
    },
    mounted() {
        
    },
    components: {
        
    }
}