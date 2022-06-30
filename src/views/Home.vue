<template>
  <div class="home d-flex align-items-center justify-content-center">
    <a href="">
      <img alt="logo" class="logo-home img-fluid" src="../assets/logo.png" />
    </a>
    <div class="home-content">
      <div>
        <h1>Tusmo</h1>
        <p class="text-muted">
          Mister Nanaba pense à un mot... Mais il a oublié lequel ! <br>
          Tu pourrais l'aider ? 
        </p>
        <h5 class="text-muted">Choisis ton mode de jeu</h5>
        <div class="gamemodes d-flex justify-content-around">
          <router-link
            :to="{ name: 'DailyWord' }"
            class="text-decoration-none btn-primary btn "
          >
           Mot du jour
          </router-link>
          <router-link
            :to="{ name: 'RandomWord' }"
            class="text-decoration-none btn btn-white"
          >
           Mot aléatoire
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    // HelloWorld
  },
  mounted() {
  
  }
};
</script>

<style>
.logo-home {
  max-width:234px;
  position: fixed;
  top: 0;
  left: 60px;
}

.home {
  min-height: 100vh;
  background-image:url("../assets/bg/bg_home.webp");
  background-size: cover;
  background-position: bottom;
}

.home-content {
  max-width: 600px;
}

.gamemodes h2 {
  background: white;
  text-transform: uppercase;
  padding: 20px;
  border-radius: 15px;
}


</style>
