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
    <div id="checked_filter" v-if="this.PCT_selected != 'teams'">
      <div class="mt-3">Selected:</div>
        <b-form-checkbox-group
          v-model="fp_selected"
          :options="fp_options"
          class="mb-3"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
        ></b-form-checkbox-group>
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
        { item: 'Position', name: "position",notEnabled: false },
        { item: 'Team', name: "team" ,notEnabled: false}]
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
      this.fp_selected = [];
      this.fp_options[1].notEnabled = false;
      if(newValue == 'coaches')
          this.fp_options[0].notEnabled = true;     
      else
          this.fp_options[0].notEnabled = false;
    },
    fp_selected: function(newValue) {
      if(this.PCT_selected == 'players'){
        if(newValue.includes('Position')) {
            this.fp_options[1].notEnabled = true;
            
        }    
        else if (newValue.includes('Team')){
            this.fp_options[0].notEnabled = true;
        }
        else{
          this.fp_options[1].notEnabled = false;
          this.fp_options[0].notEnabled = false;
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