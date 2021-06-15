<template>
    <div id="app" style="overflow:scroll;">
        <div id="table1" v-if="this.items && this.totalItems == this.items.length  && this.finished">
            <h1>Standing Current</h1>
            <b-table hover head-variant="dark" show-empty :items="Matches" :fields="fields" :current-page="currentPage" :per-page="perPage" style="background-color:white">
                <template #cell(Home_Team_name)="data">
                    <a :href="'/#/teams/'+ teleportToTeam(data.value)">{{ data.value }}</a>
                </template>
                <template #cell(Away_Team_name)="data">
                    <a :href="'/#/teams/'+ teleportToTeam(data.value)">{{ data.value }}</a>
                </template>
                <template #cell(Favorite)>
                     <button type="button" class="btn btn-primary" style="background:none;border:none;" @click="addMatchToFavorite" >
                         <b-icon icon="star" aria-hidden="true" style="background:none;fill:black;"></b-icon>
                     </button>
                </template>
            </b-table>
            <b-pagination size="md" :total-rows="Matches.length" v-model="currentPage" :per-page="perPage"></b-pagination>
        </div>
        <div id="table2" v-if="this.items && this.totalItems == this.items.length && this.finished">
            <h1>Standing History</h1>
            <b-table hover head-variant="dark" show-empty :items="oldMatches" :fields="oldfields" :current-page="oldCurrentPage" :per-page="perPage" style="background-color:white">
                <template #cell(Home_Team_name)="data">
                    <a :href="'/#/teams/'+ teleportToTeam(data.value)">{{ data.value }}</a>
                </template>
                <template #cell(Away_Team_name)="data">
                    <a :href="'/#/teams/'+ teleportToTeam(data.value)">{{ data.value }}</a>
                </template>
            </b-table>
            <b-pagination size="md" :total-rows="oldMatches.length" v-model="oldCurrentPage" :per-page="perPage"></b-pagination>
        </div>
    </div>  
</template>
<script>
export default {
    name:"StandingPage",
    data() {
        return {
        items: [],
        Matches: [],
        fields: [{
            key: 'Home_Team_name',
            label: 'Home team Name'
            },
            {
            key: 'Away_Team_name',
            label: 'Away team Name'
            },
            {
            key: 'Match_Date',
            label: 'Date'
            },
            {key: 'Hour'},
            {key: 'Stadium'},
            {key: 'Favorite'}
        ],
        oldMatches: [],
        oldfields: [{
            key: 'Home_Team_name',
            label: 'Home team Name'
            },
            {
            key: 'Away_Team_name',
            label: 'Away team Name'
            },
            {
            key: 'Match_Date',
            label: 'Date'
            },
            {key: 'Hour'},
            {key: 'Stadium'},
            {key: 'Score'},
            {key: 'EventBook'}
        ],
        currentPage: 1,
        oldCurrentPage: 1,
        perPage: 5,
        totalItems: 0,
        finished: false
        }
    },
    watch:{
        items: function(){
            if(this.items && this.totalItems == this.items.length){
                this.items.map((match) =>{
                    match.Home_Team_name = (this.$root.store.get_team_full_data(match.Home_Team_ID)).name ;
                    match.Away_Team_name = (this.$root.store.get_team_full_data(match.Away_Team_ID)).name ;
                    if(match.Score)
                        this.oldMatches.push(match);
                    else
                        this.Matches.push(match);
                })
                this.finished = true
            }
        }
    },
    created() {
        this.fetchData().catch(error => {
        console.error(error)
        })
    },
    methods: {
        addMatchToFavorite : function(){
            
        },
        teleportToTeam : function (team_name){
            var matches = this.items
            for (var i = 0; i < matches.length; i++) {
                let match = matches[i];
                if(match.Home_Team_name == team_name)
                    return match.Home_Team_ID
                if(match.Away_Team_name == team_name)
                    return match.Away_Team_ID
                }
        },
        async fetchData() {
        this.items = await this.$root.server.get(`matches/get_all_matches`)
            .then(async (res) =>{       
                const data = res.data;
                this.totalItems = data.length
                var result = new Array();
                await data.forEach(async(element) => {
                    const match = ((await this.$root.server.get(`matches/${element}`)).data[0])
                    result.push(match)
                    this.items = result
                })          
            })
        }
    },

}
</script>
<style scoped>
    
</style>
