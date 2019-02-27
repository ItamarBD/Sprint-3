import keepEdit from '../pages/keep-edit-cmp.js';

export default {
    props: ['notes'],
    template: `
    <section>
        <p>Galery of Notes</p>
        <ul>
            <li v-if="notes" 
            class="clean-list"
            v-for="(currNote, idx) in notes"
            v-bind:key="currNote.id"
            v-bind:class="{'marked-note': currNote.isPin}"
            >
            <!-- <router-link :to="'/note-edit/' + currNote.id">
                <keep-edit
                    v-on:click.native="$emit('selected', currNote)"
                    v-bind:note="currNote" :idx="idx+1">
                </keep-edit>
            </router-link> -->
            </li>
        </ul> 
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
        keepEdit
    }
}