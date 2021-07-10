<template v-show="this.is_loaded">
  <div class="frosted_glass">
    <!-- <div :title="Match_ID" class="game-title"></div> -->
    <!-- {{ this.is_loaded }} -->
    <div id="teams">
      <div v-bind:class="favorite_state" v-show="this.$session.exists() && this.Score == undefined" id="star" @click="check_star" @mouseleave="disable_favorite">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-star star"  viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
          </svg>
      </div>
      <div id="team_display">
        <div class="team_logo" id="team_logo">
          <router-link :event="click" :to=home_team_page_route >
            <img v-bind:src= "home_team_logo">
          </router-link>
        </div>
        <h5>{{ this.home_team_name }}</h5>
      </div>
      <div id = "vs">
        <p><b> vs.</b> </p>
      </div>
      <div id="team_display">
        <router-link :event="click" :to=away_team_page_route >
          <div class="team_logo" id="team_logo">
            <img v-bind:src= "away_team_logo">
          </div>
        </router-link>
        <h5>{{ this.away_team_name }}</h5>
      </div>
    </div>
    <div class="bottom_content">
      <div class="score">
          <p style="text-align:right;"><b>{{ this.home_team_score }}</b></p>
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
      <div class="score" >
        <p><b>{{ this.away_team_score }}</b></p>
      </div>
    </div>
    <EventBook class="event_book" v-if="this.Score != undefined" :EventBook="this.EventBook"> </EventBook>
  </div>
</template>

<script>
import EventBook from "./EventBook.vue"
export default {
  name: "GamePreview",
  components:{
    EventBook
  },
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
      is_loaded : undefined,
      favorite_state: undefined,
      home_team_score: undefined,
      away_team_score: undefined,
      splited_event_book: [],
      home_team_page_route: `/teams/${this.Home_Team_ID}`,
      away_team_page_route: `/teams/${this.Away_Team_ID}`
    }
  },
  methods:{
        // set_event_book(){
        //   if (this.EventBook!=undefined){
        //     let splited = this.EventBook.split(',')
        //     if (splited[0] != ""){
        //       for (let i = 0; i< splited.length;i++){
        //         this.splited_event_book.push(splited[i])
        //       }
        //     }
        //   }
        // },
        set_score(){
          if (this.Score!=undefined){
            let splited = this.Score.split(':');
            this.home_team_score = splited[0];
            this.away_team_score = splited[1];
          }
        },
        disable_favorite(){
            this.hover_favorite = false;
        },
        async check_star(){
            if (this.favorite_state == "favorite_unchecked"){
                try{
                    this.favorite_state = "favorite_checked";
                    const response = await this.$root.server.post(`users/favoriteMatches`, {
                        user_id: undefined,
                        id: this.Match_ID  
                    }, {
                        withCredentials: true
                    });
                    this.$emit("added_favorite")
                    return;
                }
                catch(error){

                }
            }
            else 
                try{
                     this.favorite_state = "favorite_unchecked";
                    const response = await this.$root.server.delete(`users/favoriteMatches/${this.Match_ID}`, {
                        withCredentials: true
                    });
                    this.$emit("deleted_favorite")

                }
                catch(error){

                }
               
                return;
        },
        async set_favorite_status(){
            try{
                document.getElementById("star").style.pointerEvents = "none";
                const response = (await this.$root.server.get(`users/favoriteMatches`, {
                    withCredentials: true
                })).data;
                const favorites_in_list = response.filter(favorite => favorite.Match_ID == this.Match_ID);
                if (favorites_in_list.length == 0){
                    this.favorite_state = "favorite_unchecked"
                }
                else{
                    this.favorite_state = "favorite_checked"
                }
                document.getElementById("star").style.pointerEvents = "auto";
            }
            catch(error){
               this.favorite_state = "favorite_unchecked";
               document.getElementById("star").style.pointerEvents = "auto";
            }
           
        },
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
    this.set_score();
    // this.set_event_book();
     this.set_favorite_status();  
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

.team_logo img{
  transition: all .2s ease-in-out;
  width: max-content;
}

.team_logo img:hover{
  transform: scale(1.05);
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
    height: 13rem;
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

.bottom_content{
  display: flex;
  margin-top: 10px;
}

.score{
  /* border: solid 2px blue; */
  width: 80px;
  /* padding-inline: 40px; */
  margin-top: -10px;
  /* margin-inline: 0px;  */
}

.score p{
  font-size: 40px;
}

.event_book{
    text-align: left;
    display: inline-block;
    margin: 0;
    padding: 4px 4px 4px 4px;
    list-style: none;
    position:absolute;
    bottom:0;
    /* z-index: 1000; */
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

.star{
    /* float: right; */
    transition: all .3s ease-in-out;
    margin: 5px;
    
}

.star:hover{
    transform: scale(1.2);
    z-index: 100;
}


</style>
