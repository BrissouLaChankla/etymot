<template>
  <table class="m-auto">
    <tr v-for="i in this.maxtry" :key="i" :data-line="i">

      <td v-for="j in wordinfos.size" :key="j">
        <!-- Write first letter of the word at the top left of the table -->
        {{ i <= nboftry ? this.currentword[j-1] : "" }}
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
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

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
      currentWordWithHints: [],
      letteroccurence:[],
      letteroccurencereset:[],
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
              icon: "error",
              title: "Le mot est incomplet !",
            });
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
        this.editVisuallyTable(index, true);
      } else {
        this.playSound(fullLetterSound);
      }
    },

    removeLetterFromArray() {
       let rowtochange = document.querySelector(
            '[data-line="' + this.nboftry + '"]'
        );
      let allLettersTd = rowtochange.querySelectorAll("td");
      let indexOfLastLetterAdded = 0; 
      
      allLettersTd.forEach(function(element, i) {
        if(element.classList.contains("bg-primary")) {
            indexOfLastLetterAdded = i;
          }
      });

      if (indexOfLastLetterAdded !== 0) {
        this.currentword[indexOfLastLetterAdded] = "."
        this.editVisuallyTable(indexOfLastLetterAdded);
      }       

    },

    tryGuessing() {
      // check si partie gagnée
        this.addHints();
      if (this.currentword.join("") == this.wordinfos.word) {
        Swal.fire({
          icon: "success",
          title: "Bravo !!!",
          html: "Tu as trouvé le mot du jour qui était : <strong>"+this.wordinfos.word+"</strong>",
          confirmButtonText: "Revenir à l'accueil",
          footer: "Partage ton score à tes amis : ",
        });
      } else {
        // Check si partie finie
        if (this.nboftry < this.maxtry) {
          this.nboftry++;
        } else {
          Swal.fire({
            icon: "error",
            title: "Aïe..",
            html: "Aïe, tu n'as pas réussi pour aujourd'hui, mais retente ta chance demain !",
            confirmButtonText: "Revenir à l'accueil",
          });
        }
      }
    },
    // Make visual change to the table
    editVisuallyTable(indexOfLetter, adding=false) {
      let rowtochange = document.querySelector(
        '[data-line="' + this.nboftry + '"]'
      );

      let boxToChange = rowtochange.children[indexOfLetter];
      boxToChange.innerHTML = this.currentword[indexOfLetter];
      // console.log(boxToChange);
      if(adding) {
        boxToChange.classList.add("animate__animated");
        boxToChange.classList.add("animate__flip");
        boxToChange.classList.add("bg-primary");
        boxToChange.classList.add("text-white");
      } else {
         boxToChange.classList.remove("animate__animated");
          boxToChange.classList.remove("animate__flip");
          boxToChange.classList.remove("bg-primary");
          boxToChange.classList.remove("text-white");
      }

    },
    addHints() {
      let rowtochange = document.querySelector(
        '[data-line="' + this.nboftry + '"]'
      );
      let allLettersTd = rowtochange.querySelectorAll("td");

      // Parcours le mot proposé letter par lettre
      this.currentword.forEach((el, i) => {
        let index = this.wordinfos.arrayWord.indexOf(el);
        // Index de la lettre dans letteroccurence
        let objIndex = this.letteroccurence.findIndex((obj => obj.letter == el));
        // if red or orange, désincrémente
       if(this.currentword[i] === this.wordinfos.arrayWord[i] || index !== -1) {
        
        // Si la lettre est au bon emplacement
          if (this.currentword[i] == this.wordinfos.arrayWord[i]) {
            allLettersTd[i].classList.add("bg-danger");
            allLettersTd[i].classList.add("text-white");
            this.currentWordWithHints[i] = allLettersTd[i].textContent;
          } else {
            this.currentWordWithHints[i] = ".";
          }
        // occurencence can't go under 0 
        if(this.letteroccurence[objIndex].occurence > 0) {
          // Find letter at good emplacement

            // Si elle apparait mais pas au bon index et qu'elle a encore des occurences
            if (index !== -1 &&  this.letteroccurencereset[objIndex].occurence > 0) {
              allLettersTd[i].classList.add("bg-warning");
            }
          
          this.letteroccurence[objIndex].occurence--;
          }
        
       }
      });
      this.letteroccurence = structuredClone(this.letteroccurencereset);
      this.currentword = structuredClone(this.currentWordWithHints);
    },
    setOccurence() {
      // Count occurence letter in word to guess
        this.wordinfos.arrayWord.forEach(element => {
          let index = this.letteroccurence.map(function(e) { return e.letter; }).indexOf(element);

              if (index == -1) {
                this.letteroccurence.push(
                  {
                    letter: element,
                    occurence: 1
                    })
            } else {
              // Trouve la lettre déjà présente et occurence++
              let objIndex = this.letteroccurence.findIndex((obj => obj.letter == element));
              this.letteroccurence[objIndex].occurence++;
            }
        });

    },
    resetCurrentWord() {
        // Generate an array thats equal the size of the word to guess
      this.currentword = Array(this.wordinfos.size).fill(".");
      //  and put first letter
      this.currentword[0] = this.wordinfos.firstLetter;
    }
  },
  mounted() {
  
    this.resetCurrentWord();
    this.setOccurence();

    this.letteroccurencereset = structuredClone(this.letteroccurence);
    this.currentWordWithHints= structuredClone(this.currentword);

    console.table(this.letteroccurence);

  },
  beforeUpdate() {
    console.table(this.letteroccurence);
  }
};
</script>
<style>
td {
  border: solid 3px var(--soft-orange);
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
.swal2-container.swal2-top > .swal2-popup {
  width: 82% !important;
}
</style>