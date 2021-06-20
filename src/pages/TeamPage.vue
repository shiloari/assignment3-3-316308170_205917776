<template>
<div class="main">
    <div v-if="!this.is_loaded" class="d-flex justify-content-center" style="margin-top: 15%;">
        <div id="waiting" class="spinner-border text-dark" style="width: 5rem; height: 5rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <div v-show="this.is_loaded" >
        <div class="top_content">
            <div class="team_section">
                <div v-bind:class="favorite_state" v-show="this.$session.exists()" id="team_star" @click="check_star">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-star star"  viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                    </svg>
                </div>
                <img v-bind:src= "team_logo_path">
                <h2>{{ this.short_code }}</h2>
                <h1>{{ this.team_name }}</h1>
                <h4> Founded: {{ this.founded }} </h4>
            </div>
            <div class="coach_section">
                <h1> Team's Coach </h1>
                <PreviewDisplay class="coach_display"
                    :Display_ID="parseInt(this.coach.id)" 
                    :type="'coaches'"
                >
                </PreviewDisplay>
            </div>
        </div>
        <div class="middle_content">
            <div class="players">
                <h1>Team's Players</h1>
                <b-container fluid="sm" style="margin-top:10px;" >
                    <div class="row_container2">
                        <b-row class="row_container3">
                            <b-col cols="12" md="2" v-if="current_player<players.length" :key="this.current_player" class="preview">
                                <PreviewDisplay
                                    :Display_ID="parseInt(players[current_player]['id'])" 
                                    :type="'players'"
                                >
                                </PreviewDisplay>
                            </b-col>
                            <b-col cols="12" md="2" v-if="current_player+1<players.length" :key="this.current_player" class="preview">
                                <PreviewDisplay
                                    :Display_ID="parseInt(players[current_player+1]['id'])" 
                                    :type="'players'"
                                >
                                </PreviewDisplay>
                            </b-col>
                            <b-col cols="12" md="2" v-if="current_player+2<players.length" :key="this.current_player" class="preview">
                                <PreviewDisplay
                                    :Display_ID="parseInt(players[current_player+2]['id'])" 
                                    :type="'players'"
                                >
                                </PreviewDisplay>
                            </b-col>
                            <b-col cols="12" md="2" v-if="current_player+3<players.length" :key="this.current_player" class="preview">
                                <PreviewDisplay
                                    :Display_ID="parseInt(players[current_player+3]['id'])" 
                                    :type="'players'"
                                >
                                </PreviewDisplay>
                            </b-col>
                        </b-row>
                        <b-row class="row_container3">
                            <b-col cols="12" md="2" v-if="current_player+4<players.length" :key="this.current_player" class="preview">
                                <PreviewDisplay
                                    :Display_ID="parseInt(players[current_player+4]['id'])" 
                                    :type="'players'"
                                >
                                </PreviewDisplay>
                            </b-col>
                            <b-col cols="12" md="2" v-if="current_player+5<players.length" :key="this.current_player" class="preview">
                                <PreviewDisplay
                                    :Display_ID="parseInt(players[current_player+5]['id'])" 
                                    :type="'players'"
                                >
                                </PreviewDisplay>
                            </b-col>
                            <b-col cols="12" md="2" v-if="current_player+6<players.length" :key="this.current_player" class="preview">
                                <PreviewDisplay
                                    :Display_ID="parseInt(players[current_player+6]['id'])" 
                                    :type="'players'"
                                >
                                </PreviewDisplay>
                            </b-col>
                            <b-col cols="12" md="2" v-if="current_player+7<players.length" :key="this.current_player" class="preview">
                                <PreviewDisplay
                                    :Display_ID="parseInt(players[current_player+7]['id'])" 
                                    :type="'players'"
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
            <h1>Team's Matches</h1>
            <div class="matches_section">
                <b-container fluid="sm" >
                    <div class="row_container2">
                        <b-row class="row_container3">
                            <div class="game_preview">
                            <b-col  v-if="current_match < matches.length" :key="this.current_match">
                                <GamePreview id="favorite"
                                    :Match_ID="matches[current_match]['Match_ID']" 
                                    :Home_Team_ID="matches[current_match]['Home_Team_ID']" 
                                    :Away_Team_ID="matches[current_match]['Away_Team_ID']" 
                                    :Match_Date="matches[current_match]['Match_Date']" 
                                    :Hour="matches[current_match]['Hour']" 
                                    :Stadium="matches[current_match]['Stadium']"
                                    :Stage="matches[current_match]['Stage']"
                                    :Score="matches[current_match]['Score']"
                                    :EventBook="matches[current_match]['EventBook']"
                                    >
                                </GamePreview>
                            </b-col>
                            </div>
                            <div class="game_preview">
                            <b-col  v-if="current_match + 1 <matches.length" :key="this.current_match">
                                <GamePreview id="favorite"
                                    :Match_ID="matches[current_match+1]['Match_ID']" 
                                    :Home_Team_ID="matches[current_match+1]['Home_Team_ID']" 
                                    :Away_Team_ID="matches[current_match+1]['Away_Team_ID']" 
                                    :Match_Date="matches[current_match+1]['Match_Date']" 
                                    :Hour="matches[current_match+1]['Hour']" 
                                    :Stadium="matches[current_match+1]['Stadium']"
                                    :Stage="matches[current_match+1]['Stage']"
                                    :Score="matches[current_match+1]['Score']"
                                    :EventBook="matches[current_match+1]['EventBook']"
                                    >
                                </GamePreview>
                            </b-col>
                            </div>
                        </b-row>
                    </div>
                </b-container>
            </div>
            <div class="nav_button">
                <b-button-toolbar key-nav aria-label="Toolbar with button groups">
                    <b-button-group class="mx-1">
                    <b-button @click="decrementDisplayMatches">&lsaquo;</b-button>
                    </b-button-group>
                    <b-button-group class="mx-1">
                    <b-button @click="incrementDisplayMatches">&rsaquo;</b-button>
                    </b-button-group>
                </b-button-toolbar>
            </div>
        </div>    
    </div>
