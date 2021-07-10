<template>
    <div class="error_container">
        <h1>You shouldn't be here..&nbsp;&#128517;</h1>
        <h3>How about we go back to a proper place?</h3>
        <b-button @click="goBack()" 
        type="submit"
        variant="dark"
        style="width:150px; margin-top:20px;"
        >Okay..</b-button
      >
    </div>
</template>
<script>
    export default {
        name: "InvalidAccess",
        methods:{
            goBack(){
                this.$router.push("/")
            }
        }    
    }
</script>
<style>
.error_container{
    margin-top: 5%;
    margin-inline: auto;
    max-width: 600px;
    padding-top: 40px;
    padding-bottom: 60px;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2); 
    border-radius: 5px;
    position: relative;
    z-index: 1;
    background: inherit;
    overflow: hidden;
    text-align: center;
}

.error_container:before{
   content: "";
    position: absolute;
    background: inherit;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
    filter: blur(10px);
    backdrop-filter: blur(10px);
    margin: -20px;
}

</style>