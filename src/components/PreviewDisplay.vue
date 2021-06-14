<template>
<div class="row no-gutters" style="width: max-content;">
<div class="col-lg-3 col-sm-6">
    <div class="card hovercard" style="background:rgb(255,255,255,0.6);">
        <div class="cardheader">
            <center><img v-bind:src= "background_photo_path"></center> 
        </div>
        <div class="avatar">
            <img v-bind:src= "small_photo_path">
        </div>
        <div class="info">
            <div class="title">
                <a target="_blank" href="#"><b>{{ this.main_name }}</b></a>
            </div>
            <div class="desc"><b>{{ this.secondary_name }}</b></div>
            <div class="desc">{{ this.description }}</div>  
        </div>
    </div>
</div>
</div>
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
            is_loaded: false
        }
        
    },
    mounted(){
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
        id:{
            type: Number,
            required: true
    }
    },
    methods:{
        async getPreview(){
            if (this.type == "players"){
                const player_preview = (await this.$root.server.get(`players/${this.id}/preview`)).data
                this.main_name = player_preview.name;
                this.small_photo_path = player_preview.photo_path;
                this.secondary_name = player_preview.team_name;
                const team = (await  this.$root.server.get(`teams/${player_preview.team_id}/preview`)).data;
                this.background_photo_path = team.logo_path;
                this.description = `Position: ${player_preview.position}`;
            }
            else if (this.type == "coaches"){
                const coach_preview = (await this.$root.server.get(`coaches/${this.id}/preview`)).data
                this.main_name = coach_preview.name;
                this.small_photo_path = coach_preview.photo_path;
                this.secondary_name = coach_preview.team_name;
                const team = (await this.$root.server.get(`teams/${coach_preview.team_id}/preview`)).data;
                this.background_photo_path = team.logo_path;
                this.description = "Coach"
            }
            else if (this.type == "teams"){
                const team_preview = (await this.$root.server.get(`teams/${this.id}/preview`)).data
                this.main_name = team_preview.short_code;
                this.small_photo_path = team_preview.logo_path;
                this.secondary_name = team_preview.name;
                this.background_photo_path = team_preview.logo_path;
                this.description = `Founded: ${team_preview.founded}`;
            }
        }
    }
}
</script>
<style>

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
    border: solid 2px red;
}

</style>