<template>
    <div>
        <b-button v-b-modal.modal-prevent-closing  style="background:#1B87EE;border:none;margin-bottom: 10px;" ><b style="color:#fafafa">Create New Match</b></b-button>
        <b-modal ok-only ok-title="Add" id="modal-prevent-closing" ref="modal" title="Create New Match" @ok="addNewMatch">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group label="Home team Name" label-for="Home-team-Name-input" invalid-feedback="Home team Name is required">
                    <b-form-select v-model="home_selected" :options="home_options" value-field="item" text-field="name" class="mt-3"
                    ></b-form-select>
                </b-form-group>
                <b-form-group label="Away team Name" label-for="Away-team-Name-input" invalid-feedback="Away-team-Name is required">
                    <b-form-select v-model="away_selected" :options="away_options" value-field="item" text-field="name" class="mt-3">
                    </b-form-select>
                </b-form-group>
                    <b-form-group label="Date" label-for="Date-input" invalid-feedback="Date is required">
                    <b-form-input id="Date-input" type="date" v-model="date" required></b-form-input>
                </b-form-group>
                <b-form-group label="Hour" label-for="Hour-input" invalid-feedback="Hour is required">
                <b-form-input id="Hour-input" type="time" v-model="hour" required></b-form-input>
                </b-form-group>
                <b-form-group label="Stadium" label-for="Stadium-input" invalid-feedback="Stadium is required">
                    <b-form-select v-model="stadium_selected" :options="stadium_options" value-field="name" text-field="name" class="mt-3"></b-form-select>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "AddMatch",
    data(){
        return{
            home_selected: '',
            home_options:[],
            away_selected: '',
            away_options:[],
            stadium_selected: '',
            stadium_options:[],
            date:undefined,
            hour:undefined,
        }
    },
    created(){
        this.getTeamsAndStaduims();
    },
    methods:{
        addNewMatch() {
            let data = this.$data
            this.$emit('clicked',data)
        },
         getTeamsAndStaduims(){
            let all_teams = JSON.parse(localStorage.getItem("all_teams"));
            this.home_selected = all_teams[0].id;
            this.away_selected = all_teams[0].id;
            this.stadium_selected = all_teams[0].stadium;
            all_teams.map( team => {
                this.home_options.push({
                    item : team.id,
                    name : team.name
                })
                this.away_options.push({
                    item : team.id,
                    name : team.name
                })
                this.stadium_options.push({
                    name : team.stadium
                })
            })
        }
    },
}
</script>

<style>
</style>