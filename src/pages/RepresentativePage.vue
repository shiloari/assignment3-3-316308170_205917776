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
                        <EventBook :EventBook="data.item.EventBook"></EventBook>
                    </template>
                    <template #cell(Actions) = "data" >
                        <b-button :id="'aB_'+ data.index" v-b-modal.modal-prevent="'modal-Score_'+ data.index" style="background:none;border:none;" v-show="!data.item.Score">
                            <b-icon :id="'add_' + data.index" icon="file-plus" aria-hidden="true" style="color:green;"></b-icon>
                        </b-button>
                        <b-modal ok-only ok-title="add" :id="'modal-Score_'+ data.index" ref="modal3" title="Add Score"
                         @ok="UpdateMatch(data,'Score')">
                            <form ref="form" @submit.stop.prevent="handleSubmit">
                                 <b-form-group label="Score" label-for="Score-input" invalid-feedback="Score is required">
                                <div style="display:flex">
                                <b-form-input :id="'Score-input1_' + data.index" type="number" min="0" max="50" size="sm" 
                                style="width:60px;"></b-form-input>
                                -:-
                                <b-form-input :id="'Score-input2_' + data.index" type="number" min="0" max="50" size="sm"
                                style="width:60px;"></b-form-input>
                                </div>
                            </b-form-group>
                            </form>
                        </b-modal>
                        <b-button :id="'eB_'+ data.index" v-b-modal.modal-prevent="'modal-prevent_'+ data.index" style="background:none;border:none;">
                            <b-icon :id="'e_' + data.index" icon="pencil" aria-hidden="true" style="color:orange;"></b-icon>
                        </b-button>
                        <b-modal ok-only ok-title="Ok" :id="'modal-prevent_'+ data.index" ref="modal2" title="Edit Event"
                         @ok="UpdateMatch(data)">
                            <form ref="form" @submit.stop.prevent="handleSubmit">
                            <b-form-group label="Date" label-for="Date-input" invalid-feedback="Date is required">
                                <b-form-input :id="'Date-input_' + data.index" type="date" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="Hour" label-for="Hour-input" invalid-feedback="Hour is required">
                                <b-form-input :id="'Hour-input_'+ data.index" type="time" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="Minutes" label-for="Minutes-input" invalid-feedback="Minutes is required">
                                <b-form-input :id="'Minutes-input_'+ data.index" type="number" min="0" max="200" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="Event" label-for="Event-input" invalid-feedback="Event is required">
                                <b-form-select v-model="event_selected" :options="event_options" value-field="item" text-field="item" class="mt-3">
                                </b-form-select>
                            </b-form-group>
                            <b-form-group label="Text" label-for="Text-input" invalid-feedback="Text is required">
                                <b-form-input :id="'Text-input_'+ data.index" type="text" required></b-form-input>
                            </b-form-group>
                            </form>
                        </b-modal>
                        <button type="button" class="btn btn-primary" style="background:none;border:none;" @click="deleteMatch(data)" >
                            <b-icon v-bind:id="'x_' + data.index" icon="x-circle" aria-hidden="true" style="background:none;fill:red;" ></b-icon>
                        </button>
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
export default {
    name:"RepresentativePage",
    components:{
        EventBook,
        AddMatch
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
        finished: false,
        hover_favorite: false,
        favorite_state: undefined,
        event_selected: "Goal",
        event_options: [
            { item: "Goal" },
            { item: "Offside"},
            { item: "Foul"},
            { item: "Red Card"},
            { item: "Yellow Card"},
            { item: "Injury "},
            { item: "Substitute"}
            ],
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
        async deleteMatch(data) {
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
            // let d = new Date();
            // let toDay_date =`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
            // debugger;
            // if(!(this.date >= toDay_date)){
            //     this.$root.toast("Empty date", "Need to select valid date !", "danger");
            //     return false
            // }
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
        async UpdateMatch(data,value) {
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
                    event = date.value +' '+ hour.value +' '+ minutes.value +' '+ this.event_selected +' ' +text.value ;
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
                // this.items[data.index].Score = score
                // this.items[data.index].EventBook = event;
            }
            catch(err){
                console.log(err);
                this.$root.toast("Not logged", "admin need to login for changeing Match!", "danger");
            }
            // this.$refs.dropdown.hide(true)
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
    color: #fafafa;
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
