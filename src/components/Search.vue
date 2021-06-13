<template>
    <div class="p_search" v-show="this.searches.length == this.ready_components">
        <div v-if="this.start">
            <PreviewDisplay 
                v-for="s in searches"
                :type="s.Sname"
                :id="s.id"
                :key="s.id">
            </PreviewDisplay>
        </div>
    </div>
</template>

<script>
import PreviewDisplay from "./PreviewDisplay.vue";
export default {
  name: "Search",
    components: {
    PreviewDisplay
  }, 
  data() {
    return {
      searches: [],
      ready_components : 0,
      Sname : "",
      filter : "",
      start: false
    };
  },
  methods: {
    fixSearchers: function (){
        if(this.Sname == 'coaches'){
            var array = [];
            (this.searches).forEach(element => {
                array.push({
                    id : element.coach_id,
                    coach_name : element.coach_name,
                    Sname: "coaches"
            })})
            this.searches = array;
        }
        else{
            (this.searches).forEach(element => {
                element.Sname = this.Sname
            })
        }
    },
    async startSearch(keyword){
        try {
            await this.axios.get(
                `${this.$root.api_domain}/${this.Sname}/search?keyword=${keyword}`)
            .then((response) => {
                this.searches = response.data;
                this.fixSearchers()
                console.log(this.searches);
                this.start = true;
            })
        } catch (error) {
            console.log("error in update games")
            console.log(error);
        }
    }
  }, 

};
</script>

<style>

.favorties{
  display: flex; /* or inline-flex */
  flex-direction: row
}
</style>
