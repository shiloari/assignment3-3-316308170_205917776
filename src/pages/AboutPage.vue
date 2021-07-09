<template>
    <div class="main_about_container">
        <p style="text-align:center; font-size:60px;"><b>About Us</b></p>
        <div class="developers">
            <div class="developer">
                <img src="../assets/Gal.jpg">
                <h3><a href="https://www.linkedin.com/in/gal-alkalay-191743163/">Gal Alkalay</a></h3>
            </div>
            <div class="developer">
                <img src="../assets/Ariel.png">
                <h3><a href="https://www.linkedin.com/in/arielshilo/">Ariel Shilo</a></h3>
            </div>
        </div>
        <div class="frosted_glass_about">
            <div>
            <p style="color:black">
                Welcome to our website!<br>
                We're excited to haver you here!<br>
                In this website you can keep track of everything that happens in the Superliga!<br>
                We invite you to sign up and enjoy more features! 
            </p>
            </div>
        </div>
        <h1 style="text-align: center; margin-top:20px;">Recent Projects</h1>
        <div class="links">
            <a href="https://web-development-environments-2021.github.io/205917776/"><u>Gal's 1st Assignment</u></a>
            <a href="https://web-development-environments-2021.github.io/Assignment2_316308170_205917776/"><u>Our Pacman Assignnent</u></a>
            <a href="https://web-development-environments-2021.github.io/316308170/"><u>Ariel's 1st Assignment</u></a>
        </div>
    </div>    
</template>

<script>
export default {
    
}
</script>

<style>

.main_about_container{
     backdrop-filter: blur(5px);
     height: 100%;
     width: 100%;
     overflow: scroll;
}

.developers{
    display: flex;
    width: max-content;
    margin-inline: auto;
}

.developer{
    /* border: solid 2px blue; */
    width: max-content;
    border-radius: 50%;
    margin-inline: 50px;
}

.developer img{
    width: 150px;
    height: auto;
    border-radius: 50%;
    border: 10px groove rgb(255, 255, 255);
    margin: 10px;
    transition: all .3s ease-in-out;
}

.developer img:hover{
    transform: scale(1.1);
    
}

.developer h3, .developer a{
    text-align: center;
    color: #2c3e50;
}

.frosted_glass_about *{
  margin-inline: auto;
  margin-block: 15px;
  text-align: center;
}

.frosted_glass_about {
    width:40rem;
    height: 8rem;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2); 
    border-radius: 5px;
    position: relative;
    z-index: 1;
    background: inherit;
    overflow: hidden;
    padding-bottom: 5px;
    margin-block: 10px;
    margin-inline: auto;
}

.frosted_glass_about:before {
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
}

.links{
    display: flex;
    width: max-content;
    margin-inline: auto;
    margin-bottom: 100px;
}

.links a{
    margin-inline: 15px;
    color:#2c3e50;
    font-size: 20px;   
}

</style>