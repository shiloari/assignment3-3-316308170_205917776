<template>
    <div id="main_page_rep">
        <div v-if="!this.finished" class="d-flex justify-content-center" style="margin-top: 15%;">
            <div id="waiting" class="spinner-border text-dark" style="width: 5rem; height: 5rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div class="standings">
            <div id="table1" v-show="this.non_match || (this.finished && this.items && this.totalItems == this.items.length )">
                <h1>Fixtures</h1>
                <AddMatch @clicked="addNewMatch"></AddMatch>
                <b-table ref="table" hover head-variant="dark" show-empty :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" style="background-color:#fafafa">
                    <template #cell(Home_Team_name)="data">
                        <a :href="'/#/teams/'+ teleportToTeam(data.value)">{{ data.value }}</a>
                    </template>
                    <template #cell(Away_Team_name)="data">
                        <a :href="'/#/teams/'+ teleportToTeam(data.value)">{{ data.value }}</a>
                    </template>
                    <template #cell(Score) = "data" >
                        <div v-if="data.item.Score">
                            {{data.item.Score}}
                        </div>
                    </template>
                    <template #cell(EventBook) = "data" >
                        <EventBook :EventBook="data.item.EventBook" :key="data.item.EventBook"></EventBook>
                    </template>
                    <template #cell(Actions) = "data" >
                        <ActionButtons :iData="data" :index="data.index+perPage" @update="UpdateMatch" @delete="deleteMatch"></ActionButtons>
                    </template>
                </b-table>
                <div class="paginiation">
                    <b-pagination size="md" :total-rows="(non_match)?0:items.length" v-model="currentPage" :per-page="perPage"></b-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import EventBook from  "../components/EventBook.vue"
