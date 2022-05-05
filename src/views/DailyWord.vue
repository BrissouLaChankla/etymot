<template>
  <div class="home d-flex align-items-center justify-content-center">
      <div>
            <h1 class="text-white">Partie letsgoo</h1>
            <h2 class="text-white">{{ word }}</h2>
            <ArrayGame :wordinfos="this.wordInfos" />
            
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ArrayGame from '@/components/ArrayGame.vue';

export default {
    components: {
        ArrayGame
    },
    name: "DailyWord",
    data() {
        return {
            word: "Remisterio",
            wordInfos:{}
        }
    },
    mounted() {
        let word = this.word.toUpperCase();
        let arrayWord = Array.from(word);
        let firstLetter = arrayWord[0];
        let wordSize = arrayWord.length;

        this.wordInfos = {
            word:word,
            arrayWord:arrayWord,
            firstLetter:firstLetter,
            size:wordSize
        }
    }
};
</script>

<style>

</style>
