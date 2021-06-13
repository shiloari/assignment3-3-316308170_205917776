<template>

<div class="col-lg-3 col-sm-6">
    <div class="card hovercard" style="background:rgb(255,255,255,0.6);">
        <div class="cardheader">
            <img v-bind:src= "team_logo"> 
        </div>
        <div class="avatar">
            <img v-bind:src= "photo_path">
        </div>
        <div class="info">
            <div class="title">
                <a target="_blank" href="#">{{ this.name }}</a>
            </div>
            <div class="desc">{{ this.position }}</div>
            <div class="desc"><b>{{ this.team_name }}</b></div>
            
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "PreviewDisplay",
    data(){
        return{
            name: undefined,
            team_name: undefined,
            photo_path: undefined,
            position: undefined,
            team_logo : undefined,
            is_loaded: false
        }
        
    },
    mounted(){
        this.getPreview().then(()=>{
            this.is_loaded = true;
        });
    },
    props: {
        type: {
            type: String,
            required: true
    },
        id:{
            type: Number,
            required: true
    }
    },
    methods:{
        async getPreview(){
            if (this.type == "players"){
            const player_preview = (await this.$root.server.get(`players/${this.id}/preview`)).data
            this.name = player_preview.name;
            this.photo_path = player_preview.photo_path;
            this.team_name = player_preview.team_name;
            const team = (await  this.$root.server.get(`teams/${player_preview.team_id}/preview`)).data;
            this.team_logo = team.logo_path;
            this.position = player_preview.position;
            }
            else if (this.type == "coaches"){
                const coach_preview = (await this.$root.server.get(`coaches/${this.id}/preview`)).data
                this.name = coach_preview.name;
                this.photo_path = coach_preview.photo_path;
                this.team_name = coach_preview.team_name;
                const team = (await this.$root.server.get(`teams/${coach_preview.team_id}/preview`)).data;
                this.team_logo = team.logo_path;
                this.position = "Coach"
            }
        }
    }
}
</script>
<style>
#card{

    /* display:inline-block; */
    /* margin-inline: 5px; */
}
.card {
    padding-top: 20px;
    margin: 10px 0 20px 0;
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
    min-width: 150px;
    min-height: 320px;
}
.card .card-heading {
    padding: 0 20px;
    margin: 0;
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
    margin-right: 15px;
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
    margin: 0;
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
    width: 100%;
    height: 101px;
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
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    color: #404040;
}
.title{
    margin: 4px;
}
.card-info .desc {
    display: block;
    margin: 8px 14px 0 14px;
    overflow: hidden;
    font-size: 22px;
    line-height: 30px;
    color: #000000;
    text-overflow: ellipsis;
}
.card.hovercard {
    position: relative;
    padding-top: 0;
    overflow: hidden;
    text-align: center;
    background-color: rgba(214, 224, 226, 0.2);
}
.card.hovercard .cardheader {
    
    height: 90px;
}
.cardheader img{
    margin: 0 auto;
    width: 100%;
    padding-top: 20px;
    opacity: 0.2;
}
.card.hovercard .avatar {
    position: relative;
    top: -50px;
    margin-bottom: -50px;
}
.card.hovercard .avatar img {
    width: 110px;
    height: 110px;
    max-width: 150px;
    max-height: 150px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 5px solid rgba(255,255,255,0.5);
}
.card.hovercard .info {
    padding: 4px 8px 10px;
}
.card.hovercard .info .title {
    margin-bottom: 4px;
    font-size: 24px;
    line-height: 1;
    color: #262626;
    vertical-align: middle;
}
.card.hovercard .info .desc {
    overflow: hidden;
    font-size: 22px;
    line-height: 30px;
    color: #000000;
    text-overflow: ellipsis;
}
.card.hovercard  {
    padding: 0 20px;
    margin-bottom: 17px;
}
</style>