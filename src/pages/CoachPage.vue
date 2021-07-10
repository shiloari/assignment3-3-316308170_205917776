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
                <router-link :event="click" :to=team_page_route >
                    <div class="team_logo">
                        <img v-bind:src="this.team_logo_path">
                    </div>
                </router-link>
                <div class="team_name">
                     <h3> {{ this.team_name }} </h3>
                     <h3 v-if="this.team_common_name"> {{ this.team_common_name }}</h3>
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
                        <h5> <p v-if="this.weight">Weight</p> {{ this.weight }}</h5>
                        <h5> <p v-if="this.height">Height</p> {{ this.height }}</h5>
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
            is_loaded : false,
            team_page_route: undefined
        }
    },
    methods:{
        async getFullData(){
            const coach_full_data = this.$root.store.get_coach_full_data(this.$route.params.id);
            this.name = coach_full_data.name;
            this.photo = coach_full_data.photo_path;
            this.team_name = coach_full_data.team_name;
            this.common_name = coach_full_data.common_name;
            this.team_logo_path = coach_full_data.team_photo;
            this.team_common_name = coach_full_data.team_short_code;
            this.birthdate = coach_full_data.birthdate;
            this.birth_country = coach_full_data.birth_country;
            this.nationality = coach_full_data.nationality;
            this.height = coach_full_data.height;
            this.weight = coach_full_data.weight;
            this.team_page_route = `/teams/${coach_full_data.team_id}`
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
    width: 50vw;
    height: 85vh;
    backdrop-filter: blur(10px);
    border-radius: 5%;
    margin: 0 auto;
    margin-top: 15px;
    display: block;

}

.top{
  display: flex;
  margin: 0 auto;
  border-bottom: double 5px white;
  border-bottom-width: length;
  width:90%;
}

.coach{
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
    display: flex; 
    flex-wrap: wrap;
}

.bottom_left{
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
    text-align: center;
    color: white;
    margin-block: 5px;
}


.bottom_right{
    flex: 0 0 50%;
    padding: 10px;
}

.personal_info{
    text-align: center;
    color: white;
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
    margin-top:20px;
}

</style>