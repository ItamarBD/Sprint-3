import emailService from '../apps/email/services/email-service.js';
import sideNav from '../apps/email/cmps/side-nav.cmp.js';

import mailAdd from '../apps/email/cmps/mail-add.cmp.js';
import mailsShow from '../apps/email/cmps/mails-show.cmp.js';
import mailFilter from '../apps/email/cmps/mail-filter.cmp.js'

export default {
    name: 'email-app',
    template: `
        <section>
            <header>
                <h1>Header - Email app</h1>
            </header>
            <main> 
                <h3>Main - Email app</h3>
                <div>
                    <p>Mails list</p>
                    <mail-filter v-on:filtered="setFilter"></mail-filter>
                    <mail-add v-on:addMail="pushNewMail"></mail-add>
                </div>
                
                <div class="mails-container flex">
                    <div>
                        <mails-show v-on:onReading="changeReadMark" 
                        v-bind:mails="mailsToShow" v-on:deleted="deletedMail" v-on:selected="selectingMail"></mails-show>
                    </div>

                    <side-nav v-on:filterEmails="emailsToDisplay"></side-nav>

                </div>
                
            </main>
        </section>
    `,
    data() {
        return {
            mails: [],
            filter: {
                subject:''
            },
            statusMailToDisplay: 0,   //0 display all,1 display read,2 display unread
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
        },
        selectingMail(mail) {
            console.log('emited', mail)
            this.selectedMail = mail
        },
        changeReadMark(mail) {
            console.log('mail 56 ',mail)
            emailService.changeReadMarkService(mail) 
        },
        selectAndMark(mail) {
            selectingMail(mail)
            changeReadMark(mail)
        },
        compare(obj1, obj2){
            console.log('Hola')
            if(obj1.subject > obj2.subject) return -1
            if(obj1.subject < obj2.subject) return 1
            return 0
        },

        emailsToDisplay(status){
            console.log(status)
            console.log(this.statusMailToDisplay)
            this.statusMailToDisplay = +status;
            console.log(this.statusMailToDisplay)
            this.mailsToShow
        }
    },
    computed: {
        mailsToShow() {
            console.log('whioooooo')
            
            if (!this.filter && !this.statusMailToDisplay) return this.mails

            let filteredMails = this.mails.filter(mail => {
                return ((this.filter.hasOwnProperty('subject') && mail.subject.includes(this.filter.subject)) && 
                (!this.statusMailToDisplay 
                    || (this.statusMailToDisplay === 1 && mail.isRead || this.statusMailToDisplay === 2 && !mail.isRead) ) )})

            console.log('status',this.statusMailToDisplay);
            filteredMails = filteredMails.sort(this.compare)
            console.log(filteredMails)
            return filteredMails
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
        mailFilter,
        sideNav,

    }
}