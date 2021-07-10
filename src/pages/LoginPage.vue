<template>
<div>
    <div v-if="this.$session.exists()" class="container">
        <InvalidAccess/>
    </div>
    <div v-else>
        <Login/>
    </div>
</div>
</template>
<script>
import Login from "../components/Login.vue"
import InvalidAccess from "../components/InvalidAccess.vue"
export default {
    name: "LoginPage",
    components:{
        Login,
        InvalidAccess
    }
}
</script>
<style>

</style>