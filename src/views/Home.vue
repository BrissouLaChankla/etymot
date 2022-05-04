<template>
  <div class="home d-flex align-items-center justify-content-center">
    <div class="home-content">
      <div>
        <img alt="logo" class="logo-home img-fluid" src="../assets/logo.png" />
        <p class="text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quo
          perferendis deserunt eos. Cupiditate numquam ex, tempore.
        </p>
        <div class="gamemodes">
          <router-link
            :to="{ name: 'DailyWord' }"
            class="text-decoration-none text-primary"
          >
            <h2>Mot du jour</h2>
          </router-link>
          <router-link
            :to="{ name: 'RandomWord' }"
            class="text-decoration-none text-primary"
          >
            <h2>Mot aléatoire</h2>
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
};
</script>

<style>
.home {
  height: 100vh;
  background-image: linear-gradient(
    to bottom,
    #0a4160,
    #0a4464,
    #0b4668,
    #0b496c,
    #0c4c70,
    #0c4c70,
    #0d4c70,
    #0d4c70,
    #0d496b,
    #0d4567,
    #0c4262,
    #0c3f5e
  );
}

.home-content {
  max-width: 400px;
}

.gamemodes h2 {
  background: white;
  text-transform: uppercase;
  padding: 20px;
  border-radius: 15px;
}
</style>
