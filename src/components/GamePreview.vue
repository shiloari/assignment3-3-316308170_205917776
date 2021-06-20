<template v-show="this.is_loaded">
  <div class="frosted_glass">
    <!-- <div :title="Match_ID" class="game-title"></div> -->
    <!-- {{ this.is_loaded }} -->
    <div id="teams">
    <div id="team_display">
      <div id="team_logo"><img v-bind:src= "home_team_logo"></div>
      <h5>{{ this.home_team_name }}</h5>
    </div>
    <div id = "vs">
      <p><b> vs.</b> </p>
    </div>
    <div id="team_display">
      <div id="team_logo"><img v-bind:src= "away_team_logo"></div>
      <h5>{{ this.away_team_name }}</h5>
    </div>
    </div>
    <div id="game_details">
      <div id = "game_date">
        <p><b> {{ Match_Date }}</b></p>
        <p> {{ Hour }}</p>
      </div>
      <div id = "stadium">
        <p><b> {{ Stadium }}</b></p>
      </div>
      <div id = "stage">
        <p> {{ this.stage_name }}</p>
      </div>
      <!-- <li> Score: {{ Score }}</li>
      <li> Events: {{ EventBook }}</li> -->
    </div>
  </div>
</template>

<script>

export default {
  name: "GamePreview",
  props: {
      Match_ID: {
        type: Number,
        required: true
      },
      Home_Team_ID: {
        type: Number,
        required: true
      },
      Away_Team_ID: {
        type: Number,
        required: true
      },
      Match_Date: {
        type: String,
        required: true
      },
      Hour: {
        type: String,
        required: true
      },
      Stadium: {
        type: String,
        required: true
      },
      Stage: {
        type: Number,
        required: true
      },
      Score: {
        type: String
      },
      EventBook: {
        type: String
      }
  },
  data(){
    return{
      home_team_name: undefined,
      home_team_logo : undefined,
      away_team_name: undefined,
      away_team_logo : undefined,
      stage_name: undefined,
      is_loaded : undefined
    }
  },
  methods:{
    async set_display(){
      try{
        const home_team = await this.$root.store.get_team_full_data(this.Home_Team_ID);
        // const home_team = (await this.$root.server.get(`teams/${this.Home_Team_ID}/preview`)).data;
        this.home_team_name = home_team.name;
        this.home_team_logo = home_team.logo_path;
        // const away_team = (await this.$root.server.get(`teams/${this.Away_Team_ID}/preview`)).data;
        const away_team = await this.$root.store.get_team_full_data(this.Away_Team_ID);
        this.away_team_name = away_team.name;
        this.away_team_logo = away_team.logo_path;
        this.stage_name = (await this.$root.server.get(`league/stages/${this.Stage}`)).data.name;
        
        
        // console.log(this.$parent.ready_components);
      }
      catch(err){
        console.log("in error")
        console.log(err.response)
      }
    }
  },
  mounted(){
     this.set_display().then(()=>{
       this.is_loaded = true
       this.$parent.ready_components ++;
     });
    } 
};
</script>

<style>


.game-preview *{
  margin: 0 auto;
}

#teams{
  margin-top: 10px;
  display: flex;
  align-items: stretch;
  align-content: center;
  margin-bottom: -10px;
}

#team_display{
  width: 70%;
  height: auto;
  display: inline-block;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: middle;
}

#team_display img{
  width: 40%;
  height: auto;
}

#team_display h5{
  color: black;
  width: max-content;
  box-shadow: inset 0 0 200px rgba(255, 255, 255, .5);
  margin-block: 5px;

}

#vs{
  font-size: 40px;
  display: inline;
  float: none;}

#vs p{
  margin-top: 40px;
     color: black;

}

#game_date{
  text-align: center;
  align-items: center;
margin-bottom: -3px;
}

#game_date p{
   display: inline-block;
   margin-inline: 10px;
   font-size: 14px;
   color: black;
}

#stadium{
    text-align: center;
    align-items: center;
margin-bottom: -2px;

}

#stadium p{
   display: inline-block;
   margin-inline: 20px;
   font-size: 16px;
}

#stage{
    text-align: center;
    align-items: center;
    margin-bottom: -2px;

}

#stage p{
    display: inline-block;
   margin-inline: 20px;
   font-size: 16px;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}

.game-preview {
  justify-content: center;
  align-items: center;
  display: inline-block;
  vertical-align: middle;
  width: 350px;
  height: 180px;
  position: relative;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(0, 0, 0);
}

.frosted_glass *{
  margin: 0 auto;
}

.frosted_glass {
    width:25rem;
    height: 11rem;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2); 
    border-radius: 5px;
    position: relative;
    z-index: 1;
    background: inherit;
    overflow: hidden;
    padding-bottom: 5px;
    margin-block: 10px;
}

.frosted_glass:before {
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

#game_details p{
  color: black;
}
</style>
