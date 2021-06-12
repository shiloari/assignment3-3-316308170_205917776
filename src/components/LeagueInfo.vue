<template>
    <div>
    <div id="league_details">
      <h1><b>{{ this.leagueName }}</b></h1>
      <h2>{{ this.season }}</h2>
      <h3>{{ this.stage }}</h3>
    </div>
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
      }
    };
  },
  components:{
    GamePreview
  },
  methods:{
    async getDetails(){
          try {
            const response = await this.axios.get(
              `${this.$root.api_domain}`,
            );
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
  mounted(){
    this.getDetails();
  }
}
</script>

<style>

#league_details{
  /* border: solid 2px red; */
  /* position: relative; */
  /* top: 0; */
  margin: 0 auto;
  /* padding-top: 100px;
  padding-bottom: 100px; */
  /* padding-bottom: 1000%; */
  z-index: -10;
  text-align: center;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
  /* filter: blur(1px); */
  backdrop-filter: blur(10px);
  /* margin: -20px; */
}

#league_details h1, #league_details h2, #league_details h3{
  color: black;
}

#upcoming_game{
  position: relative;
}

</style>