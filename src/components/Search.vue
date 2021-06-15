<template>
    <div class="p_search" v-show="this.searches.length == this.ready_components">
        <div class ="PD_search" v-if="this.start">
            <div class="row" v-for="i in Math.ceil(searches.length /5)" :key="i.id">
                <PreviewDisplay 
                    v-for="s in searches.slice((i - 1) * 5, i * 5)"
                    :type="s.Sname"
                    :Display_ID="s.id"
                    :key="s.id">
                </PreviewDisplay>
            </div>
        </div>
    </div>
    <!-- <ul>
                <li v-for="s in searches"
                :key="s.id">
                {{s.name}}
                </li>
            </ul>    -->
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
      Sname : "teams",
      filter : "",
      sort: "",
      start: false
    };
  },
  methods: {
    search_by_name: function (keyword, searched) {
        let filtered = []
        searched.map(
            (element) => {
                if (element.name != null && element.name.includes(keyword))
                    filtered.push(element)
        }
    )
        return filtered;
    },
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
        this.start = false;
        this.searches = [];
        this.ready_components = 0;
        try {
            const searched =  JSON.parse(localStorage.getItem(`all_${this.Sname}`))
            this.searches = this.search_by_name(keyword, searched)
            this.fixSearchers()
            this.sortSearchers()
            this.start = true;
            
        } catch (error) {
            console.log("error in get search")
            console.log(error);
        }
    }
  },
  watch:{
      start : function () {
          if(this.start && this.searches.length == 0 ){
                this.$root.toast("Search", `None ${this.Sname} found !`, "warning");}
      }
  }
};
</script>

<style>

.PD_search{
    margin-left: 25px;
}
</style>
