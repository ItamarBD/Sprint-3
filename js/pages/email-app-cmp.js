import emailService from '../apps/email/services/email-service.js';

import mailAdd from '../apps/email/cmps/mail-add.cmp.js';
import mailsShow from '../apps/email/cmps/mails-show.cmp.js';

export default {
    template: `
        <section>
            <header>
                <h1>Header - Email app</h1>
            </header>
            <main> 
                <h3>Main - Email app</h3>
                
                <p>Mails lists</p>
                
                <mails-show v-bind:mails="mailsToShow" v-on:deleted="deletedMail"></mails-show>
                <!-- {{mails.id}} -->
                <!-- {{mails}} -->

                <mail-add v-on:addMail="pushNewMail">
                </mail-add>
                
            </main>
        </section>
    `,
    data() {
        return {
            mails: [],
        }
    },
    methods: {
        pushNewMail(newMail) {
            emailService.addMail(newMail)
                .then(Servicemails => this.mails = Servicemails)
        },
        deletedMail(mailId) {
            emailService.deletedMail(mailId)
                .then(() => {
                    console.log('mail deleted')
                })
        }
    },
    computed: {
        mailsToShow() {
            return this.mails
        }
    },
    created() {
        emailService.getMails()
            .then(Servicemails => this.mails = Servicemails)
    },
    mounted() {

    },
    components: {
        mailsShow,
        mailAdd,
    }
}