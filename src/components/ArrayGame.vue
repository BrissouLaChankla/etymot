<template>
  <table>
    <tr v-for="i in 6" :key="i" :data-line="i">
      <td v-for="j in wordinfos.size" :key="j">
        <!-- Write first letter of the word at the top left of the table ff-->
        {{ nboftry == 1 && j == 1 ? wordinfos.firstLetter : "." }}
      </td>
    </tr>
  </table>

  <KeyBoard @addletter="addLetterToArray" />
</template>

<script>
import KeyBoard from "@/components/Keyboard.vue";

export default {
  components: {
    KeyBoard
  },
  props: ["wordinfos"],
  data() {
    return {
      currentword:[],
      
      nboftry:1,
    };
  },
  methods: {
    
    addLetterToArray(letter) {
      // Find first "." on the current word array and replace by the pressed letter 
        var index = this.currentword.indexOf(".");
        if (index !== -1) {
            this.currentword[index] = letter;
        }
      
      let rowtochange = document.querySelector('[data-line="'+this.nboftry+'"]');
      rowtochange.innerHTML="";
      this.currentword.forEach(letterofcurrentword => {
           rowtochange.insertAdjacentHTML('beforeend', `
                 <td>${letterofcurrentword}</td>
          `);
      });
    }

    // removeLetterFromArray() {

    // }
  },
  updated() {

    // Generate an array thats equal the size of the word to guess
    this.currentword = Array(this.wordinfos.size).fill(".");
    //  and put first letter 
    this.currentword[0] = this.wordinfos.firstLetter;
  },
};
</script>
<style>
td {
  border: solid 3px white;
  color: white;
  font-weight: bold;
  font-size: 2.5rem;
  width: 5rem;
  height: 5rem;
}
</style>