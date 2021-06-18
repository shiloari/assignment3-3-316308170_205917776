<template>
    <div class="main" >
        <div class="top_content">
        <div class="team_section">
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
        <div>
            <div class="players">
            <h1>Our Players</h1>
            <b-container fluid="sm" >
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
        </div>    
    </div>
</template>

<script>
import PreviewDisplay from "../components/PreviewDisplay"
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
            perPage: 3,
            currentPage: 1
        }
    },
    methods:{
        decrementDisplay(){
            if (this.current_player - 8 >= 0)
                this.current_player = this.current_player - 8;
        },
        incrementDisplay(){
            if (this.current_player + 8 < this.players.length)
                this.current_player = this.current_player + 8;
            // let addition = 0;
            // while (this.current_player + 8 < this.players.length-1 && addition < 8){
            //     addition++;
            // }   
            // if (addition%8 == 0){
            //     this.current_player = this.current_player + addition;
            // }
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
        }
    },
    components:{
        PreviewDisplay
    },
    mounted(){
        this.getFullData().then(()=>{
            this.is_loaded = true;
        });
    },
}
</script>

<style>

.main_container{
    background: rgba(5, 5, 5, 0.76);
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
    margin-bottom: 30px;
}

.coach_section{
    /* border: solid 2px purple; */
    background: rgba(5, 5, 5, 0.76);
    /* margin-left: 150px; */
    margin-top: 15px;
    padding: 20px;
    /* width: 30vw;
    height: 55vh; */
    backdrop-filter: blur(10px);
    border-radius: 5%;
}

.coach_section h1{
    text-align: center;
    color: white;
   
}

.coach_display{
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(20%, 25%);
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
    margin-bottom: 100px;
    margin-top: 40px;
}

.team_section{
    width: max-content;
    display: block;
    background: rgba(5, 5, 5, 0.76);
    width: 30vw;
    height: 55vh;
    backdrop-filter: blur(10px);
    border-radius: 5%;
    margin-top: 15px;
    /* margin-left: 100px; */
    padding-top: 15px;
}

.team_section img{
    width: 150px;
    display: block;
    margin: 0 auto;
}

.team_section h1, .team_section h2, .team_section h4{
    text-align: center;
    color: white;
    margin-block: 5px;
}

.preview{
    margin-inline: 20px;
}

.players{
    margin-top: 40px;
    margin-bottom: 150px;
    /* margin-left: 100px; */
    padding-block: 5px;
    width: 80vw;
    margin-inline: auto;
    /* height: 80vh; */
    /* margin: 0 auto; */
    /* border: solid 2px blue; */
    background: rgba(5, 5, 5, 0.76);
    height: max-content;
    /* width: 30vw;
    height: 65vh; */
    backdrop-filter: blur(5px);
    border-radius: 3%;
    z-index: -10;
}

.players h1{
    text-align: center;
    color: white;
    margin: 10px;
}
</style>