</div>
</template>

<script>
import PreviewDisplay from "../components/PreviewDisplay"
import GamePreview from "../components/GamePreview.vue"
export default {
    
    name: "teams",
    data(){
        return{
            team_name: undefined,
            short_code: undefined,
            team_logo_path: undefined,
            founded: undefined,
            players: [],
            coach: undefined,
            matches: [],
            is_loaded : false,
            current_player: 0,
            current_match: 0,
            ready_components: 0,
            favorite_state: undefined
        }
    },
    methods:{
        async check_star(){
            if (this.favorite_state == "favorite_unchecked"){
                try{
                    this.favorite_state = "favorite_checked";
                    const response = await this.$root.server.post(`users/favoriteTeams`, {
                        user_id: undefined,
                        id: this.$route.params.id   
                    }, {
                        withCredentials: true
                    });
                    return;
                }
                catch(error){

                }
            }
            else 
                try{
                     this.favorite_state = "favorite_unchecked";
                    const response = await this.$root.server.delete(`users/favoriteTeams/${this.$route.params.id}`, {
                        withCredentials: true
                    });
                }
                catch(error){

                }
               
                return;
        },
        async set_favorite_status(){
            try{
                // document.getElementById("team_star").style.pointerEvents = "none";
                const response = (await this.$root.server.get(`users/favoriteTeams`, {
                    withCredentials: true
                })).data;
                const favorites_in_list = response.filter(favorite => favorite == this.$route.params.id);
                if (favorites_in_list.length == 0){
                    this.favorite_state = "favorite_unchecked"
                }
                else{
                    this.favorite_state = "favorite_checked"
                }
                // document.getElementById("team_star").style.pointerEvents = "auto";
            }
            catch(error){
               this.favorite_state = "favorite_unchecked";
            //    document.getElementById("team_star").style.pointerEvents = "auto";
            }
           
        },
        decrementDisplay(){
            if (this.current_player - 8 >= 0)
                this.current_player = this.current_player - 8;
        },
        incrementDisplay(){
            if (this.current_player + 8 < this.players.length)
                this.current_player = this.current_player + 8;
        },  
        decrementDisplayMatches(){
            if (this.current_match - 2 >= 0)
                this.current_match = this.current_match - 2;
        },
        incrementDisplayMatches(){
            if (this.current_match + 2 < this.matches.length)
                this.current_match = this.current_match + 2;
        },   
        async getFullData(){
            const team_full_data = this.$root.store.get_team_full_data(this.$route.params.id);
            // const team_full_data = (await this.$root.server.get(`teams/${this.$route.params.id}`)).data;
            // const team_preview = (await  this.$root.server.get(`teams/${this.$route.params.id}/preview`)).data;
            this.team_name = team_full_data.name;
            this.team_logo_path = team_full_data.logo_path;
            this.short_code = team_full_data.short_code;
            this.founded = team_full_data.founded;
            this.players = team_full_data.players;
            this.coach = team_full_data.coach;
            this.stadium = team_full_data.stadium;
        },
        async getTeamMatches(){
            const matches = (await this.$root.server.get(
                `teams/${this.$route.params.id}/matches`
            )).data
            this.matches = matches;
        }
    },
    components:{
        PreviewDisplay,
        GamePreview
    },
    created(){
        this.getTeamMatches();
    },
    mounted(){
        this.set_favorite_status().then(
            ()=>{
                this.getFullData().then(
                    ()=>{
                        setTimeout(
                            ()=>{
                                this.is_loaded = true;
                            }, 2000
                        )
                    }    
                )
            }
        )
    },
}
</script>

<style>

.main_container{
    background: rgba(5, 5, 5, 0.507);
    /* border: solid 2px red; */
    width: 50vw;
    height: 85vh;
    backdrop-filter: blur(10px);
    border-radius: 5%;
    margin: 0 auto;
    margin-top: 15px;
    display: block;

}

.top{
  /* border: solid 2px red;   */
  display: flex;
  margin: 0 auto;
  border-bottom: double 5px white;
  border-bottom-width: length;
  width:90%;
}

.top_content{
    display: flex;
    justify-content: space-around;
    /* margin-bottom: 30px; */
    /* backdrop-filter: blur(5px); */
}

