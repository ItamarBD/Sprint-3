export default {
    template: `
    <section>
        <div class="flex new-email" v-if="isClickNewMAil">
            <div>
                <button class="close-new-email" v-on:click="closeNewMail">✖</button>
            </div>    
            <input v-model="newMail.sentTo" type="text" placeholder="Email Adress">
            <input v-model="newMail.subject" type="text" placeholder  ="Subject">
            <textarea v-model="newMail.body" placeholder="Message" cols="30" rows="10"></textarea>
            <button v-on:click="emitNewMail" class="btn">SEND</button>
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
                date: Date.now()

            },
            isClickNewMAil: false
        }
    },
    methods: {
        emitNewMail() {
            this.$emit('addMail', { ...this.newMail })
            this.isClickNewMAil = false
        },
        clickedNewEmail() {
            this.isClickNewMAil = true;
        },
        closeNewMail() {
            this.isClickNewMAil = false;
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