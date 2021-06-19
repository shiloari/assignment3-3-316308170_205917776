<template>
  <div class="favorites" v-show="this.games.length == this.ready_components">
    <GamePreview id="favorite"
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
      ready_components : 0
    };
  },
  methods: {
    async updateGames(){
      try {
        const response = await this.$root.server.get(
          `users/favoriteMatches`,
        );
        this.games = response.data.slice(0,Math.min(3,response.data.length));
        // this.games = [];
        // this.games.push(...games);
        // console.log(response);
      } catch (error) {
        console.log("error in update games")
        console.log(error);
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
}
</style>
