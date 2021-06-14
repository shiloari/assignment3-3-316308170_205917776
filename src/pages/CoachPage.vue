<template>
    <div class="main_container">
        <div class="top">
            <div class="coach">
                <img v-bind:src="this.photo">
            </div>
            <div class="coach_name">
                <h1>{{ this.name }}</h1>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom_left">
                <h2>Coaching</h2>
                <img v-bind:src="this.team_logo_path">
                <div class="team_name">
                     <h3> {{ this.team_name }} </h3>
                     <h3> ({{ this.team_common_name }})</h3>
                </div>
                <h4> Coach </h4>
            </div>
            <div class="bottom_right">
                <div class="personal_info">
                    <div style="margin-top:20px;">
                    <h4> {{ this.common_name }}</h4>
                    <h5> {{ this.birthdate }}</h5>
                    </div>
                    <div class="row_info">
                        <h5> <p>Nationality</p> {{ this.nationality }}</h5>
                        <h5> <p>Birth Country</p> {{ this.birth_country }}</h5>
                    </div>
                     <div class="row_info">
                        <h5> <p>Weight</p> {{ this.weight }}</h5>
                        <h5> <p>Height</p> {{ this.height }}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>




<script>
export default {
    name: "coaches",
    data(){
        return{
            name: undefined,
            photo: undefined,
            team_name: undefined,
            team_common_name: undefined,
            team_logo_path: undefined,
            common_name: undefined,
            birthdate: undefined,
            birth_country: undefined,
            nationality: undefined,
            height: undefined,
            weight: undefined,
            is_loaded : false
        }
    },
    methods:{
        async getFullData(){
            const coach_full_data = (await this.$root.server.get(`coaches/${this.$route.params.id}/full_data`)).data;
            this.name = coach_full_data.name;
            this.photo = coach_full_data.photo_path;
            this.team_name = coach_full_data.team_name;
            this.common_name = coach_full_data.common_name;
            const team = (await  this.$root.server.get(`teams/${coach_full_data.team_id}/preview`)).data;
            this.team_logo_path = team.logo_path;
            this.team_common_name = team.short_code;
            this.birthdate = coach_full_data.birthdate;
            this.birth_country = coach_full_data.birth_country;
            this.nationality = coach_full_data.nationality;
            this.height = coach_full_data.height;
            this.weight = coach_full_data.weight;
        }
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