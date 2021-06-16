<template>
<div >
    <div class="main">
        <b-container fluid="sm"  >
            <div v-for="index in (0,players.length)" :key="index" class="row_container">
                <div v-if="index<current_player+9 && index > current_player" class="row_container2">
                    <b-row v-if="index%4==0" class="row_container3">
                        <b-col cols="12" md="2" v-show="index<players.length">
                            <PreviewDisplay
                                :Display_ID="parseInt(players[index]['id'])" 
                                :type="'players'"
                            >
                            </PreviewDisplay>
                        </b-col>
                        <b-col cols="12" md="2" v-show="index-1<players.length">
                            <PreviewDisplay
                                :Display_ID="parseInt(players[index-1]['id'])" 
                                :type="'players'"
                            >
                            </PreviewDisplay>
                        </b-col>
                        <b-col cols="12" md="2" v-show="index-2<players.length">
                            <PreviewDisplay
                                :Display_ID="parseInt(players[index-2]['id'])" 
                                :type="'players'"
                            >
                            </PreviewDisplay>
                        </b-col>
                        <b-col cols="12" md="2" v-show="index-3<players.length">
                            <PreviewDisplay
                                :Display_ID="parseInt(players[index-3]['id'])" 
                                :type="'players'"
                            >
                            </PreviewDisplay>
                        </b-col>
                    </b-row>
                </div>
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
import PreviewDisplay from "../components/PreviewDisplay"
export default {
    
    name: "teams",
    data(){
        return{
            team_name: undefined,
            team_common_name: undefined,
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
            let addition = 0;
            while (this.current_player + 8 < this.players.length-1 && addition < 8){
                addition++;
            }   
            if (addition%8 == 0){
                this.current_player = this.current_player + addition;

            }
            
        },
        async getFullData(){
            const team_full_data = this.$root.store.get_team_full_data(this.$route.params.id);
            // const team_full_data = (await this.$root.server.get(`teams/${this.$route.params.id}`)).data;
            // const team_preview = (await  this.$root.server.get(`teams/${this.$route.params.id}/preview`)).data;
            this.name = team_full_data.name;
            this.photo = team_full_data.logo_path;
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

.coach{
    /* border: solid 2px blue; */
    width: max-content;
    border-radius: 50%;
    
}

.coach img{
    width: 150px;
    height: auto;
    border-radius: 50%;
    border: 10px groove rgb(255, 255, 255);
    margin: 10px;

}

.coach_name{
    margin: 0 auto;
}

.coach_name h1{
    color: white;
    text-align: center;
    transform: translate(0%,50%);  
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
    margin: 0 auto;
    margin-block: 30px;
}

.row_container3{
    /* border: solid 2px green; */
    justify-content: center ;
    margin: -10px;
}

.nav_button{
    margin: 0 auto;
    max-width: max-content;
}
</style>