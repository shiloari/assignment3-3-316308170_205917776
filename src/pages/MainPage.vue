<template>  
  <div class="main_page">
    <div v-if="!this.is_loaded" class="d-flex justify-content-center" style="margin-top: 15%;">
      <div id="waiting" class="spinner-border text-dark" style="width: 5rem; height: 5rem;" role="status">
          <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-show="this.is_loaded" >
      <LoginPage id="login" v-if="!this.$session.exists()"></LoginPage>
      <div v-else id="favorites">
          <h1 id="header">Your favorite matches</h1>
          <transition name="fade">
            <FavoriteGames  @deleted_favorite="re_render_page()" :key="re_render" :size="3"></FavoriteGames> 
          </transition>
      </div>
      <div id="right_side_display">
          <LeagueInfo :key="re_render" @loaded="updateparent"
           @added_favorite="re_render_page()" @deleted_favorite="re_render_page()"
           id="league_info"></LeagueInfo>
      </div>
    </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
import PreviewDisplay from "../components/PreviewDisplay"
export default {
  data(){
    return{
      is_loaded: false,
      re_render: 0
    }
    
  },
  methods:{
    re_render_page(){
      this.re_render++;
    },
    updateparent() {
        this.is_loaded = true;
    }
  },
  components: {
    LeagueInfo, 
    LoginPage, 
    FavoriteGames
    // PreviewDisplay
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}


.main_page{
  overflow: scroll;
  // position: relative;
  // display:inline-flex;
  width: 100%;
  height: 100%;
}

#league_info{
  position: absolute;
  top: 0;
  right: 0;
  height: 120%;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
  backdrop-filter: blur(15px);
}

#login{
  left: -30%;
  top: 10%;
  height: 60%;
}

.row.no-gutter {
  margin-left: -100px;
  margin-right: -100px;
}

.favorites{
  height: 110%;
  margin-left: 40px;
  // margin-bottom: 50px;
}



#header{
  // color: white;
  margin-left: 190px;
  margin-top: 20px;
  // text-align: center;
  color: #2c3e50;
  box-shadow: inset 0 0 200px rgba(255, 255, 255, .5);
  width: max-content;
  // margin: 0 auto;
  padding-inline: 15px;
  padding-block: 1px;
  border-radius: 5px;

}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
