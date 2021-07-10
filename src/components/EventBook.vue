<template>
    <div>
        <div class="event_book">
            <b-button id="toggle-btn" size="sm" @click="toggleModal">Event Book</b-button>
        </div>
        <b-modal ref="my-modal" hide-footer title="Match's Event Book">
            <div class="d-block text-center">
                <div v-if="this.splited_event_book.length>0">
                    <h4>Match Events:</h4>
                    <ul>
                        <li v-for="e in this.splited_event_book" :key="e">
                        {{ e }}
                        </li>
                    </ul>
                </div>
                <h4 v-else>No events for this match!</h4>
            </div>
            <b-button class="mt-2" id="toggle_button" variant="outline-secondary" block @click="toggleModal">Close</b-button>
        </b-modal>       
    </div>
</template>

<script>
export default {
    name: "EventBook",
    data(){
        return{
            splited_event_book: []
        }
    },
    props:{
        EventBook:{
            type: String,
            require: true
        }
    },
    methods:{
        toggleModal() {
          this.$refs['my-modal'].toggle('#toggle-btn')
        },
        set_event_book(){
          if (this.EventBook!=undefined){
            let splited = this.EventBook.split(',')
            if (splited[0] != ""){
              for (let i = 0; i< splited.length;i++){
                this.splited_event_book.push(splited[i])
              }
            }
          }
        }
    },
    mounted(){
        this.set_event_book();
    }
}
</script>

<style>

#toggle_button{
    width: max-content;
    padding-inline: 50px;
    margin-inline: auto;
}

</style>