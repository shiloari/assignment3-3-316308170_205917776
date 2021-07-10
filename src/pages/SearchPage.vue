<template>
  <div class = "search_page" style="scroll-behavior: smooth;">
    <div class="title"><h1 >Search Page</h1></div>
    <div class="search_def">
    <div class = "chose_type">
             <b-form-select
        v-model="PCT_selected"
        :options="PCT_options"
        class="mt-3"
        value-field="item"
        text-field="name"
        id="stam"
      ></b-form-select>
      </div>
    <div class="search_const">
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
        <transition name="fade">
        <div id="position" v-show="this.PCT_selected != 'teams' && fp_selected[0] == 'position'" >
            <b-form-select
              v-model="f_selected"
              :options="f_options"
              class="mt-3"
              value-field="item"
              text-field="name"
            ></b-form-select>
        </div>
        </transition>
      <transition name="fade">
        <div v-if="this.PCT_selected != 'teams' && fp_selected[0] == 'team_id'" >
        <b-form-select  id="teams"
          v-model="team_selected"
          :options="team_options"
          class="mt-3"
          value-field="item"
          text-field="name"
          :select-size = "4"
        ></b-form-select>
        </div>
      </transition>
      </div>
      <transition name="slide">
      <b-input-group prepend="Search Query:" id="search-input" >
        <b-form-input v-model="searchQuery"></b-form-input>
        <b-input-group-append>
          <b-button variant="dark" @click='runSearch(false)'>Search</b-button>
        </b-input-group-append>
      </b-input-group>
      </transition>
    </div>
    </div>
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
        { item: 'team_id', name: "Team Name" ,notEnabled: false}],
      s_selected: [],
      s_options: [
        { item: 'name', name: "Alpha",notEnabled: false },
        { item: 'team', name: "Team Name" ,notEnabled: true}],
      f_selected: '1',
      f_options : [
        { item: '1', name: '1' },
        { item: '2', name: '2' },
        { item: '3', name: '3' },
        { item: '4', name: '4' }],
      team_selected: '',
      team_options : [],
      slided: false
    };
  },
  methods:{
    runSearch: function (lastSearch){
      if(this.searchQuery.length > 0){
        if(localStorage.getItem("username")){
          localStorage.setItem("search",
          JSON.stringify({
          query:this.searchQuery,
          PCT:this.PCT_selected,
          fp:this.fp_selected,
          s:this.s_selected,
          f:this.f_selected,
          team:this.team_selected
          }));
        }  
        if(this.$refs.child.filter == 'position')
            this.$refs.child.filterBy = this.f_selected
        else if(this.$refs.child.filter == 'team_id')
            this.$refs.child.filterBy = this.team_selected
        this.$refs.child.startSearch(this.searchQuery,lastSearch);
      }
      else
          this.$root.toast("Search", "No given Queary to serach !", "warning");
    }
  },
  created(){
      let all_teams = JSON.parse(localStorage.getItem("all_teams"));
      this.team_selected = all_teams[0].id;
      all_teams.map( team => {
        this.team_options.push({
          item : team.id,
          name : team.name
        })
      })
  },
  mounted(){
    if(localStorage.getItem("username")){
        let search = JSON.parse(localStorage.getItem("search"))
          if(search && search.query){
            this.searchQuery = search.query;
            this.PCT_selected = search.PCT;
            this.fp_selected = search.fp;
            this.s_selected = search.s;
            this.f_selected = search.f;
            this.team_selected = search.team;
            this.$refs.child.Sname = this.PCT_selected
            this.$refs.child.filter = this.fp_selected[0]
            this.$refs.child.sort = this.s_selected[0]
            this.$refs.child.filterBy = (this.f_selected)?this.fp_selected:this.team_selected;
            this.runSearch(true);
          }
      }  
  },
  watch:{ 
    PCT_selected: function(newValue) {
      this.$refs.child.Sname = this.PCT_selected
      this.$refs.child.filter = this.fp_selected[0]
      this.$refs.child.sort = this.s_selected[0]
      this.team_selected = this.team_options[0].item
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
            this.$refs.child.filterBy = this.f_selected;
            this.fp_options[1].notEnabled = true;
            
        }    
        else if (newValue.includes('team_id')){
            this.$refs.child.filterBy = this.team_selected;
            this.fp_options[0].notEnabled = true;
        }
        else{
          this.$refs.child.filterBy = '';
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
.search_page{
  overflow: scroll;
  height: 100%;
  backdrop-filter: blur(5px);
}

h1{
  color: white;
  margin-top: 20px;
}

.search_def{
  width: 85%;
  margin-inline: auto;
  text-align: center;
  display: flex;
  color: black;
}

.search_const{
  width: max-content;
}

.chose_type{
  width:30%;
  height: max-content;
  margin-block: auto;
  
}

#stam {
  margin-top: 100px;
  width: 150px; 
  float: right;
}

.search_changeable{
  width: 20%;
}


#checked_sort{
  display:inline-block;
  margin-top:50px;
}
#checked_filter{
  display:inline-block;
  margin-top:50px;
  
}

.mt-3{
  margin-left: 20px; 
  margin-bottom: 5px;
  width: 150px; 
}
#search-input {
  margin-inline: auto;
  margin-top:10px;
  width: 500px; 
}

.title h1{
  color: #2c3e50;
  text-align: center;
}

.title{
  margin-inline: auto;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

#teams{
  margin-inline: auto;
  margin-bottom: 10px;
}

</style>

