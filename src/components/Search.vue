<template>
    <div class="p_search" >
        <div class ="PD_search" > 
            <transition name="fade_search">
            <div v-if="this.start" :key="[this.current_display, this.start]">
            <b-container fluid="sm" style="margin-top:10px;">
                    <div class="row_container2">
                        <b-row class="row_container3">
                            <b-col cols="12" md="2" v-if="current_display<searches.length" :key="this.current_display" class="preview">
                                <PreviewDisplay :key="re_render"
                                    :Display_ID="parseInt(searches[current_display]['id'])" 
                                    :type="searches[current_display].Sname"
                                >
                                </PreviewDisplay>
                            </b-col>
                            <b-col cols="12" md="2" v-if="current_display+1<searches.length" :key="this.current_display" class="preview">
                                 <PreviewDisplay  :key="re_render"
                                    :Display_ID="parseInt(searches[current_display+1]['id'])" 
                                    :type="searches[current_display+1].Sname"
                                >
                                </PreviewDisplay>
                            </b-col>
                            <b-col cols="12" md="2" v-if="current_display+2<searches.length" :key="this.current_display" class="preview">
                                 <PreviewDisplay  :key="re_render"
                                    :Display_ID="parseInt(searches[current_display+2]['id'])" 
                                    :type="searches[current_display+2].Sname"
                                >
                                </PreviewDisplay>
                            </b-col>
                            <b-col cols="12" md="2" v-if="current_display+3<searches.length" :key="this.current_display" class="preview">
                                 <PreviewDisplay  :key="re_render"
                                    :Display_ID="parseInt(searches[current_display+3]['id'])" 
                                    :type="searches[current_display+3].Sname"
                                >
                                </PreviewDisplay>
                            </b-col>
                        </b-row>
                    </div>
            </b-container>
            </div>
            </transition>
            <transition name="fade">
            <div class="nav_button" v-if="this.show_paginiation">
                <b-button-toolbar key-nav aria-label="Toolbar with button groups">
                    <b-button-group class="mx-1">
                    <b-button @click="decrementDisplay">&lsaquo;</b-button>
                    </b-button-group>
                    <b-button-group class="mx-1">
                    <b-button @click="incrementDisplay">&rsaquo;</b-button>
                    </b-button-group>
                </b-button-toolbar>
            </div>
            </transition>
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
      re_render: 0,
      searches: [],
      ready_components : 0,
      Sname : "teams",
      filter : "",
      filterBy : "",
      sort: "",
      start: false,
      current_display: 0,
      show_paginiation: false
    };
  },
  methods: {
    decrementDisplay(){
        if (this.current_display - 4 >= 0)
            this.current_display = this.current_display - 4;
    },
    incrementDisplay(){
        if (this.current_display + 4 < this.searches.length)
            this.current_display = this.current_display + 4;
    },  
    search_by_name: function (keyword, searched) {
        let filtered = []
        keyword = keyword.toLowerCase();
        searched.map(
            (element) => {
                if (element.name != null ){
                    let n_element = element.name.toLowerCase();
                    if(n_element.includes(keyword))
                        filtered.push(element)
                }    
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
        var sortBy = this.sort
        if(sortBy){
            this.searches.sort(function(a,b) {
                return (a[sortBy] < b[sortBy]) ? -1 :
                 (a[sortBy] > b[sortBy]) ? 1 : 0;
            })
        }
    },
    filterSearches: function (){
        if(this.filter){
            let filtered = []
            this.searches.map(
                (element) => {
                    if (element[this.filter] != null && element[this.filter] == this.filterBy)
                        filtered.push(element)
                        })
            this.searches = filtered
        }      
    },
    startSearch: function(keyword,lastSearch){
        this.start = false;
        this.searches = [];
        this.re_render++;
        this.current_display = 0;
        this.ready_components = 0;
        try {
            const searched =  JSON.parse(localStorage.getItem(`all_${this.Sname}`))
            this.searches = this.search_by_name(keyword, searched)
            this.fixSearchers();
            this.sortSearchers();
            this.filterSearches();
            this.start = true;
            if(!lastSearch && this.start && this.searches.length == 0 ){
                this.$root.toast("Search", `None ${this.Sname} found !`, "warning");}
            else{
                this.show_paginiation = true;
            }
        } catch (error) {
            console.log(error);
        }
    }
  }
};
</script>

<style>
.PD_search{
    margin-left: 25px;
}

.fade_search-enter-active {
  transition: opacity 1s;
}
.fade_search-enter {
  opacity: 0;
}
</style>
