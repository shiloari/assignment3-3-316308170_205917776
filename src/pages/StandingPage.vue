<template>
    <div class="main_page">
        <div v-if="!this.finished" class="d-flex justify-content-center" style="margin-top: 15%;">
            <div id="waiting" class="spinner-border text-dark" style="width: 5rem; height: 5rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div class="standings">
            <div id="table1" v-show="this.items && this.totalItems == this.items.length  && this.finished">
                <h1>Current Standings</h1>
                <b-table id="table_1" ref="table" hover head-variant="dark" show-empty :items="Matches" :fields="fields" :current-page="currentPage" :per-page="perPage" style="background-color:white">
                    <template #cell(Home_Team_name)="data">
                        <a :href="'/#/teams/'+ teleportToTeam(data.value)">{{ data.value }}</a>
                    </template>
                    <template #cell(Away_Team_name)="data">
                        <a :href="'/#/teams/'+ teleportToTeam(data.value)">{{ data.value }}</a>
                    </template>
                    <template #cell(Favorite) = "data" >
                        <button type="button" class="btn btn-primary" style="background:none;border:none;" @click="addMatchToFavorite(data)" >
                            <b-icon v-bind:id="data.index" icon="star" aria-hidden="true" style="background:none;fill:black;" ></b-icon>
                        </button>
                    </template>
                </b-table>
                <div class="paginiation">
                    <b-pagination aria-controls="table_1" size="md" :total-rows="Matches.length" v-model="currentPage" :per-page="perPage"></b-pagination>
                </div>
            </div>
            <div id="table2" v-if="this.items && this.totalItems == this.items.length && this.finished">
                <h1>History Standings</h1>
                <b-table hover head-variant="dark" show-empty :items="oldMatches" :fields="oldfields" :current-page="oldCurrentPage" :per-page="perPage" style="background-color:white">
                    <template #cell(EventBook) = "data" >                        
                        <b-dropdown id="dropdown-form" text="Show Events" ref="dropdown" class="m-2">
                            {{data.item.EventBook}}
                        </b-dropdown>
                    </template>
                    <template #cell(Home_Team_name)="data">
                        <a :href="'/#/teams/'+ teleportToTeam(data.value)">{{ data.value }}</a>
                    </template>
                    <template #cell(Away_Team_name)="data">
                        <a :href="'/#/teams/'+ teleportToTeam(data.value)">{{ data.value }}</a>
                    </template>
                </b-table>
                <div class="paginiation">
                    <b-pagination size="md" :total-rows="oldMatches.length" v-model="oldCurrentPage" :per-page="perPage"></b-pagination>
                </div>
            </div>
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
            {
            key: 'Favorite'
            }
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
        finished: false,
        hover_favorite: false,
        favorite_state: undefined
        }
    },
    watch:{
        items: function(){
            if(this.items && this.totalItems == this.items.length){
                this.items.map((match) =>{
                    match.Home_Team_name = (this.$root.store.get_team_full_data(match.Home_Team_ID)).name ;
                    match.Away_Team_name = (this.$root.store.get_team_full_data(match.Away_Team_ID)).name ;
                    match.Favorite = false
                    if(match.Score)
                        this.oldMatches.push(match);
                    else
                        this.Matches.push(match);
                })
                this.Match_ID = [...this.Matches]
                this.favoritesStar();
                setTimeout(
                    ()=>{
                        this.finished = true
                    }, 1000
                )
            }
        }
    },
    created() {
        this.fetchData()
        .catch(error => {
        console.error(error)
        })
    },
    methods: {
        favoritesStar : async function(){
            try{
                const response = (await this.$root.server.get(`users/favoriteMatches`, {
                    withCredentials: true
                })).data;
                for(let i=0;i<response.length;i++){
                    let element = response[i];
                    for(let j=0;j<this.Matches.length;j++){
                        let match = this.Matches[j];
                        if(element.Match_ID == match.Match_ID){
                            match.Favorite = true
                            document.getElementById(j).style.fill = 'orange'
                        }
                    }
                }
            }
            catch(error){
               console.log(error);
            }      
        },
        addMatchToFavorite : async function(data){
            try{
                const match_id = data.item.Match_ID
                if(!data.item.Favorite){
                        const response = await this.$root.server.post(`users/favoriteMatches`, {
                        id: match_id
                    }, {
                            withCredentials: true
                    });
                    data.item.Favorite = true
                    document.getElementById(data.index).style.fill = "orange"
                    this.$root.toast("Add Match to Favorite", "Match add successfully", "success");
                }
                else{
                        const response = await this.$root.server.delete(`users/favoriteMatches/${match_id}`, {
                            withCredentials: true
                    });
                    data.item.Favorite = false
                    document.getElementById(data.index).style.fill = "black"
                    this.$root.toast("Remove Match to Favorite", "Match removed successfully", "success");
                }
            }
            catch(error){
                this.$root.toast("Not logged", "user need to login for adding Match to favorite!", "danger");
            }

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
        this.items = await this.$root.server.get(`matches/`, {
                    withCredentials: true})
            .then(async (res) =>{       
                const data = res.data;
                this.totalItems = data.length
                var result = new Array();
                await data.forEach(async(element) => {
                    const match = ((await this.$root.server.get(`matches/${element}`, {
                    withCredentials: true})).data[0])
                    result.push(match)
                    this.items = result
                })          
            })
        return this.Matches
        }
    },

}
</script>
<style scoped>
    .favorite_checked{
    width: max-content;
    float: right;
}

.favorite_checked svg{
    color: orange;
}

.favorite_unchecked{
    width: max-content;
    float: right;
}

.favorite_unchecked svg{
    color: black;
}

.star{
    transition: all .3s ease-in-out;
    /* margin: 5px; */
    
}

.star:hover{
    transform: scale(1.2);
    z-index: 100;
}

.main_page{
    width: 100%;
    height: 100%;
    overflow:scroll;
    backdrop-filter: blur(5px);
}

#table1 h1{
    color: white;
    margin-block: 20px;
    text-align: center;
}

#table2 h1{
    color: white;
    margin-block: 20px;
    text-align: center;
}


.paginiation{
    margin: 0 auto;
    display: block;
    width: max-content;
}

.standings{
    margin-bottom: 100px;
    padding-inline: 20px;
}
</style>
