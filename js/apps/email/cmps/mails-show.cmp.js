import { eventBus, SEND_NOTE_TO_MAIL } from '../../../event-bus.js';

import emailService from '../services/email-service.js'

export default {
    props: ['mails'],
    template: `
    <section>

        <div v-if="mails" >
            <ul>
                <li class="clean-list" v-for="(currMail, idx) in mails"> 
                    <router-link :to="'/email-app/' + currMail.id">
                    <div class="mail-preview flex" 
                    v-bind:class="{'not-bold': currMail.isRead}"
                    @click.native="selectMail(currMail)"
                    >
                        <span>{{currMail.sentFrom}}</span>
                        <span>{{currMail.subject}}</span>
                        <span>{{currMail.sentAt}}</span>
                        <div>
                            <button class="delete-mail-btn btn" v-on:click.stop.prevent="emitDeleted(currMail.id)">	&#x2421</button>
                            <button v-if="!currMail.isRead" v-on:click.stop.prevent="markAsRead(currMail)">Mark as read</button>
                            <button v-if="currMail.isRead" v-on:click.stop.prevent="markAsRead(currMail)">&#x2709</button>
                        </div>
                    </div>
                    </router-link>
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
            mail.isRead = true
            console.log('mail', mail)
            this.$emit('selected', mail)
            if (mail === this.selectedMail) this.selectedMail = null
            else this.selectedMail = mail
        },
        markAsRead(mail) {
            console.log('mark as read',mail)
            mail.isRead = !mail.isRead
            this.$emit('onReading', mail)
        }
    },
    computed: {
        
    },
    created() {
        console.log('in created');
        const mailId =this.$route.params.mailId
        emailService.getMailById(mailId)
        .then(currMail =>{
            this.mail = currMail
        });
        eventBus.$on(SEND_NOTE_TO_MAIL, ()=>{
            console.log('send note to mail! success');
        })
    },
    mounted() {

    },
    components: {
        
    }
}