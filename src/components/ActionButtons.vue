<template>
    <div>
        <b-button :id="'aB_'+ this.iData.index" v-b-modal.modal-prevent="'modal-Score_'+ this.iData.index" style="background:none;border:none;" v-show="!this.iData.item.Score">
            <b-icon :id="'add_' + this.iData.index" icon="file-plus" aria-hidden="true" style="color:green;"></b-icon>
        </b-button>
        <b-modal ok-only ok-title="Done" :id="'modal-Score_'+ this.iData.index" ref="modal3" title="Set Finished Match Details"
            @ok="UpdateMatch('Score')">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <h5><b>Score</b></h5>
                <b-form-group label-for="Score-input" invalid-feedback="Score is required">
                    <div style="display:flex">
                    <b-form-input :id="'Score-input1_' + this.iData.index" type="number" min="0" max="50" size="sm" 
                    style="width:60px; margin-right:5px;"></b-form-input>
                    :
                    <b-form-input :id="'Score-input2_' + this.iData.index" type="number" min="0" max="50" size="sm"
                    style="width:60px; margin-left: 5px;"></b-form-input>
                    </div>
                </b-form-group>
                <b-form-group>
                    <h5><b>Event 1</b></h5>
                    <b-form-group label="Minute" label-for="Minutes-input" invalid-feedback="Minutes is required">
                        <b-form-input :id="'1Minutes-input_'+ this.iData.index" type="number" min="1" max="90" required
                        style="width=40px"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Event" label-for="Event-input" invalid-feedback="Event is required">
                        <b-form-select v-model="e_1" :options="event_options" value-field="item" text-field="item" class="mt-3">
                        </b-form-select>
                    </b-form-group>
                    <b-form-group label="Player" label-for="Text-input" invalid-feedback="Text is required">
                        <b-form-input :id="'1Text-input_'+ this.iData.index" type="text" required></b-form-input>
                    </b-form-group>
                </b-form-group>
                <b-form-group>
                    <h5><b>Event 2</b></h5>
                    <b-form-group label="Minute" label-for="Minutes-input" invalid-feedback="Minutes is required">
                        <b-form-input :id="'2Minutes-input_'+ this.iData.index" type="number" min="1" max="90" required
                        style="width=40px"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Event" label-for="Event-input" invalid-feedback="Event is required">
                        <b-form-select v-model="e_2" :options="event_options" value-field="item" text-field="item" class="mt-3">
                        </b-form-select>
                    </b-form-group>
                    <b-form-group label="Player" label-for="Text-input" invalid-feedback="Text is required">
                        <b-form-input :id="'2Text-input_'+ this.iData.index" type="text" required></b-form-input>
                    </b-form-group>
                </b-form-group>
                <b-form-group>
                    <h5><b>Event 3</b></h5>
                    <b-form-group label="Minute" label-for="Minutes-input" invalid-feedback="Minutes is required">
                        <b-form-input :id="'3Minutes-input_'+ this.iData.index" type="number" min="1" max="90" required
                        style="width=40px"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Event" label-for="Event-input" invalid-feedback="Event is required">
                        <b-form-select v-model="e_3" :options="event_options" value-field="item" text-field="item" class="mt-3">
                        </b-form-select>
                    </b-form-group>
                    <b-form-group label="Player" label-for="Text-input" invalid-feedback="Text is required">
                        <b-form-input :id="'3Text-input_'+ this.iData.index" type="text" required></b-form-input>
                    </b-form-group>
                </b-form-group>
            </form>
        </b-modal>
        <b-button :id="'eB_'+ this.iData.index" v-b-modal.modal-prevent="'modal-prevent_'+ this.iData.index" style="background:none;border:none;">
            <b-icon :id="'e_' + this.iData.index" icon="pencil" aria-hidden="true" style="color:orange;"></b-icon>
        </b-button>
        <b-modal ok-only ok-title="Ok" :id="'modal-prevent_'+ this.iData.index" ref="modal2" title="Edit Event"
            @ok="UpdateMatch">
            <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group label="Minute" label-for="Minutes-input" invalid-feedback="Minutes is required">
                <b-form-input :id="'Minutes-input_'+ this.iData.index" type="number" min="1" max="90" required
                style="width=40px"></b-form-input>
            </b-form-group>
            <b-form-group label="Event" label-for="Event-input" invalid-feedback="Event is required">
                <b-form-select v-model="event_selected" :options="event_options" value-field="item" text-field="item" class="mt-3">
                </b-form-select>
            </b-form-group>
            <b-form-group label="Player" label-for="Text-input" invalid-feedback="Text is required">
                <b-form-input :id="'Text-input_'+ this.iData.index" type="text" required></b-form-input>
            </b-form-group>
            </form>
        </b-modal>
        <button type="button" class="btn btn-primary" style="background:none;border:none;" @click="deleteMatch" >
            <b-icon v-bind:id="'x_' + this.iData.index" icon="x-circle" aria-hidden="true" style="background:none;fill:red;" ></b-icon>
        </button>
    </div>
</template>

<script>
const letter = (p) => /[a-zA-Z ]/i.test(p)
const validNumber = (p) => /[0-9]/i.test(p)
export default {
    name: "ActionButton",
    data(){
        return{
            e_1:"Goal",
            e_2:"Goal",
            e_3:"Goal",
            event_selected: "Goal",
            event_options: [
            { item: "Goal" },
            { item: "Offside"},
            { item: "Foul"},
            { item: "Red Card"},
            { item: "Yellow Card"},
            { item: "Injury "},
            { item: "Substitute"}
            ]
        }
    },
    props :{
        iData :{
            type: Object,
            required: true
        }
    },
    methods:{
        UpdateMatch(value) {
            debugger;
            let send_event = this.event_selected;
            if(value == 'Score'){
                let all_events = '';
                for(let i=1;i<4;i++){
                    debugger;
                    let text = document.getElementById(`${i}Text-input_${this.iData.index}`);
                    let minutes = document.getElementById(`${i}Minutes-input_${this.iData.index}`);
                    if(!(text.value && minutes.value)){
                        this.$root.toast("Invalid Input", "Empty input is not valid!", "danger");return;}
                    if(!letter(text.value)){
                        this.$root.toast("Invalid Input", "Provided player name should be alphabetic only!", "danger");return;}
                    if(!(validNumber(minutes.value)&& minutes.value>0 && minutes.value<=90)){
                        this.$root.toast("Invalid Input", "Provided minute is not valid!", "danger");return;}
                    let event = (i==1)?this.e_1:(i==2)?this.e_2:this.e_3;
                    let add_event = this.iData.item.Match_Date +' '+ this.iData.item.Hour +' '+ minutes.value +' '+ event +' ' +text.value + ((i<3)?',':'');
                    all_events = all_events.concat(add_event)
                }
                send_event = all_events;
            }  
            this.$emit('update',{
                data:this.iData,
                value:value,
                event_selected:send_event
                })
        },
        deleteMatch() {
            this.$emit('delete',this.iData)
        }
    }
}
</script>
