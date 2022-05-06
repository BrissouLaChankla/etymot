<template>
  <table>
    <tr v-for="i in 6" :key="i" :data-line="i">
      <td v-for="j in wordinfos.size" :key="j">
        <!-- Write first letter of the word at the top left of the table ff-->
        {{ i == nboftry && j == 1 ? wordinfos.firstLetter : "." }}
      </td>
    </tr>
  </table>

  <KeyBoard @sendletter="editWordArray" />
</template>

<script>
import KeyBoard from "@/components/Keyboard.vue";

export default {
  components: {
    KeyBoard,
  },
  props: ["wordinfos"],
  data() {
    return {
      currentword: [],
      wordWithHint: [],
      nboftry: 1,
    };
  },
  methods: {
    editWordArray(letter) {
      switch (letter) {
        case "BACKSPACE":
          this.removeLetterFromArray();
          break;
        case "DONE":
            let index = this.currentword.indexOf(".");
            if (index !== -1) {
              alert("mot incomplet")
            } else {
              this.tryGuessing();
            }
          break;
        default:
          this.addLetterToArray(letter);
      }
    },

    addLetterToArray(letter) {
      // Find first "." on the current word array
      let index = this.currentword.indexOf(".");
      if (index !== -1) {
        //  and replace by the pressed letter
        this.currentword[index] = letter;
      }

      this.editVisuallyTable();
      console.log(this.currentword.length);
    },

    removeLetterFromArray() {
      // Find first "." on the current word array and replace by the pressed letter
      let index = this.currentword.indexOf(".");
      if (index !== -1) {
        // Find the positizon of occurence and replace
        this.currentword[index - 1] = ".";
      } else {
        this.currentword.pop();
        this.currentword.push(".");
      }
      this.editVisuallyTable();
    },

    tryGuessing() {
      this.nboftry++;
      this.currentword;
    },
    // Make visual change to the table
    editVisuallyTable() {
      let rowtochange = document.querySelector(
        '[data-line="' + this.nboftry + '"]'
      );
      rowtochange.innerHTML = "";
      this.currentword.forEach((letterofcurrentword) => {
        rowtochange.insertAdjacentHTML(
          "beforeend",
          `
                 <td>${letterofcurrentword}</td>
          `
        );
      });
      console.log(this.currentword);
    },
  },
  beforeUpdate() {
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