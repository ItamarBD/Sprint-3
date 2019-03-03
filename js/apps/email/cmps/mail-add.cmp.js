export default {
    template: `
    <section>
        <div class="flex new-email" v-if="isClickNewMAil">
            <div>
                <button class="close-new-email btn" v-on:click="closeNewMail">Close</button>
            </div>    
            <input v-model="newMail.sentTo" type="text" placeholder="Email Adress" class="mail-input">
            <input v-model="newMail.subject" type="text" placeholder  ="Subject" class="mail-input">
            <!-- <div> -->
                <textarea v-model="newMail.body" placeholder="Message" cols="30" rows="10" class="mail-text-area-input"></textarea>
            <!-- </div> -->
            <button v-on:click="emitNewMail" class="send-mail-btn btn">
                <img src="./../../../../img/icons/send-button.png" class="send-icon">
            </button>
        </div>

        <button v-if="!isClickNewMAil" v-on:click="clickedNewEmail" class="compose-btn btn">Compose</button>
    </section>
    `,
    data() {
        return {
            newMail: {
                sentTo: 'Omer@misterBit.com',
                sentFrom: 'Itamar@misterBit.com',
                subject: '',
                body: '',
                isRead: false,
                sentAt: new Date().toLocaleString(),
                date: Date.now(),
                isSent: false
            },
            isClickNewMAil: false
        }
    },
    methods: {
        emitNewMail() {
            this.newMail.isSent = true;
            this.$emit('addMail', { ...this.newMail })
            this.isClickNewMAil = false
            document.body.classList.toggle('open');
        },
        clickedNewEmail() {
            this.isClickNewMAil = true;
            document.body.classList.toggle('open');
        },
        closeNewMail() {
            this.isClickNewMAil = false;
            document.body.classList.toggle('open');
        }
    },
    computed: { // v-bind

    },
    created() {
    },
    mounted() {

    },
    components: {

    }
}