<template>
  <div id="app">
    <div class="nav_bar">
      <b-navbar toggleable="lg" type="dark" variant="dark" >
        <b-navbar-brand :to="{ name: 'main' }">Superliga</b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'standing' }">Standing</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto" v-if="!this.$session.exists()">
            <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
            <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown right>
            <template #button-content>
              {{ username }}
            </template>
            <b-dropdown-item href="#">Favorites</b-dropdown-item>
            <b-dropdown-item @click="Logout" href="#">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="router">
     <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return{
        username: undefined
    }
   
  },
  created(){
    this.username = localStorage.getItem("username");
  },
  watch:{
      username: function(){
    this.username = localStorage.getItem("username");
      }
  },
  methods: {
    async Logout() {
      try{
        // const response = this.$root.server.post("Logout");
        const response = await this.$root.server.post('Logout', {
          withCredentials: true
          })
        this.$session.destroy()
        console.log('session dead')
        this.$router.go()

      }
      catch(err){
        console.log(err.response);
      }
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      // this.$router.push("/").catch(() => {
      //   this.$forceUpdate();
      // });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  max-height: 100vh;
  background: url("./assets/background3.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  // position: relative;
  // display:flex;
  // justify-content: column;
  // width: 100%;
  // border: solid 5px blue;
}

.router{
  // border: solid 5px blue;
  // max-height: 100%;
  height: 100vh;
  width: 100%;
  position: relative;
  // right: 0;
  // top: 9%;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // border: solid 5px blue;
}

.nav_bar{
  // border: solid 5px orange;
  // position: fixed;
  width: 100%;
  top:0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // border: solid 5px yellow;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #fff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
