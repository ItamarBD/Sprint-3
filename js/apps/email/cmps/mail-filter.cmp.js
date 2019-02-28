export default {
    template:`
        <section>
            Search <input type="text" placeholder="By subject" v-on:keyup="emitFilter" v-model="filter.subject"/>
            <button @click="emitFilter">Sort by subject</button>
</section>
    `,
    data() {
        return {
            filter: {
                subject: '',
                date: Date.now(),
            }
        }
    },
    methods: {
        emitFilter() {
            console.log(this.filter);
            this.$emit('filtered', {...this.filter})
        },

    }
}