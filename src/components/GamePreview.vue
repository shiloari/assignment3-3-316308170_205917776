<template>
  <div class="game-preview">
    <!-- <div :title="Match_ID" class="game-title"></div> -->
    
    <div id="teams">
    <div id="team_display">
      <div id="team_logo"><img v-bind:src= "home_team_logo"></div>
      <h1>{{ this.home_team_name }}</h1>
    </div>
    <div id = "vs">
      <p><b> vs.</b> </p>
    </div>
    <div id="team_display">
      <div id="team_logo"><img v-bind:src= "away_team_logo"></div>
      <h1>{{ this.away_team_name }}</h1>
    </div>
    </div>
    <div id="game_details">
      <div id = "game_date">
        <p> {{ Match_Date }}</p>
        <p> {{ Hour }}</p>
      </div>
      <div id = "stadium">
        <p> Stadium: {{ Stadium }}</p>
      </div>
      <div id = "stage">
        <p> Stage: {{ Stage }}</p>
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
      away_team_logo : undefined
      
    }
  },
  methods:{
    async set_display(){
      try{
        const home_team = (await this.axios.get(`http://localhost:3000/teams/${this.Home_Team_ID}/preview`)).data;
        this.home_team_name = home_team.name;
        this.home_team_logo = home_team.logo_path;
        const away_team = (await this.axios.get(`http://localhost:3000/teams/${this.Away_Team_ID}/preview`)).data;
        this.away_team_name = away_team.name;
        this.away_team_logo = away_team.logo_path;
      }
      catch(err){
        console.log("in error")
        console.log(err.response)
      }
    }
  },
  mounted(){
      const teams = this.set_display();
    } 
};
</script>

<style>
.game-preview {
  justify-content: center;
  align-items: center;
  display: inline-block;
  vertical-align: middle;
  width: 650px;
  height: 300px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(0, 0, 0);
}

.game-preview *{
  margin: 0 auto;
}

#teams{
  display: flex;
  align-items: stretch;
  align-content: center;
}

#team_display{
  display: inline-block;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: middle;
}

#vs{
  font-size: 50px;
  display: inline;
  float: none;}

#vs p{
  margin-top: 40px;
}

#game_date{
  text-align: center;
  align-items: center;

}

#game_date p{
   display: inline-block;
   margin-inline: 20px;
   font-size: 18px;
}

#team_logos{
  display: flex;
  align-items: stretch;
  align-content: center;
}

#team_logo{
  margin-inline: 60px;
}

#playing_teams{
  width: 100%;
  display: flex;
  align-items: stretch;
  align-content: center;
}

#playing_teams h1{
  width: 100%;
  display: flex;
  align-items: stretch;
  align-content: center;
  overflow: visible;
  border: solid 2px green;
  font-size: 40px;
  line-height: 40px;
}

#playing_teams p{
  width: 100%;
  display: block;
  align-items: center;
  align-content: center;
  border: solid 2px red;
  font-size: 40px;
  line-height: 40px;
  padding-inline: 20px;
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

</style>
