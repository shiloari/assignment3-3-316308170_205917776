<template>
    <div id="app" style="overflow:scroll;">
        <div id="table1" v-show="this.items && this.totalItems == this.items.length  && this.finished">
            <h1>Standing Current</h1>
            <b-table hover head-variant="dark" show-empty :items="Matches" :fields="fields" :current-page="currentPage" :per-page="perPage" style="background-color:white">
                <template #cell(Home_Team_name)="data">
                    <a :href="'/#/teams/'+ teleportToTeam(data.value)">{{ data.value }}</a>
                </template>
                <template #cell(Away_Team_name)="data">
                    <a :href="'/#/teams/'+ teleportToTeam(data.value)">{{ data.value }}</a>
                </template>
                <template #cell(Favorite)="data" >
                     <!-- <button type="button" class="btn btn-primary" style="background:none;border:none;" @click="addMatchToFavorite" >
                         <b-icon icon="star" aria-hidden="true" style="background:none;fill:black;"></b-icon>
                     </button> -->
                     <div v-bind:class="favorite_state" class="stam" id="star" @click="check_star(data.index)" @mouseleave="disable_favorite">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-star star"  viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                        </svg>
                    </div>
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
                    if(match.Score)
                        this.oldMatches.push(match);
                    else
                        this.Matches.push(match);
                })
                this.finished = true
                for (const match in this.Matches) {
                    this.set_favorite_status(this.Matches[match].Match_ID)
                }
            }
        }
    },
    created() {
        this.fetchData().catch(error => {
        console.error(error)
        })
    },
    methods: {
        disable_favorite(){
            this.hover_favorite = false;
        },
        async check_star(row_id){
            let Display_ID = row_id;
            this.hover_favorite = true;
            if (this.favorite_state == "favorite_unchecked"){
                try{
                const response = await this.$root.server.post(`users/favoriteMatches`, {
                    id: Display_ID 
                }, {
                     withCredentials: true
                });
                this.favorite_state = "favorite_checked";
                return;
                }
                catch(error){

                }
            }
            else 
                try{
                const response = await this.$root.server.delete(`users/favoriteMatches/${Display_ID}`, {
                     withCredentials: true
                });
                }
                catch(error){

                }
                this.favorite_state = "favorite_unchecked";
                return;
        },
        async set_favorite_status(match_id){
            var display_ID = match_id;
            try{
                console.log(document.getElementByClass("stam"))
                document.getElementById("star").style.pointerEvents = "none";
                const response = (await this.$root.server.get(`users/favoriteMatches`, {
                    withCredentials: true
                })).data;
                console.log(response)
                const favorites_in_list = response.filter(favorite => favorite.id == display_ID);
                if (favorites_in_list.length == 0){
                    this.favorite_state = "favorite_unchecked"
                }
                else{
                    this.favorite_state = "favorite_checked"
                }
                document.getElementById("star").style.pointerEvents = "auto";
            }
            catch(error){
               this.favorite_state = "favorite_unchecked";
               document.getElementById("star").style.pointerEvents = "auto";
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
</style>
