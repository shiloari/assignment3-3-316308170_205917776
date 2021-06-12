<template>
  <div class="container">
    <LoginPage id="login" v-if="!$root.store.username"></LoginPage>
    <FavoriteGames v-else></FavoriteGames>
    <LeagueInfo id="league_info"></LeagueInfo>
    <div class="preview">
    <PreviewDisplay 
    :type="'player'"
    :id="26722"
    >
    </PreviewDisplay>
    <PreviewDisplay 
    :type="'coach'"
    :id="459045"
    >
    </PreviewDisplay>
    </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
import PreviewDisplay from "../components/PreviewDisplay"
export default {
  components: {
    LeagueInfo, 
    LoginPage, 
    FavoriteGames,
    PreviewDisplay
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


#login{
  position: absolute;
  top: 20%;
  left: 5%;
}

#league_info{
  // border: solid 2px red;
  position:absolute;
  right: 5%;
  height: 90%;
  overflow: hidden;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
  // filter: blur(1px); 
  backdrop-filter: blur(15px);
}

</style>
