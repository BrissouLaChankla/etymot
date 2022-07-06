<template>
  <div class="home d-flex align-items-center justify-content-center">
    <a href="">
      <img alt="logo" class="logo-home img-fluid" src="../assets/logo.png" />
    </a>
    <div class="home-content">
      <div>
        <h1>
          
          Devine
          <Underlined word="mot" />
        </h1>
        <p class="text-muted my-4">
          Mister Nanaba pense à un mot... Mais il a oublié lequel ! <br>
          Tu pourrais l'aider ? 
        </p>
        <h5 class="text-muted mb-4">Choisis ton mode de jeu !</h5>
        <div class="gamemodes d-flex justify-content-around">
          <router-link
            :to="{ name: 'DailyWord' }"
            class="text-decoration-none btn-primary btn "
          >
           Mot du jour
          </router-link>

          
          <button type="button" class="btn btn-white" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Mot aléatoire
          </button>
          <BSModal />

        </div>
      </div>
    </div>
    <img src="../assets/mister-nanaba/longue-vue.webp" class="nana-longue-vue" alt="Mister Nanaba avec une longue vue">
  </div>
</template>

<script>
// @ is an alias to /src
import Underlined from '@/components/Underlined.vue'
import BSModal from '../components/BSModal.vue';


export default {
  data() {
    return {

    }
  },
  name: "Home",
  components: {
    Underlined,
    BSModal
  },
  methods: {
  
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
  background-position: bottom
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

.nana-longue-vue {
  position: absolute;
  bottom: -180px;
  left: -10px;
  max-width: 356px;
}



</style>
