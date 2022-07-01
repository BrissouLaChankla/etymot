<template>
  <div class="home d-flex align-items-center justify-content-center">
    <div>
      <h1 class="my-3 my-md-5">A quel mot pense Mister Nanaba ?</h1>
      <Indications />
      <ArrayGame v-if="this.wordInfos" :wordinfos="this.wordInfos" />
    </div>
    <img src="../assets/mister-nanaba/faq.webp" class="nana-faq d-none d-xl-block" alt="Mister Nanaba Cherche">
  </div>
</template>

<script>
import ArrayGame from "@/components/ArrayGame.vue";
import Indications from "@/components/Indications.vue";

export default {
  components: {
    ArrayGame,
    Indications
  },
  name: "DailyWord",
  data() {
    return {
      word: "",
      wordInfos: "",
    };
  },
  async mounted() {
    const response = await fetch("https://dev.nanagames.io/api/get/randomword");
      const data = await response.json();
      this.word = data;

    let word = this.word.toUpperCase();
    let arrayWord = Array.from(word);
    let firstLetter = arrayWord[0];
    let wordSize = arrayWord.length;

    this.wordInfos = {
      word: word,
      arrayWord: arrayWord,
      firstLetter: firstLetter,
      size: wordSize,
    };
  },
};
</script>

<style scoped>

.nana-faq {
  position: absolute;
  left: 40px;
  bottom: 0;
  max-width: 310px;
}

.home { 
  background-image:url("../assets/bg/bg_game.webp");
}
</style>