import AddMatch from  "../components/AddMatch.vue"
import ActionButtons from  "../components/ActionButtons.vue"
const letter = (p) => /[a-zA-Z ]/i.test(p)
export default {
    name:"RepresentativePage",
    components:{
        EventBook,
        AddMatch,
        ActionButtons
    },
     data() {
        return {
        items: [],
        non_match : false,
        fields: [{
            key: 'Home_Team_name',
            label: 'Home team Name',
            sortable: true
            },
            {
            key: 'Away_Team_name',
            label: 'Away team Name',
            sortable: true
            },
            {
            key: 'Match_Date',
            label: 'Date',
            sortable: true
            },
            {key: 'Hour'},
            {key: 'Stadium'},
            {key: 'Score'},
            {key: 'EventBook'},
            {key: 'Actions'}
        ],
        currentPage: 1,
        perPage: 4,
        totalItems: 0,
        finished: false
        }},
    watch:{
         items: function(){
            if(this.non_match){
                this.finished = true;
                return
            }
            if((this.items && this.totalItems == this.items.length && !this.finished)){
                this.items.map((match) =>{
                    match.Home_Team_name = (this.$root.store.get_team_full_data(match.Home_Team_ID)).name ;
                    match.Away_Team_name = (this.$root.store.get_team_full_data(match.Away_Team_ID)).name ;
                })
                setTimeout(
                    ()=>{
                        this.finished = true
                    }, 500
                )
            }
        }
    },
     created() {
        this.fetchData().catch(error => {
        console.error(error)
        })
    },
    methods: {  
        async deleteMatch(iData) {
            let data = iData;
            try{
                let response = await this.$root.server.delete(`matches/${data.item.Match_ID}`,{
                            withCredentials: true
                    })
                let t_items = this.items;
                this.items.splice(data.index,1)
                this.$root.toast("Deleted Match", "Successfully deleted the match !", "success");
                this.$router.go(0);
                // this.items = t_items
            }
            catch(err){
                console.log(err);
                 this.$root.toast("Unauthorized", "Only Representative user allow to delete !", "danger");
            }
        },
        teleportToTeam(team_name){
            var matches = this.items
            for (var i = 0; i < matches.length; i++) {
                let match = matches[i];
                if(match.Home_Team_name == team_name)
                    return match.Home_Team_ID
                if(match.Away_Team_name == team_name)
                    return match.Away_Team_ID
                }
        },
        validationNewMatch(data){
            if(data.home_selected == data.away_selected){
                this.$root.toast("Same team selected", "Same team selected !", "danger");
                return false;
                }
            if(!(data.date && data.hour)){
                this.$root.toast("Empty date/hour", "Need to select date/hour !", "danger");
                return false;
                }
            return true;
        },
        async addNewMatch(data){
            if(!this.validationNewMatch(data))
                return;
            try {
                let response = await this.$root.server.post(`matches/`, {
                        home_team_id : `${data.home_selected}`,
                        away_team_id : `${data.away_selected}`,
                        stadium : `${data.stadium_selected}`,
                        date : `${data.date}`,
                        hour : `${data.hour}`
                    },{
                        withCredentials: true
                })  
                this.$root.toast("New Match", "Successfully added new match !", "success");
                this.$router.go(0);
            } catch (error) {
                console.log(error);
            }
        },
        async UpdateMatch(iData) {
            let data = iData.data;
            let value = iData.value;
            let event_selected = iData.event_selected;
            console.log(iData);
            try{
                let score = this.items[data.index].Score;
                let eventBook = this.items[data.index].EventBook;
                let event;
                if(value == 'Score'){
                    let s_1 = document.getElementById(`Score-input1_${data.index}`);
                    let s_2 = document.getElementById(`Score-input2_${data.index}`);
                    if(!(s_2.value && s_1.value)){
                        this.$root.toast("Empty Score", "Need to select Score !", "danger");
                        return
                        }
                    score = `${s_1.value}:${s_2.value}`
                    event = (eventBook)? eventBook:'';
                    }
                else{
                    let date = document.getElementById(`Date-input_${data.index}`);
                    let hour = document.getElementById(`Hour-input_${data.index}`);
                    let text = document.getElementById(`Text-input_${data.index}`);
                    let minutes = document.getElementById(`Minutes-input_${data.index}`);
                    if(!(date.value && hour.value && text.value && minutes.value)){
                        this.$root.toast("Empty date/hour/minutes/text", "Need to select date/hour/minutes/text !", "danger");return;}
                    if(!letter(text)){
                        this.$root.toast("Name", "Name doesnt contains only characters", "danger");return;}
                    event = date.value +' '+ hour.value +' '+ minutes.value +' '+ event_selected +' ' +text.value ;
                    score = (score)? score: '';
                    event = (eventBook)? eventBook.concat(`,${event}`) : event;
                }
                let response = await this.$root.server.put(`matches/`, {
                        score : `${score}`,
                        event_book : `${event}`,
                        match_id : `${data.item.Match_ID}`,
                        finished : (value == 'Score')?true:false
                    },{
                        withCredentials: true
                })
               this.$router.go(0);
            }
            catch(err){
                console.log(err);
                this.$root.toast("Not logged", "admin need to login for changeing Match!", "danger");
            }
        },
        async fetchData() {
        this.items = await this.$root.server.get(`matches/`, {
                    withCredentials: true
                })
            .then(async (res) =>{       
                const data = res.data;
                this.totalItems = data.length
                if(data.length == 0){
                    this.non_match = true;
                    return
                }
                var result = new Array();
                await data.forEach(async(element) => {
                    const match = ((await this.$root.server.get(`matches/${element}`, {
                    withCredentials: true
                })).data[0])
                    result.push(match)
                    this.items = result
                })          
            })
        }
        
    }
 
}
</script>
<style scoped>
#main_page_rep{
    width: 100%;
    height: 101%;
    overflow:scroll;
    backdrop-filter: blur(5px);
}
#table1 h1{
    color: #2c3e50;
    margin-block: 20px;
    text-align: center;
}

.paginiation{
    margin: 0 auto;
    display: block;
    width: max-content;
}

.standings{
    margin-bottom: 100px;
    padding-inline: 20px;
}
</style>
