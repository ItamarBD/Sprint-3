export default {
    template: `
        <section class="side-nav">
    <div class="side-bar-element">
        <router-link to="/email-app" v-on:click="$emit('filterEmails', 0)">Inbox (<span>3</span>)</router-link>
    </div>
    <div class="side-bar-element" v-on:click="$emit('filterEmails', 2)">Unread (<span>5</span>)</div>
    <div class="side-bar-element" v-on:click="$emit('filterEmails', 1)">Read (<span>9</span>)</div>
    <div class="side-bar-element">Sent</div>
    <div class="side-bar-element">Drafts</div>
    <div class="side-bar-element">Trash</div>
    </section>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    components: {

    }
}