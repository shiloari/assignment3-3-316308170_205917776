<template>
    <div class = "league_info"> 
    <div class="d-flex justify-content-center" v-if="!this.is_loaded" style="margin-top: 25vh;">
        <div id="waiting" class="spinner-border text-light" style="width: 5rem; height: 5rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div> 
    <div v-if="this.is_loaded">
    <div id="league_details">
      <img src="../assets/superliga.png" style="width: 150px; height: auto;">
      <h1><b>{{ this.leagueName }}</b></h1>
      <h2>{{ this.season }}</h2>
      <h3>{{ this.stage }}</h3>
    </div>
    <div id="next_game">
      <h2><b>Next Game</b></h2>
    </div>
    <div>
      <GamePreview id="upcoming_game" v-if="upcoming_game.Match_ID"
        :Match_ID="this.upcoming_game.Match_ID" 
        :Home_Team_ID="this.upcoming_game.Home_Team_ID" 
        :Away_Team_ID="this.upcoming_game.Away_Team_ID" 
        :Match_Date="this.upcoming_game.Match_Date" 
        :Hour="this.upcoming_game.Hour" 
        :Stadium="this.upcoming_game.Stadium"
        :Stage="this.upcoming_game.Stage"
       >
      </GamePreview>
    </div>
    </div>
    </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
 data() {
    return {
      leagueName: undefined, 
      season: undefined, 
      stage: undefined,
      upcoming_game: {
        Match_ID: undefined,
        Home_Team_ID: undefined,
        Away_Team_ID: undefined,
        Match_Date: undefined,
        Hour: undefined,
        Stadium: undefined,
        Stage: undefined
      },
      is_loaded: false
    };
  },
  components:{
    GamePreview
  },
  methods:{
    async getDetails(){
          try {
            const response = await this.$root.server.get();
            let details = response.data;
            this.leagueName = details.league_name;
            this.season = details.season_name,
            this.stage = details.stage_name,
            this.upcoming_game = details.upcoming_game,
            this.upcoming_game.Match_ID = details.upcoming_game.Match_ID,
            this.upcoming_game.Home_Team_ID = details.upcoming_game.Home_Team_ID,
            this.upcoming_game.Away_Team_ID = details.upcoming_game.Away_Team_ID,
            this.upcoming_game.Match_Date = details.upcoming_game.Match_Date,
            this.upcoming_game.Hour = details.upcoming_game.Hour,
            this.upcoming_game.Stadium = details.upcoming_game.Stadium,
            this.upcoming_game.Stage = details.upcoming_game.Stage
          } catch (error) {
            console.log("error in update games")
            console.log(error);
          }
        }
  },
  computed:{

  },
  created(){
    this.getDetails().then(
      ()=>{
        setTimeout(
          ()=>{this.is_loaded = true;}
        ),1500 }
    );
  }
}
</script>

<style>

#next_game{
  color: rgb(0, 0, 0);
  margin: 0 auto;
  display: block;
  text-align: center;
  margin-block: 5px;
}

.league_info{  
  height: 100vh;
  width: 25rem;
  display: flex;
  flex-direction: column; 
  justify-content: space-between;

}

#league_details:before{
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

#league_details{
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2); 
  border-radius: 5px;
  position: relative;
  z-index: 1;
  background: inherit;
  overflow: hidden;
  position: relative;
  text-align: center;
  padding-block: 10px;
}

#upcoming_game{
    margin-bottom: 15%;
}

#league_details h1, #league_details h2, #league_details h3{
  color: white;
}


</style>