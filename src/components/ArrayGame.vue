<template>
  <table class="m-auto">
    <tr v-for="i in this.maxtry" :key="i" :data-line="i">
      <td v-for="j in wordinfos.size" :key="j">
        <!-- Write first letter of the word at the top left of the table ff-->
        {{ i == nboftry && j == 1 ? wordinfos.firstLetter : "." }}
      </td>
    </tr>
  </table>

  <KeyBoard @sendletter="editWordArray" />
</template>

<script>
// Sounds
import normalLetterSound from "@/assets/sounds/letter.wav";
import fullLetterSound from "@/assets/sounds/full.wav";

// Libraries
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true
})


// Components
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
      maxtry: 6,
    };
    
  },
  methods: {
    editWordArray(letter) {
      let index = this.currentword.indexOf(".");
      switch (letter) {
        case "BACKSPACE":
          // if not first or  "." not find
          if (index > 1 || index == -1) {
            this.removeLetterFromArray();
          }
          break;
        case "DONE":
          if (index !== -1) {
           Toast.fire({
            icon: 'error',
            title: 'Le mot est incomplet !'
          })
          this.playSound(fullLetterSound);
          } else {
            this.tryGuessing();
          }
          break;
        default:
          this.addLetterToArray(letter);
      }
    },
    playSound(sound) {
      const audio = new Audio(sound);
      audio.volume = 0.4;
      audio.play();
    },

    addLetterToArray(letter) {
      // Find first "." on the current word array
      let index = this.currentword.indexOf(".");
      if (index !== -1) {
        //  and replace by the pressed letter
        this.playSound(normalLetterSound);
        this.currentword[index] = letter;
        this.editVisuallyTable();
      } else {
        this.playSound(fullLetterSound);
      }

    },

    removeLetterFromArray() {
      // Find first "." on the current word array and replace by the pressed letter
      let index = this.currentword.indexOf(".");
      if (index !== -1) {
        // Find the position of occurence and replace
        this.currentword[index - 1] = ".";

      } else {
        this.currentword.pop();
        this.currentword.push(".");
      }
      this.editVisuallyTable();
    },

    tryGuessing() {
      // check si partie gagnée
      if (this.currentword.join("") == this.wordinfos.word) {
        this.addHints();
         Swal.fire({
            icon: 'success',
            title: 'Bravo !!!',
            html: 'Tu as trouvé le mot du jour qui était : <strong>CANADA</strong>',
             confirmButtonText: 'Revenir à l\'accueil',
            footer: 'Partage ton score à tes amis : '
          })
      } else {
        // Check si partie finie
        if (this.nboftry < this.maxtry) {
          this.addHints();
          this.nboftry++;
        } else {
           Swal.fire({
            icon: 'error',
            title: 'Aïe..',
            html: 'Aïe, tu n\'as pas réussi pour aujourd\'hui, mais retente ta chance demain !',
             confirmButtonText: 'Revenir à l\'accueil'
          })
        }
      }
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
      // console.log(this.currentword);
    },
    addHints() {
      let rowtochange = document.querySelector(
        '[data-line="' + this.nboftry + '"]'
      );
      let allLettersTd = rowtochange.querySelectorAll("td");
      // allLettersTd[0].classList.add("bg-warning")

      // Parcours le mot proposé
      this.currentword.forEach((el, i) => {
        let index = this.wordinfos.arrayWord.indexOf(el);
        if (index !== -1) {
          allLettersTd[i].classList.add("bg-warning");
          if (index == i) {
            allLettersTd[i].classList.add("bg-danger");
          }
        }
      });
    },
  },
  beforeUpdate() {
    // Generate an array thats equal the size of the word to guess
    this.currentword = Array(this.wordinfos.size).fill(".");
    //  and put first letter
    this.currentword[0] = this.wordinfos.firstLetter;

    // console.log(this.currentword)
    // console.log(this.wordinfos.arrayWord)
  },
};
</script>
<style>
td {
  border: solid 3px white;
  color: white;
  font-weight: bold;
  font-size: 2.5rem;
  width: 3rem;
  height: 4rem;
}

@media screen and (min-width: 640px) {
  td {
    width: 5rem;
    height: 5rem;
  }
}

/* Swal2 */
.swal2-container.swal2-top>.swal2-popup{
  width: 82%!important;
}
</style>