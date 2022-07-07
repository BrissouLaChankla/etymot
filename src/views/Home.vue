<template>
  <div class="home overflow-hidden p-3">
    <a class="logo-home" href="#">
      <img alt="logo" class="img-fluid text-start" src="../assets/logo.webp" />
    </a>

    <div class="d-flex h-100 align-items-center justify-content-center">
      <div class="home-content">
       
       <span class="position-relative">
          <h1 class="fw-bold " style="font-size: 3.5rem">
            <Underlined word="ÉtyMot" />
          </h1>
          <img src="../assets/decorations/right-corner-pop.webp" class="top-left-pop" alt="decoration">
       </span>
          <p class="text-muted my-5" style="font-size: 1.25rem">
            Mister Nanaba pense à un mot... Mais il a oublié lequel ! <br />
            Tu pourrais l'aider ?
          </p>
          <h5 class="text-muted mb-4" style="font-size: 1.5rem">
            Choisis ton mode de jeu !
          </h5>
          <div class="gamemodes">
            <router-link
              :to="{ name: 'DailyWord' }"
              class="text-decoration-none btn-primary btn mx-3 px-5"
            >
              Mot du jour
            </router-link>

            <button
              type="button"
              class="rand-but btn btn-white mx-3 px-5"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Mot aléatoire
            </button>
            <BSModal />
          </div>
        </div>
      </div>
      <img
        src="../assets/mister-nanaba/longue-vue.webp"
        class="nana-longue-vue w-100 img-fluid"
        alt="Mister Nanaba avec une longue vue"
      />
   
  </div>
</template>

<script>
// @ is an alias to /src
import Underlined from "@/components/Underlined.vue";
import BSModal from "../components/BSModal.vue";

export default {
  data() {
    return {};
  },
  name: "Home",
  components: {
    Underlined,
    BSModal,
  },
  methods: {},
  mounted() {},
};
</script>

<style>
body {
  max-height: 100%;
}

.top-left-pop {
    position: absolute;
    left: -135px;
    top: -40px;
    transform: rotate(-70deg);
    width: 50px;
}


.logo-home {
  max-width: 234px;
  position: fixed;
  transform: translateX(-50%);
  left: 50%;
  top: 30px;
}

.home {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background-image: url("../assets/bg/bg_home.svg");
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

.nana-longue-vue {
  position: absolute;
  left: 50%;
  bottom: -130px;

  transform: translateX(-50%);
  max-width: 200px;
}

.rand-but {
  margin-top:15px;
  margin-bottom:50px;
}

@media screen and (min-width: 640px) {
  .nana-longue-vue {
    max-width: 356px;
    bottom: -180px;
    left: 30px;
    transform: translateX(0);

  }



  .logo-home {
    left: 56px;
    transform: translateX(0);
  }
}

@media screen and (min-width: 505px) {

  .rand-but {
    margin-bottom:0px;
    margin-top:0px;
  }
}
</style>