.coach_section{
    background-color: rgba(255, 255, 255, 0.199);
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2); 
    margin-top: 15px;
    padding: 20px;
    backdrop-filter: blur(20px);
    border-radius: 5%;
    z-index: 1;

}

.coach_section:before{
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
    filter: blur(10px);
    backdrop-filter: blur(10px);
    z-index: -1;

}

.coach_section h1{
    text-align: center;
    color: black;
    box-shadow: inset 0 0 200px rgba(255, 255, 255, .5);
    width: max-content;
    margin: 0 auto;
    padding-inline: 15px;
    padding-block: 1px;
    border-radius: 5px;
   
}

.coach_display{
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(25%, 25%);
    margin-top: 20px;
}

.bottom{
    /* border: solid 2px blue; */
    display: flex; 
    flex-wrap: wrap;
}

.bottom_left{
    /* border: solid 2px red; */
    flex: 0 0 50%;
    padding: 10px;

}

.bottom_left img{
    width: 40%;
    display: block;
    margin: 0 auto;
    margin-block: 15px;
}

.team_name{
    display: flex;
    justify-content: space-evenly;
}

.team_name h3, .bottom_left h2, .bottom_left h4{
    /* line-height: 40px; */
    text-align: center;
    color: white;
    margin-block: 5px;
}


.bottom_right{
    /* border: solid 2px pink; */
    flex: 0 0 50%;
    padding: 10px;
}

.personal_info{
    text-align: center;
    color: white;
    /* margin-block: 5px; */
}

.personal_info p{
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    margin-block: 0px;
    font-size: 15px;
}

.row_info{
    display: flex;
    justify-content: space-evenly;
    /* border-bottom: dashed 2px rgba(255, 255, 255, 0.596); */
    margin-top:20px;
}

.main{
    /* border: solid 2px red; */
    /* margin: 0 auto; */
    height: 100%;
    overflow:scroll;
    backdrop-filter: blur(5px);
    /* margin-block: 30px; */
    /* display: flex; */
}

.row_container3{
    /* border: solid 2px green; */
    justify-content: center ;
    margin: -10px;
}

.nav_button{
    margin: 0 auto;
    max-width: max-content;
    margin-bottom: 50px;
    margin-top: 15px;
}

.team_section{
    width: max-content;
    display: block;
    /* background-color: rgba(245, 255, 208, 0.068); */
    width: 30vw;
    height: 55vh;
    /* backdrop-filter: blur(10px); */
    border-radius: 5%;
    margin-top: 15px;
    /* margin-left: 100px; */
    padding-top: 15px;
    background-color: rgba(255, 255, 255, 0.199);
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2); 
    /* margin-top: 15px; */
    padding: 20px;
    backdrop-filter: blur(20px);
    /* border-radius: 5%; */
    z-index: 1;
}

.team_section:before{
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
    filter: blur(10px);
    backdrop-filter: blur(10px);
    z-index: -1;
}

.team_section img{
    width: 150px;
    display: block;
    margin: 0 auto;
}

.team_section h1, .team_section h2, .team_section h4{
    text-align: center;
    color: black;
    margin-block: 5px;
}



.preview{
    margin-inline: 20px;
}

.players{
    margin-top: 15px;
    margin-bottom: 0px;
    /* margin-left: 100px; */
    /* padding-block: 5px; */
    width: 100vw;
    margin-inline: auto;
    /* height: 80vh; */
    /* margin: 0 auto; */
    /* border: solid 0.5px black; */
    /* background: rgba(5, 5, 5, 0.76); */
    height: max-content;
    /* width: 30vw;
    height: 65vh; */
    /* backdrop-filter: blur(5px); */
    border-radius: 3%;
    /* z-index: -10; */
}

.players h1{
    text-align: center;
    color: black;
    /* margin-block: 30px; */
    box-shadow: inset 0 0 200px rgba(255, 255, 255, .5);
    width: max-content;
    /* margin: 0 auto; */
    /* padding-inline: 15px; */
    /* padding-block: 1px; */
}


.favorite_checked{
    width: max-content;
    position: absolute;
    /* float: right; */
}

.favorite_checked svg{
    color: orange;
}

.favorite_unchecked{
    width: max-content;
    position: absolute;
    /* float: right; */
}

.favorite_unchecked svg{
    color: black;
}

#team_star{
    /* float: right; */
    transition: all .3s ease-in-out;
}

#team_star:hover{
    transform: scale(1.2);
    z-index: 100;
    cursor: pointer;
    
}

#waiting{
    /* border: solid 2px red; */
    margin: 0 auto;
}

.matches_section{
    /* border: solid 2px red; */
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.game_preview{
    /* border: solid 2px blue; */
    margin-inline: 30px;
    margin-bottom: 10px;
    /* width: 25rem; */
}

.middle_content h1{
    color: black;
    text-align: center;
    box-shadow: inset 0 0 200px rgba(255, 255, 255, .5);
    width: max-content;
    margin: 0 auto;
    padding-inline: 15px;
    padding-bottom: 5px;
    border-radius: 5px;

}

</style>