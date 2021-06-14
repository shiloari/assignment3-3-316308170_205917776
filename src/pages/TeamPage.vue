<template>
<div class="columns is-multiline">
    <div class="column is-half" v-for="p in players" :key="p.id">
        <PreviewDisplay id="favorite"
        :Display_ID="p.player_id" 
        :type="'players'" 
        >
      </PreviewDisplay>
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
            perPage: 3,
            currentPage: 1
        }
    },
    methods:{
        async getFullData(){
            const team_full_data = (await this.$root.server.get(`teams/${this.$route.params.id}`)).data;
            const team_preview = (await  this.$root.server.get(`teams/${this.$route.params.id}/preview`)).data;
            this.name = team_preview.name;
            this.photo = team_preview.logo_path;
            this.common_name = team_preview.short_code;
            this.founded = team_preview.founded;
            this.players = team_full_data.team;
            this.coach = team_full_data.coach;
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

</style>