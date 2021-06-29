<template>
    <div class="main_fav_container">
        <div>
            <b-nav>
                <b-nav-item class="nav_tab"><div @click="changeCategory('teams')" class="inner_text">Teams</div></b-nav-item>
                <b-nav-item class="nav_tab"><div @click="changeCategory('players')" class="inner_text">Players</div></b-nav-item>
                <b-nav-item class="nav_tab"><div @click="changeCategory('coaches')" class="inner_text">Coaches</div></b-nav-item>
                <b-nav-item class="nav_tab"><div @click="changeCategory('matches')" class="inner_text">Matches</div></b-nav-item>
            </b-nav>
        </div>
        <div class="favorites">
            <b-container v-if="current_category =='matches'" fluid="sm" style="width: max-content" >
                        <b-row class="matches_row">
                            <b-col v-if="current_display_matches<current_favorites.length" :key="this.current_display_matches" class="preview">
                                 <GamePreview
                                    :Match_ID="current_favorites[current_display_matches].Match_ID" 
                                    :Home_Team_ID="current_favorites[current_display_matches].Home_Team_ID" 
                                    :Away_Team_ID="current_favorites[current_display_matches].Away_Team_ID" 
                                    :Match_Date="current_favorites[current_display_matches].Match_Date" 
                                    :Hour="current_favorites[current_display_matches].Hour" 
                                    :Stadium="current_favorites[current_display_matches].Stadium"
                                    :Stage="current_favorites[current_display_matches].Stage"
                                    :Score="current_favorites[current_display_matches].Score"
                                    :EventBook="current_favorites[current_display_matches].EventBook"
                                    :key="current_favorites[current_display_matches].id">
                                </GamePreview>    
                            </b-col>
                            <b-col  v-if="current_display_matches<current_favorites.length" :key="this.current_display_matches" class="preview">
                                 <GamePreview
                                    :Match_ID="current_favorites[current_display_matches+1].Match_ID" 
                                    :Home_Team_ID="current_favorites[current_display_matches+1].Home_Team_ID" 
                                    :Away_Team_ID="current_favorites[current_display_matches+1].Away_Team_ID" 
                                    :Match_Date="current_favorites[current_display_matches+1].Match_Date" 
                                    :Hour="current_favorites[current_display_matches+1].Hour" 
                                    :Stadium="current_favorites[current_display_matches+1].Stadium"
                                    :Stage="current_favorites[current_display_matches+1].Stage"
                                    :Score="current_favorites[current_display_matches+1].Score"
                                    :EventBook="current_favorites[current_display_matches+1].EventBook"
                                    :key="current_favorites[current_display_matches+1].id">
                                </GamePreview>    
                            </b-col>
                        </b-row>
            </b-container>
            <b-container v-else fluid="sm" style="margin-top:10px;" >
                    <div class="row_container2">
                        <b-row class="row_container3">
                            <b-col cols="12" md="2" v-if="current_display<current_favorites.length" :key="this.current_display" class="preview">
                                <PreviewDisplay :key="re_render" @deleted_favorite="deleted(0);"
                                    :Display_ID="parseInt(current_favorites[current_display])" 
                                    :type="current_category"
                                >
                                </PreviewDisplay>
                            </b-col>
                            <b-col cols="12" md="2" v-if="current_display+1<current_favorites.length" :key="this.current_display" class="preview">
                                 <PreviewDisplay  :key="re_render" @deleted_favorite="deleted(1);"
                                    :Display_ID="parseInt(current_favorites[current_display+1])" 
                                    :type="current_category"
                                >
                                </PreviewDisplay>
                            </b-col>
                            <b-col cols="12" md="2" v-if="current_display+2<current_favorites.length" :key="this.current_display" class="preview">
                                 <PreviewDisplay  :key="re_render" @deleted_favorite="deleted(2);"
                                    :Display_ID="parseInt(current_favorites[current_display+2])" 
                                    :type="current_category"
                                >
                                </PreviewDisplay>
                            </b-col>
                            <b-col cols="12" md="2" v-if="current_display+3<current_favorites.length" :key="this.current_display" class="preview">
                                 <PreviewDisplay  :key="re_render" @deleted_favorite="deleted(3);"
                                    :Display_ID="parseInt(current_favorites[current_display+3])" 
                                    :type="current_category"
                                >
                                </PreviewDisplay>
                            </b-col>
                        </b-row>
                    </div>
            </b-container>
            <div class="nav_button">
                    <b-button-toolbar key-nav aria-label="Toolbar with button groups">
                        <b-button-group class="mx-1">
                        <b-button @click="decrementDisplay">&lsaquo;</b-button>
                        </b-button-group>
                        <b-button-group class="mx-1">
                        <b-button @click="incrementDisplay">&rsaquo;</b-button>
                        </b-button-group>
                    </b-button-toolbar>
            </div>
        </div>
    </div>
