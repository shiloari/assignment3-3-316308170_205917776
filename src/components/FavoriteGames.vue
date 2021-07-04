<template>
<div>
  <div class="favorites" v-show="this.games.length == this.ready_components" :key="re_render">
    <GamePreview id="favorite" @deleted_favorite="deleted(g.Match_ID)" 
        v-for="g in games"
        :Match_ID="g.Match_ID" 
        :Home_Team_ID="g.Home_Team_ID" 
        :Away_Team_ID="g.Away_Team_ID" 
        :Match_Date="g.Match_Date" 
        :Hour="g.Hour" 
        :Stadium="g.Stadium"
        :Stage="g.Stage"
        :Score="g.Score"
        :EventBook="g.EventBook"
        :key="g.id">
      </GamePreview>
  </div>
  <div v-if="this.no_favorites" style="margin-left: 80px; width: max-content;" :key="re_render">
    <h4>No Available Favorite Games</h4>
  </div>
</div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  props:{
    size: {
        type: Number,
        required: true
      }
  },
  components: {
    GamePreview
  }, 
  data() {
    return {
      games: [],
      ready_components : 0,
      re_render: 0,
      no_favorites: undefined
    };
  },
  methods: {
    deleted(Match_ID){
      this.games = this.games.filter(game => game.Match_ID == Match_ID)
      this.re_render++;
    },
    async updateGames(){
      try {
        const response = await this.$root.server.get(
          `users/favoriteMatches`,
        );
        this.games = response.data.slice(0,Math.min(this.size,response.data.length));
        this.no_favorites = false;
        console.log(this.no_favorites);
      } catch (error) {
        console.log("in error");
        this.no_favorites = true;
      }
    }
  }, 
  mounted(){
    this.updateGames(); 
  }
};
</script>

<style>

.favorites{
  margin-top: 15px;
  margin-bottom: 100px;
}

#favorite{
  margin-block: 10px;
  margin-left: 40px;
}
</style>
