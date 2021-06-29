<template>

<router-link v-show="is_loaded" :event="!hover_favorite ? 'click' : ''" :to=page_route >
<div class="display" id="display">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<div class="row no-gutters">
<div class="col-lg-3 col-sm-6">
    <div class="card hovercard" style="background:rgb(255,255,255,0.6);">
        <div class="cardheader">
            <center><img v-bind:src= "background_photo_path"></center> 
        </div>
        <div class="avatar">
            <img v-bind:src= "small_photo_path">
        </div>
        <div class="info">
            <div class="title" style=" margin-top: 10px; padding-inline: 5px;">
                <a style="color:#0083BE;"><b>{{ this.main_name }}</b></a>
            </div>
            <div class="desc"><b>{{ this.secondary_name }}</b></div>
            <div class="desc">{{ this.description }}</div>  
        </div>
        <div v-bind:class="favorite_state" v-show="this.$session.exists()" id="star" @click="check_star" @mouseleave="disable_favorite">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-star star"  viewBox="0 0 16 16">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
            </svg>
        </div>
    </div>
</div>
</div>
</div>
</router-link>
</template>

<script>

export default {
    name: "PreviewDisplay",
    data(){
        return{
            main_name: undefined,
            secondary_name: undefined,
            small_photo_path: undefined,
            description: undefined,
            background_photo_path : undefined,
            is_loaded: false,
            page_type: undefined,
            page_route: `/${this.type}/${this.Display_ID}`,
            hover_favorite: false,
            favorite_state: "favorite_unchecked"
        }
        
    },
    created(){
             
    },
    mounted(){
        this.set_favorite_status();  
        this.getPreview().then(()=>{
            this.is_loaded = true;
            this.$parent.ready_components++;
        });
    },
    props: {
        type: {
            type: String,
            required: true
    },
        Display_ID:{
            type: Number,
            required: true
    }
    },
    methods:{
        disable_favorite(){
            this.hover_favorite = false;
        },
        async check_star(){
            let relative_path = this.type.toUpperCase()[0] + this.type.substring(1)
            this.hover_favorite = true;
            if (this.favorite_state == "favorite_unchecked"){
                try{
                    this.favorite_state = "favorite_checked";
                    const response = await this.$root.server.post(`users/favorite${relative_path}`, {
                        user_id: undefined,
                        id: this.Display_ID   
                    }, {
                        withCredentials: true
                    });
                    return;
                }
                catch(error){

                }
            }
            else 
                try{
                    this.favorite_state = "favorite_unchecked";
                    const response = await this.$root.server.delete(`users/favorite${relative_path}/${this.Display_ID}`, {
                        withCredentials: true
                    });
                    this.$emit("deleted_favorite")
                }
                catch(error){

                }
                return;
        },
        async getPreview(){
            if (this.type == "players"){
                const player_preview = this.$root.store.get_player_full_data(this.Display_ID);
                this.main_name = player_preview.name;
                this.small_photo_path = player_preview.photo_path;
                this.secondary_name = player_preview.team_name;
                this.background_photo_path = player_preview.team_photo;
                this.description = `Position: ${player_preview.position}`;
                this.page_type = "players";
            }
            else if (this.type == "coaches"){
                const coach_preview = this.$root.store.get_coach_full_data(this.Display_ID);
                this.main_name = coach_preview.name;
                this.small_photo_path = coach_preview.photo_path;
                this.secondary_name = coach_preview.team_name;
                this.background_photo_path = coach_preview.team_photo;
                this.description = "Coach";
                this.page_type = "coach";
            }
            else if (this.type == "teams"){
                const team_preview = this.$root.store.get_team_full_data(this.Display_ID);
                this.main_name = team_preview.short_code;
                this.small_photo_path = team_preview.logo_path;
                this.secondary_name = team_preview.name;
                this.background_photo_path = team_preview.logo_path;
                this.description = `Founded: ${team_preview.founded}`;
                this.page_type = "team";
            }
        },
        async set_favorite_status(){
            let relative_path = this.type.toUpperCase()[0] + this.type.substring(1)
            try{
                document.getElementById("star").style.pointerEvents = "none";
                const response = (await this.$root.server.get(`users/favorite${relative_path}`, {
                    withCredentials: true
                })).data;
                const favorites_in_list = response.filter(favorite => favorite == this.Display_ID);
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
           
        }
    }
}
</script>
<style>

.display{
    margin: 15px;
    height: max-content;
    transition: all .2s ease-in-out;
    width: max-content;
}

.display:hover{
  transform: scale(1.1);
}

.card {
    /* padding-top: 20px; */
    /* margin: 0px 0 0px 0; */
    background-color: rgba(214, 224, 226, 0.2);
    border-top-width: 0;
    border-bottom-width: 2px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    min-width: 140px;
    min-height: 200px;
    max-width: 180px;
    max-height: 200px;
    width: 180px;
    height:200px;
}
.card .card-heading {
    /* padding: 0 20px; */
    /* margin: 0; */
}
.card .card-heading.simple {
    font-size: 20px;
    font-weight: 300;
    color: #777;
    border-bottom: 1px solid #e5e5e5;
}
.card .card-heading.image img {
    display: inline-block;
    width: 46px;
    height: 46px;
    /* margin-right: 15px; */
    vertical-align: top;
    border: 0;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
}
.card .card-heading.image .card-heading-header {
    display: inline-block;
    vertical-align: top;
}
.card .card-heading.image .card-heading-header h3 {
    /* margin: 0; */
    font-size: 14px;
    line-height: 16px;
    color: #262626;
}
.card .card-heading.image .card-heading-header span {
    font-size: 12px;
    color: #999999;
}
.card-top {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 170px;
    height: 150px;
    background-color: #ffffff;
}
.card-top.green {
    background-color: #53a93f;
}
.card-top.blue {
    background-color: #427fed;
}
.card-info {
    position: absolute;
    top: 150px;
    display: inline-block;
    /* width: 100%; */
    height: 100px;
    overflow: hidden;
    background: #ffffff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.card-info .title {
    display: block;
    margin: 8px 14px 0 14px;
    overflow: hidden;
    font-size: 20px;
    font-weight: bold;
    line-height: 22px;
    color: #404040;
}
.title{
    margin-top: 4px;
}
.card-info .desc {
    display: block;
    margin: 8px 14px 0 14px;
    overflow: hidden;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
    text-overflow: ellipsis;
}
.card.hovercard {
    position: relative;
    overflow: hidden;
    text-align: center;
    background-color: rgba(214, 224, 226, 0.2);
}
.card.hovercard .cardheader {
    height: 200px;
}

.cardheader{
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 300px; */
}
.cardheader img{
     /* display: block; */
    /* margin: 10px auto 20px; */
    /* display: block; */
    /* margin: 0 auto; */
    width: 100%;
    /* padding-top: 20px; */
    opacity: 0.2;
}

.avatar{
    position: absolute; 
    left: 50%;
    top: 40%;
    transform: translate(-50%,-80%);
}
.card.hovercard .avatar img {
    width: 90px;
    height: 90px;
    max-width: 150px;
    max-height: 150px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 5px solid rgba(255,255,255,0.5);
}
.card.hovercard .info {
    /* padding: 4px 8px 10px; */
}

.info{
    position: absolute; 
    left: 50%;
    top: 50%;
    transform: translate(-50%,-10%);
}
.card.hovercard .info .title {
    margin-bottom: 4px;
    font-size: 18px;
    line-height: 1;
    color: #262626;
    vertical-align: middle;
}
.card.hovercard .info .desc {
    overflow: hidden;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
    width: 180px;
    text-align: center;
}

.padding-0{
    padding:0;
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