<template>
  <div class="main_page">
    <LoginPage id="login" v-if="!this.$session.exists()"></LoginPage>
    <!-- <FavoriteGames id="favorites"></FavoriteGames>  -->
    <div id="right_side_display">
      <LeagueInfo id="league_info"></LeagueInfo>
    </div>
    <PreviewDisplay class="preview" v-if="this.$session.exists()"
    :type="'players'"
    :Display_ID="26722"
    >
    </PreviewDisplay>
    <PreviewDisplay class="preview" v-if="this.$session.exists()"
    :type="'coaches'"
    :Display_ID="459045"
    >
    </PreviewDisplay>
    <PreviewDisplay class="preview" v-if="this.$session.exists()"
    :type="'teams'"
    :Display_ID="939"
    >
    </PreviewDisplay>
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
    // FavoriteGames,
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


.main_page{
  position: relative;
  display:inline-flex;
  width: 100%;
  height: 100%;
}

#league_info{
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
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

</style>
