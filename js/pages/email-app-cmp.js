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
                    <mail-filter v-on:searched="setSearch" v-on:filterBySubject="setFilterBySubject"></mail-filter>
                    <mail-add v-on:addMail="pushNewMail"></mail-add>
                </div>
                
                <div class="mails-container flex">
                    <mails-show v-on:onReading="changeReadMark" 
                    v-bind:mails="mailsToShow" v-on:deleted="deletedMail" v-on:selected="selectingMail"></mails-show>
                    <side-nav v-on:filterEmails="emailsToDisplay"></side-nav>
                </div>                
            </main>
        </section>
    `,
    data() {
        return {
            mails: [],
            filter: {
                subject: ''
            },
            statusMailToDisplay: 0,   //0 display all,1 display read,2 display unread
            selectedMail: null,
            filterBy: 'subjectUp'
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
        setSearch(filter) {
            console.log('filter', filter)
            this.filter = filter
        },
        setFilterBySubject(filter) {
            console.log('filter should be :-> ', filter)
            this.filterBy = filter
        },
        selectingMail(mail) {
            console.log('emited', mail)
            this.selectedMail = mail
        },
        changeReadMark(mail) {
            emailService.changeReadMarkService(mail)
        },
        selectAndMark(mail) {
            selectingMail(mail)
            changeReadMark(mail)
        },
        sortBySubjectUP(obj1, obj2) {
            console.log('sort by subject up' ,obj1.subject,obj2.subject)
            let e1 = obj1.subject.toLowerCase();
            let e2 = obj2.subject.toLowerCase();
            if (e1 > e2) return -1
            if (e1 < e2) return 1
            return 0
        },
        sortBySubjectDown(obj1, obj2) {
            console.log('sort by subject down' ,obj1.subject,obj2.subject)
            let e1 = obj1.subject.toLowerCase();
            let e2 = obj2.subject.toLowerCase();
            if (e1 < e2) return -1
            if (e1 > e2) return 1
            return 0
        },
        sortByDateDown(date1, date2) {
            console.log('sort by date down')
            if(date1.date < date2.date) return -1
            if(date1.date > date2.date) return 1
            return 0   
        },
        sortByDateUp(date1, date2) {
            console.log('sort by date up')
            if(date1.date > date2.date) return -1
            if(date1.date < date2.date) return 1
            return 0   
        },

        emailsToDisplay(status) {
            console.log(status)
            this.statusMailToDisplay = status;
            this.mailsToShow
        }
    },
    computed: {
        mailsToShow() {
            // var sortedEmails = []
            if (!this.filter && !this.statusMailToDisplay) return this.mails

            let filteredMails = this.mails.filter(mail => {
                if(!mail.subject) return true; // omer add to prevent error with *includes*
                return ((this.filter.hasOwnProperty('subject') && mail.subject.includes(this.filter.subject)) &&
                    (!this.statusMailToDisplay ||
                    (this.statusMailToDisplay === 1 && mail.isRead ||
                     this.statusMailToDisplay === 2 && !mail.isRead)))
            })

            if(this.filterBy === 'subjectUp')   {this.mails.sort((email1, email2) => (email1.subject.toLowerCase() < email2.subject.toLowerCase()) ? 1 : -1)}
            if(this.filterBy === 'subjectDown') {this.mails.sort((email1, email2) => (email1.subject.toLowerCase() > email2.subject.toLowerCase()) ? 1 : -1)}
            // switch (this.filterBy) {
            //     case 'subjectUp': 
            //     // sortedEmails = filteredMails.sort(this.sortBySubjectUp)
            //     this.mails.sort((email1, email2) => (email1.subject.toLowerCase() < email2.subject.toLowerCase()) ? 1 : -1)
            //     break;
                
            //     case 'subjectDown': 
            //         console.log('I am in here')
            //         // sortedEmails = filteredMails.sort(this.sortBySubjectDown)
            //         this.mails.sort((email1, email2) => (email1.subject.toLowerCase() > email2.subject.toLowerCase()) ? 1 : -1) 
            //         console.log('mails', this.mails)
            //     break;
            // }
            
            // return sortedEmails
        }
    },
    created() {
        // ************************* omer change > move 2 line below to mounted()
        // emailService.getMails()
        //     .then(Servicemails => this.mails = Servicemails)
    },
    mounted() {
        emailService.getMails()
            .then(Servicemails => this.mails = Servicemails)
    },
    components: {
        mailsShow,
        mailAdd,
        mailFilter,
        sideNav,

    }
}