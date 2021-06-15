<template>
    <div id="app">
        <b-table show-empty :items="items" :fields="fields" :current-page="currentPage" :per-page="0"></b-table>
        <b-pagination size="md" :total-rows="totalItems" v-model="currentPage" :per-page="perPage"></b-pagination>
    </div>  
</template>
<script>
export default {
    name:"StandingPage",
    data() {
        return {
        items: [],
        fields: [{
            key: 'Home_Team_ID',
            label: 'Home team ID'
            },
            {
            key: 'Away_Team_ID',
            label: 'Away team ID'
            },
            {
            key: 'Match_Date',
            label: 'Date'
            },
            {
            key: 'Hour',
            label: 'Hour'
            },
            {
            key: 'Stadium',
            label: 'Stadium'
            }
        ],
        currentPage: 0,
        perPage: 1,
        totalItems: 0
        }
    },
    mounted() {
        this.fetchData().catch(error => {
        console.error(error)
        })
    },
    methods: {
        async fetchData() {
        this.items = await this.$root.server.get(`matches/get_all_matches`)
            .then(async (res) =>{       
                const data = res.data;
                this.totalItems = data.length
                var result = new Array();
                const wait = await data.forEach(async(element) => {
                    const match = ((await this.$root.server.get(`matches/${element}`)).data[0])
                    result.push(match)
                    this.items = result
                })            
             
                })
        }
    },
    // watch: {
    //     currentPage: {
    //         handler: function(value) {
    //             this.fetchData().catch(error => {
    //             console.error(error)
    //             })
    //     }}
    // }
}
</script>
<style scoped>

</style>
