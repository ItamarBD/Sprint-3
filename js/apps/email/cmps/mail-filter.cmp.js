export default {
    template:`
        <section>
            Filter <input type="text" placeholder="By subject" v-on:keyup="emitFilter" v-model="filter.subject"/>
            <button v-on:keyup="emitFilter">Sort by date</button>
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
        }
    }
}