</template>
<script>
import GamePreview from "../components/GamePreview.vue"
import PreviewDisplay from "../components/PreviewDisplay.vue"
export default {
    name: "FavoritesPage",
    components:{
        GamePreview,
        PreviewDisplay
    },
    data(){
        return{
            re_render: 0,
            current_category: undefined,
            current_display: 0,
            current_display_matches: 0,
            current_favorites: [],
            fav_players: [],
            fav_coaches: [],
            fav_teams: [],
            fav_matches: []
        }
    },
    methods:{
        deleted(offset){
            this.current_favorites.splice(this.current_display+offset,1)
            this.re_render++;
            
        },
        decrementDisplay(){
        if (this.current_display_matches - 2 >= 0)
            this.current_display_matches = this.current_display_matches - 2;
        if (this.current_display - 4 >= 0)
            this.current_display = this.current_display - 4;
        },
        incrementDisplay(){
            if (this.current_display_matches + 2 < this.current_favorites.length)
                this.current_display_matches = this.current_display_matches + 2;
            if (this.current_display + 4 < this.current_favorites.length)
                this.current_display = this.current_display + 4;
        },  
        changeCategory(category){
            this.current_category = category;
            switch (category){
                case "players":
                    this.current_favorites = this.fav_players
                    break;
                case "teams":
                    this.current_favorites = this.fav_teams;
                    break;
                case "coaches":
                    this.current_favorites = this.fav_coaches;
                    break;
                case "matches":
                    this.current_favorites = this.fav_matches;
                    break;
            }
            this.re_render++;
            this.current_display = 0;
            this.current_display_matches = 0;

        },
        async fetchFavorites(){
            try{
                
                const players_response = (await this.$root.server.get(`users/favoritePlayers`, {
                    withCredentials: true
                })).data
                this.fav_players = players_response
                const teams_response = (await this.$root.server.get(`users/favoriteTeams`, {
                    withCredentials: true
                })).data;
                this.fav_teams = teams_response
                const matches_response = (await this.$root.server.get(`users/favoriteMatches`, {
                    withCredentials: true
                })).data;
                this.fav_matches = matches_response
                console.log(this.fav_players,this.fav_teams,this.fav_matches)
                this.current_favorites = this.fav_players
                this.current_category = "players"
                this.re_render++;
            }
            catch(error){
                console.log(error.message)
            }
        }
    },
    created(){
      this.fetchFavorites();

    }
}
</script>
<style>
.nav{
    width: max-content;
    margin-top:20px;
    margin-inline: auto;
    border: none;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2); 
    border-radius: 5px;
    position: relative;
    z-index: 1;
    background: inherit;
    overflow: hidden;
}

.nav:before{
    content: "";
    position: absolute;
    background: inherit;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
    filter: blur(10px);
    backdrop-filter: blur(10px);
}

.nav_tab{
    margin-inline: 5px;
}

.inner_text{
    transition: all .2s ease-in-out;
    color: black;
}
 

.inner_text:hover{
    transform: scale(1.2);
}

.main_fav_container{
    overflow: scroll;
    width: 100%;
    height: 100%;
}

.favorites{
    height: 110%;
}

.nav_button{
    margin-inline: auto;
}

.matches_row{
    /* border: solid 2px red; */
    justify-content: space-evenly;
    width: max-content;
    margin-inline: auto;
}
</style>