<template>
    <div>
        <b-button :id="'aB_'+ this.index" v-b-modal.modal-prevent="'modal-Score_'+ this.index" style="background:none;border:none;" v-show="!this.iData.item.Score">
            <b-icon :id="'add_' + this.index" icon="file-plus" aria-hidden="true" style="color:green;"></b-icon>
        </b-button>
        <b-modal ok-only ok-title="add" :id="'modal-Score_'+ this.index" ref="modal3" title="Add Score"
            @ok="UpdateMatch('Score')">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group label="Score" label-for="Score-input" invalid-feedback="Score is required">
                <div style="display:flex">
                <b-form-input :id="'Score-input1_' + this.index" type="number" min="0" max="50" size="sm" 
                style="width:60px;"></b-form-input>
                -:-
                <b-form-input :id="'Score-input2_' + this.index" type="number" min="0" max="50" size="sm"
                style="width:60px;"></b-form-input>
                </div>
            </b-form-group>
            </form>
        </b-modal>
        <b-button :id="'eB_'+ this.index" v-b-modal.modal-prevent="'modal-prevent_'+ this.index" style="background:none;border:none;">
            <b-icon :id="'e_' + this.index" icon="pencil" aria-hidden="true" style="color:orange;"></b-icon>
        </b-button>
        <b-modal ok-only ok-title="Ok" :id="'modal-prevent_'+ this.index" ref="modal2" title="Edit Event"
            @ok="UpdateMatch">
            <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group label="Date" label-for="Date-input" invalid-feedback="Date is required">
                <b-form-input :id="'Date-input_' + this.index" type="date" required></b-form-input>
            </b-form-group>
            <b-form-group label="Hour" label-for="Hour-input" invalid-feedback="Hour is required">
                <b-form-input :id="'Hour-input_'+ this.index" type="time" required></b-form-input>
            </b-form-group>
            <b-form-group label="Minutes" label-for="Minutes-input" invalid-feedback="Minutes is required">
                <b-form-input :id="'Minutes-input_'+ this.index" type="number" min="0" max="200" required></b-form-input>
            </b-form-group>
            <b-form-group label="Event" label-for="Event-input" invalid-feedback="Event is required">
                <b-form-select v-model="event_selected" :options="event_options" value-field="item" text-field="item" class="mt-3">
                </b-form-select>
            </b-form-group>
            <b-form-group label="Text" label-for="Text-input" invalid-feedback="Text is required">
                <b-form-input :id="'Text-input_'+ this.index" type="text" required></b-form-input>
            </b-form-group>
            </form>
        </b-modal>
        <button type="button" class="btn btn-primary" style="background:none;border:none;" @click="deleteMatch" >
            <b-icon v-bind:id="'x_' + this.index" icon="x-circle" aria-hidden="true" style="background:none;fill:red;" ></b-icon>
        </button>
    </div>
</template>

<script>
export default {
    name: "AddMatch",
    data(){
        return{
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
            require
        },
        index :{
            type: Number
        }
    },
    methods:{
        UpdateMatch(value) {
            this.iData.index = this.index;
            this.$emit('update',{
                data:this.iData,
                value:value,
                event_selected:this.event_selected
                })
        },
        deleteMatch() {
            this.iData.index = this.index;
            this.$emit('delete',this.iData)
        }
    },
}
</script>

<style>
</style>