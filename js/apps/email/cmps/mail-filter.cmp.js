export default {
    template:`
        <section>
            <select v-on:change="emitFilter($event)" v-model="selectedFilter">
                <option value="subjectUp">A - Z</option>
                <option value="subjectDown">Z - A</option>
                <option value="dateUP">Date ⇧</option>
                <option value="dateDown">Date ⇩</option>
            </select>
            Search <input type="text" placeholder="By subject" v-on:keyup="emitSearch" v-model="filter.subject"/>
            <!-- <button v-on:click="emitSearch">Sort by date</button> -->
        </section>
    `,
    data() {
        return {
            filter: {
                subject: '',
                date: Date.now(),
            },
            selectedFilter: 'subjectUp'
        }
    },
    methods: {
        emitSearch(event) {
            console.log('search', this.filter);
            this.$emit('searched', {...this.filter})
        },
        emitFilter(event) {
            console.log("selectedFilter:saw  ", this.selectedFilter)
            this.$emit('filterBySubject', this.selectedFilter)
        }
    }
}