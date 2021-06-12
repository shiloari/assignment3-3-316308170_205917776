<template>
  <div class="favorites">
    <GamePreview
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
  components: {
    GamePreview
  }, 
  data() {
    return {
      games: [
        // {
        //   id:25,
        //   hostTeam: "Maccabi Tel-Aviv",
        //   guestTeam: "Hapoel Beer-Sheva",
        //   date: "27/5/21",
        //   hour: "20:00"
        // },
        // {
        //   id:39,
        //   hostTeam: "Hapoel Tel-Aviv",
        //   guestTeam: "Maccabi Haifa",
        //   date: "29/5/21",
        //   hour: "20:00"
        // },
        // {
        //   id:43,
        //   hostTeam: "Maccabi Haifa",
        //   guestTeam: "Maccabi Haifa",
        //   date: "31/5/21",
        //   hour: "20:00"
        // }
      ]
    };
  },
  methods: {
    async updateGames(){
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoriteMatches",
        );
        console.log(JSON.stringify(response.data))
        this.games = response.data;
        console.log(this.games[0])
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
    console.log("favorite games mounted");
    this.updateGames(); 
  }
};
</script>

<style>

.favorties{
  display: flex; /* or inline-flex */
  flex-direction: row
}
</style>
