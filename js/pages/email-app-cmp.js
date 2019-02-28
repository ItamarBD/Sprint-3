import emailService from '../apps/email/services/email-service.js';

import mailAdd from '../apps/email/cmps/mail-add.cmp.js';
import mailsShow from '../apps/email/cmps/mails-show.cmp.js';
import mailFilter from '../apps/email/cmps/mail-filter.cmp.js'

export default {
    template: `
        <section>
            <header>
                <h1>Header - Email app</h1>
            </header>
            <main> 
                <h3>Main - Email app</h3>
                
                <p>Mails lists</p>
                <mail-filter v-on:filtered="setFilter"></mail-filter>
                <mails-show v-bind:mails="mailsToShow" v-on:deleted="deletedMail" v-on:selected="selectingMail"></mails-show>

                <mail-add v-on:addMail="pushNewMail">
                </mail-add>
                
            </main>
        </section>
    `,
    data() {
        return {
            mails: [],
            filter: null,
            selectedMail: null
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
        },
        setFilter(filter) {
            console.log('filter', filter)
            this.filter = filter
        }
    },
    computed: {
        mailsToShow() {
            if (!this.filter) return this.mails

            let filteredMails = this.mails
                .filter(mail => mail.subject.includes(this.filter.subject))
            // .filter(mail => mail.date > Date.now())
            console.log('filtered mails', filteredMails)
            return filteredMails
        }
    },
    created() {
        emailService.getMails()
            .then(Servicemails => this.mails = Servicemails)
    },
    mounted: {
        selectingMail(mail) {
            console.log('mail emmited', mail)
            this.selectedMail = mail
        }

    },
    components: {
        mailsShow,
        mailAdd,
        mailFilter,
    }
}