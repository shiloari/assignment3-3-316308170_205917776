<template>
  <div>
    <h1 class="title">Search Page</h1>
    <b-form-select
      v-model="PCT_selected"
      :options="PCT_options"
      class="mt-3"
      value-field="item"
      text-field="name"
      id="stam"
    ></b-form-select>
    <div id="checkers">
      <div id="checked_sort">
        <div class="mt-3">Sort by:</div>
          <b-form-checkbox-group
            v-model="s_selected"
            :options="s_options"
            class="mb-3"
            style="margin-left: 20px;"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-checkbox-group>
      </div>
      <div id="checked_filter" v-if="this.PCT_selected != 'teams'">
        <div class="mt-3">Filter by:</div>
          <b-form-checkbox-group
            v-model="fp_selected"
            :options="fp_options"
            class="mb-3"
            style="margin-left: 20px;"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-checkbox-group>
      </div>
      
    </div>
    <b-input-group prepend="Search Query:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button variant="success" @click="runSearch">Search</b-button>
      </b-input-group-append>
    </b-input-group>
    <Search ref="child" id="search"></Search>
  </div>
  
</template>

<script>
import Search from '../components/Search.vue';
export default {
  components: { Search },
  name:"SearchPage",
  data() {
    return {
      searchQuery:"",
      PCT_selected: "teams",
      PCT_options: [
        { item: "players", name: 'Player' },
        { item: "coaches", name: 'Coach' },
        { item: "teams", name: 'Team' }],
      fp_selected: [],
      fp_options: [
        { item: 'position', name: "Position",notEnabled: false },
        { item: 'team', name: "Team Name" ,notEnabled: false}],
      s_selected: [],
      s_options: [
        { item: 'name', name: "Alpha",notEnabled: false },
        { item: 'team', name: "Team Name" ,notEnabled: true}]
    };
  },
  methods:{
    runSearch: function (){
      // await new Promise(r => setTimeout(r, 1000));
      this.$refs.child.startSearch(this.searchQuery);
    }
  },
  watch:{
    PCT_selected: function(newValue) {
      this.$refs.child.Sname = this.PCT_selected
      this.$refs.child.filter = this.fp_selected[0]
      this.$refs.child.sort = this.s_selected[0]
      this.fp_selected = [];
      this.s_selected = [];
      this.fp_options[1].notEnabled = false;
      (this.s_options).forEach(element => {
        element.notEnabled = false;
      });
      if(newValue == 'coaches'){
          this.fp_options[0].notEnabled = true;
          return
      }
      else if(newValue == 'teams'){
          this.s_options[1].notEnabled = true;
          this.s_options[2].notEnabled = true;
      }
      this.fp_options[0].notEnabled = false;
    },
    fp_selected: function(newValue) {
      this.$refs.child.filter = this.fp_selected[0];
      if(this.PCT_selected == 'players'){
        if(newValue.includes('position')) {
            this.fp_options[1].notEnabled = true;
            
        }    
        else if (newValue.includes('team')){
            this.fp_options[0].notEnabled = true;
        }
        else{
          this.fp_options[1].notEnabled = false;
          this.fp_options[0].notEnabled = false;
        }
      }
    },
    s_selected: function(newValue) {
      this.$refs.child.sort = this.s_selected[0];
      if(newValue.length > 0) {
          (this.s_options).forEach(e => {
            if(newValue[0] != e.item)
                e.notEnabled = true;
          })  
      }    
      else{
        if(this.PCT_selected != 'teams'){
          (this.s_options).forEach(e => {
                e.notEnabled = false;
            })
        }
      }
    }
  }
}
</script>

<style scoped>

#stam {
  margin-left: 20px; 
  margin-bottom: 5px;
  margin-top: 20px;
  width: 150px; 
}
#checked_sort{
  display:inline-block;
}
#checked_filter{
  display:inline-block;
}
.mt-3{
  margin-left: 20px; 
  margin-bottom: 5px;
  width: 150px; 
}
#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>

