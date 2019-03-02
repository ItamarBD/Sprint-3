import { eventBus, EVENT_TOGGLE_SEARCH } from '../../../event-bus.js';

export default {
    template: `
        <section v-if="isFilterOpen" class="notes-filter">
            Filter By title: <input type="text" placeholder="Filter notes" 
            v-on:keyup.enter="emitFilter" v-model="filterBy.title" /> 
            <br/>
             
        </section> 
    `,
    data() {
        return {
            filterBy: {
                title: '',
            },
            isFilterOpen: false,
        }
    },
    methods: {
        emitFilter() {
            this.$emit('filtered', { ...this.filterBy })
        }
    },
    created() {
        eventBus.$on(EVENT_TOGGLE_SEARCH, ()=>{
            this.isFilterOpen = !this.isFilterOpen
        })
    },
}