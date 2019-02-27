export default {
    template: `
    <section>
        <div v-if="isClickNewMAil">
            <button v-on:click="closeNewMail">✖</button>
            <input type="text" value="Email Adress">
            <input type="text" value  ="New Mail">
            <textarea placeholder="Message" cols="30" rows="10"></textarea>

            <button v-on:click="emitNewMail">SEND</button>
        </div>

        <button v-if="!isClickNewMAil" v-on:click="clickedNewEmail">Create New Mail</button>
    </section>
    `,
    data() {
        return {
            newMail: {
                sentTo: null,
                subject: 'Wassap?',
                body: 'aaaaaaaaaaaaa',
                isRead: false,
                sentAt: new Date().toLocaleString(),
            },
            isClickNewMAil: false
        }
    },
    methods: {
        emitNewMail() {
            this.$emit('addMail', { ...this.newMail })
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