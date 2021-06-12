<template>
  <div class="frosted_glass">
    <!-- <div :title="Match_ID" class="game-title"></div> -->
    
    <div id="teams">
    <div id="team_display">
      <div id="team_logo"><img v-bind:src= "home_team_logo"></div>
      <h3>{{ this.home_team_name }}</h3>
    </div>
    <div id = "vs">
      <p><b> vs.</b> </p>
    </div>
    <div id="team_display">
      <div id="team_logo"><img v-bind:src= "away_team_logo"></div>
      <h3>{{ this.away_team_name }}</h3>
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
      stage_name: undefined
      
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
        this.stage_name = (await this.axios.get(`http://localhost:3000/league/stages/${this.Stage}`)).data.name;

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


.game-preview *{
  margin: 0 auto;
}

#teams{
  margin-top: 10px;
  display: flex;
  align-items: stretch;
  align-content: center;
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

#stadium{
    text-align: center;
    align-items: center;

}

#stadium p{
    display: inline-block;
   margin-inline: 20px;
   font-size: 24px;
}

#stage{
    text-align: center;
    align-items: center;
}

#stage p{
    display: inline-block;
   margin-inline: 20px;
   font-size: 18px;
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
  width: 650px;
  height: 300px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(0, 0, 0);
}

.frosted_glass *{
  margin: 0 auto;
}

.frosted_glass {
    width: 30rem;
    height: 15rem;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2); 
    border-radius: 5px;
    position: relative;
    z-index: 1;
    background: inherit;
    overflow: hidden;
    padding-bottom: 5px;
    margin-top: 15px;
    /* background: inherit;
    border-radius: 5px;
    overflow: hidden;
    align-items: center;
    display: inline-block;
    vertical-align: middle;
    margin: 10px 10px;
    width: 650px;
    height: 300px;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2); 
    border-radius: 5px;
    position: relative;
    z-index: 1;
    background: inherit;
    overflow: hidden;
    justify-content: center;
    /* flex-direction: column; */
    /* text-align: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; */ 
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
    margin: -20px;
}

/* .frosted_glass:after{
    content: '';
    width: 300px;
    height: 300px;
    background: inherit; 
    position: absolute;
    left: -25px;
    right: 0;
    top: -25px;  
    bottom: 0;
    box-shadow: inset 20 20 20 20px rgb(255, 255, 255);
    filter: blur(0px);
} */





</style>
