<template>
  <div class="home d-flex align-items-center justify-content-center">
    <div class="mx-5" style="z-index:3">
      <div class="mb-5 my-3 my-md-5 position-relative">
      <h1>A quel mot pense Monsieur Banane ?</h1>
        <a class="text-muted text-decoration-none d-flex align-items-center return-home" href="/"><span class="material-symbols-rounded">
        chevron_left
        </span> Accueil</a>
      </div>
      <Indications />
      <ArrayGame v-if="this.wordInfos" daily=true :wordinfos="this.wordInfos" />
      <div v-if="loading" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <img src="../assets/mister-nanaba/faq.webp" class="nana-faq d-none d-xl-block" alt="Monsieur Banane Cherche">
  </div>
</template>

<script>
import ArrayGame from "@/components/ArrayGame.vue";
import Indications from "@/components/Indications.vue";
import removeAccents from 'remove-accents';

export default {
  components: {
    ArrayGame,
    Indications
  },
  name: "RandomWord",
  data() {
    return {
      loading:true,
      word: "",
      wordInfos: "",
    };
  },
  async mounted() {
    const response = await fetch("https://trouve-mot.fr/api/daily");
      const data = await response.json();
      
      this.loading = false;
      this.word = removeAccents(data.name);

    if(document.querySelector('.modal-backdrop')) {
      document.querySelector('.modal-backdrop').remove();
    }

    let word = this.word.toUpperCase();
    let arrayWord = Array.from(word);
    let firstLetter = arrayWord[0];
    let wordSize = arrayWord.length;
    let wordTheme = data.categorie;

    this.wordInfos = {
      word: word,
      arrayWord: arrayWord,
      firstLetter: firstLetter,
      size: wordSize,
      theme: wordTheme
    };
  },
};
</script>

<style scoped>
.return-home {
  position: absolute;
  left:-6%;
}


.nana-faq {
  position: absolute;
  left: 40px;
  bottom: 0;
  max-width: 310px;
}

.home { 
  background-image:url("../assets/bg/bg_game.svg");
}
</style>
