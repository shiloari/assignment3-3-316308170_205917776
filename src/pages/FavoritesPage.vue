<template>
    <div>
    <div v-if="!this.$session.exists()" class="container">
        <InvalidAccess/>
    </div>
    <div v-else class="main_fav_container">
        <div v-if="this.current_category==undefined" class="d-flex justify-content-center" style="margin-top: 15%;">
            <div id="waiting" class="spinner-border text-dark" style="width: 5rem; height: 5rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div v-else>
            <div class="top_section">
                <div class="user_section">
                    <div class="user" v-show="!img_verified">
                        <img src="https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png">
                    </div>
                    <div class="user" v-show="img_verified">
                        <img id="user_photo" :src = "user_photo" @error="set_default_img" @load="set_user_img">
                    </div>
                </div>
                <div style="text-align: center; color: #2c3e50;">
                    <h1>{{ this.username }}'s Favorites</h1>
                    <div>
                        <b-nav>
                            <b-nav-item class="nav_tab"><div @click="changeCategory('teams')" class="inner_text">Teams</div></b-nav-item>
                            <b-nav-item class="nav_tab"><div @click="changeCategory('players')" class="inner_text">Players</div></b-nav-item>
                            <b-nav-item class="nav_tab"><div @click="changeCategory('coaches')" class="inner_text">Coaches</div></b-nav-item>
                            <b-nav-item class="nav_tab"><div @click="changeCategory('matches')" class="inner_text">Matches</div></b-nav-item>
                        </b-nav>
                    </div>
                </div>
            </div>
            <div class="favorites">
                <transition name="fade">
                <div :key="[this.current_display_matches,this.current_category]">
                <b-container v-if="current_category =='matches'" fluid="sm" style="width: max-content" >
                            <b-row class="matches_row">
                                <b-col v-if="current_display_matches<current_favorites.length" :key="this.current_display_matches" class="preview">
                                    <GamePreview @deleted_favorite="deleted_match(0)"
                                        :Match_ID="current_favorites[current_display_matches].Match_ID" 
                                        :Home_Team_ID="current_favorites[current_display_matches].Home_Team_ID" 
                                        :Away_Team_ID="current_favorites[current_display_matches].Away_Team_ID" 
                                        :Match_Date="current_favorites[current_display_matches].Match_Date" 
                                        :Hour="current_favorites[current_display_matches].Hour" 
                                        :Stadium="current_favorites[current_display_matches].Stadium"
                                        :Stage="current_favorites[current_display_matches].Stage"
                                        :Score="current_favorites[current_display_matches].Score"
                                        :EventBook="current_favorites[current_display_matches].EventBook"
                                        >
                                    </GamePreview>    
                                </b-col>
                                <b-col  v-if="current_display_matches+1<current_favorites.length" :key="this.current_display_matches" class="preview">
                                    <GamePreview  @deleted_favorite="deleted_match(1)"
                                        :Match_ID="current_favorites[current_display_matches+1].Match_ID" 
                                        :Home_Team_ID="current_favorites[current_display_matches+1].Home_Team_ID" 
                                        :Away_Team_ID="current_favorites[current_display_matches+1].Away_Team_ID" 
                                        :Match_Date="current_favorites[current_display_matches+1].Match_Date" 
                                        :Hour="current_favorites[current_display_matches+1].Hour" 
                                        :Stadium="current_favorites[current_display_matches+1].Stadium"
                                        :Stage="current_favorites[current_display_matches+1].Stage"
                                        :Score="current_favorites[current_display_matches+1].Score"
                                        :EventBook="current_favorites[current_display_matches+1].EventBook"
                                        >
                                    </GamePreview>    
                                </b-col>
                            </b-row>
                </b-container>
                <div v-if="current_favorites.length==0">
                    <h4 style="width: max-content; margin-inline: auto; margin-bottom: 20px;">No avaiable favorites</h4>
                </div>
                </div>
                </transition>
                <transition name="fade">
                <div v-if="current_category !='matches'" :key="[this.current_display,this.current_category]">
                <b-container fluid="sm" style="margin-top:10px;" >
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
                </div>
                </transition>
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
    </div>
    </div>
</template>
<script>
import GamePreview from "../components/GamePreview.vue"
import PreviewDisplay from "../components/PreviewDisplay.vue"
import InvalidAccess from "../components/InvalidAccess.vue"
export default {
    name: "FavoritesPage",
    components:{
        GamePreview,
        PreviewDisplay,
        InvalidAccess
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
            fav_matches: [],
            user_photo: undefined,
            username: undefined,
            img_verified: false
        }
    },
    methods:{
        set_default_img(){
            this.img_verified = false;
        },
        set_user_img(){
            this.img_verified = true;
        },
        setPhoto(){
            this.user_photo = (localStorage.getItem("user_photo") != undefined) ? `${localStorage.getItem("user_photo")}` : "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"
            this.username = localStorage.getItem("username");
       },
        deleted_match(offset){
            this.current_favorites.splice(this.current_display_match+offset,1)
            this.re_render++;
            
        },
        deleted(offset){
            this.current_favorites.splice(this.current_display+offset,1)
            this.re_render++;
            
        },
        decrementDisplay(){
        if (this.current_display_matches - 2 >= 0 && this.current_category == "matches")
            this.current_display_matches = this.current_display_matches - 2;
        if (this.current_display - 4 >= 0 && this.current_category != "matches")
            this.current_display = this.current_display - 4;
        },
        incrementDisplay(){
            if (this.current_display_matches + 2 < this.current_favorites.length && this.current_category == "matches")
                this.current_display_matches = this.current_display_matches + 2;
            if (this.current_display + 4 < this.current_favorites.length && this.current_category != "matches")
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
                const coaches_response = (await this.$root.server.get(`users/favoriteCoaches`, {
                    withCredentials: true
                })).data
                this.fav_coaches = coaches_response
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
                 this.current_category = "players"
            }
        }
    },
    created(){
      this.fetchFavorites();
      this.setPhoto();

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
    /* overflow: scroll; */
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

.user{
    /* border: solid 2px blue; */
    width: max-content;
    border-radius: 50%;
    margin-inline: auto;
    
}

.user img{
    width: 150px;
    height: auto;
    border-radius: 50%;
    border: 10px groove rgb(255, 255, 255);
    margin: 10px;

}

.top_section{
    display: flex;
    justify-content: center;
    align-content: center;
    vertical-align:middle;
    width: max-content;
    margin-inline: auto;
    margin-top: 10px;
}

.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter {
  opacity: 0;
}
</style>