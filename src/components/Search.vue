<template>
    <div class="p_search">  <!-- v-show="this.searches.length == this.ready_components"> -->
        <div> <!-- v-if="this.start"> -->
            <ul>
                <li v-for="s in searches"
                :key="s.id">
                {{s.name}}
                </li>
            </ul>   
            <!-- <PreviewDisplay 
                v-for="s in searches"
                :type="s.Sname"
                :id="s.id"
                :key="s.id">
            </PreviewDisplay> -->
        </div>
        <div v-show="this.searches.length == 0 && this.start">None {{this.Sname}} found</div>
    </div>
</template>

<script>
import PreviewDisplay from "./PreviewDisplay.vue";
export default {
  name: "Search",
//     components: {
//     PreviewDisplay
//   }, 
  data() {
    return {
      searches: [],
      ready_components : 0,
      Sname : "teams",
      filter : "",
      sort: "",
      start: false
    };
  },
  methods: {
    fixSearchers: function (){
        (this.searches).forEach(element => {
            element.Sname = this.Sname
        })
    },
    sortSearchers: function () {
        let sortBy = this.sort
        if(sortBy){
            this.searches.sort(function(a,b) {
                return (a[sortBy] < b[sortBy]) ? -1 :
                 (a[sortBy] > b[sortBy]) ? 1 : 0;
            })
        }
    },
    async startSearch(keyword){
        this.searches = [];
        this.ready_components = 0;
        try {
            await this.$root.server.get(
                `${this.Sname}/search?keyword=${keyword}`)
            .then((response) => {
                this.searches = response.data;
                this.fixSearchers()
                console.log(this.searches);
                this.sortSearchers()
                console.log(this.searches);
                this.start = true;
            })
        } catch (error) {
            console.log("error in get search")
            console.log(error);
        }
    }
  }
//   watch:{
//       ready_components:
//   }

};
</script>

<style>

.favorties{
  display: flex; /* or inline-flex */
  flex-direction: row
}
</style>
