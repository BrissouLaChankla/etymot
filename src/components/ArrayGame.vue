<template>

  <table class="m-auto">
    <tr v-for="currentTry in this.maxtry" :key="currentTry" :data-line="currentTry">
      <td v-for="letterIndex in wordinfos.size" :key="letterIndex">
        <!-- Write first letter of the word at the top left of the table -->
        {{ currentTry <= nboftry ? currentword[currentTry][letterIndex-1] : "" }}
      </td>
    </tr>
    <div id="my-canvas"></div>
  </table>
  <Hint :nboftry="this.nboftry" :wordtheme="wordinfos.theme" />

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


import confetti from "canvas-confetti";

// Components
import KeyBoard from "@/components/Keyboard.vue";
import Hint from "@/components/Hint.vue";

export default {
  components: {
    KeyBoard,
    Hint
  },
  props: ["wordinfos", "daily"],
  data() {
    return {
      currentword: {
        1:[],
        2:[],
        3:[],
        4:[],
        5:[],
        6:[]
      },
      currentWordWithHints: [],
      letteroccurence:[],
      letteroccurencereset:[],
      nboftry: 1,
      maxtry: 6,
    };
  },
  methods: {
    editWordArray(letter) {
      let index = this.currentword[this.nboftry].indexOf(".");
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
      let index = this.currentword[this.nboftry].indexOf(".");
      if (index !== -1) {
        //  and replace by the pressed letter
        this.playSound(normalLetterSound);
        this.currentword[this.nboftry][index] = letter;
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
        this.currentword[this.nboftry][indexOfLastLetterAdded] = "."
        this.editVisuallyTable(indexOfLastLetterAdded);
      }       

    },

    tryGuessing() {

      // check si partie gagnée
        this.addHints();
      if (this.currentword[this.nboftry].join("") == this.wordinfos.word) {
         let videoPath = require("@/assets/mister-nanaba/win.webm");
        Swal.fire({

          // icon: "success",
          title: "Eh bravo toi !",
          width: 600,
          allowOutsideClick: false,
          // color: '#ffffff',
          color: '#000',
          html: `
          <div class="text-center" style="margin-top:-20px">
            <video autoplay loop muted width="350">
                <source src="${videoPath}"
                        type="video/webm">

                Tu as gagné!
            </video>
          </div>
          Tu as trouvé le mot qui était : <span class="fredoka">${this.wordinfos.word}</span> !
            <div class="d-flex py-3 mt-4 align-items-center justify-content-center">
                <a href="/"
                  class="btn btn-primary mx-2"
                > Retour à l'accueil </a>
                <a href="javascript:window.location.href=window.location.href"
                  class="btn btn-primary mx-2"
                > Rejouer </a>
            </div>
            
          `,

          // footer: `Partage ton score à tes amis : 
          //  <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button"> Tweet</a>`,
          background:'#fff',
          showConfirmButton: false,
          backdrop: `
            rgba(0, 0, 0, 0.75)
            top
            no-repeat
          `
        });


          
          var count = 200;
          var defaults = {
            origin: { y: 0.7 }
          };

          function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
              particleCount: Math.floor(count * particleRatio)
            }));
          }

          fire(0.25, {
            spread: 150,
            startVelocity: 55,
          });
          fire(0.2, {
            spread: 60,
          });
          fire(0.35, {
            spread: 150,
            decay: 0.91,
            scalar: 0.8
          });
          fire(0.1, {
            spread: 150,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
          });
          fire(0.1, {
            spread: 150,
            startVelocity: 45,
          });


      } else {
        // Check si partie finie
        if (this.nboftry < this.maxtry) {
          this.nboftry++;
        } else {
          let imagePath = require("@/assets/mister-nanaba/sad.svg");
          Swal.fire({
            // icon: "error",
            title: "Dommage...",
             width: 600,
            allowOutsideClick: false,
            html: `
              <div class="text-center mb-4">
                <img style="width:350px" src="${imagePath}" />
              </div>

                Tu n'as pas réussi à trouver le mot auquel pensait Mister Nanaba... <br>
               ${ (this.daily) ? '' : 'Mais ça lui est revenu, c\'était : <span class="fredoka">"'+this.wordinfos.word+'"</span>'}
                
                <div class="d-flex py-3 mt-4 align-items-center justify-content-center">
                    <a href="/"
                      class="btn btn-primary mx-2"
                    > Retour à l'accueil </a>
                    <a href="javascript:window.location.href=window.location.href"
                      class="btn btn-primary mx-2"
                    > Rejouer </a>
                </div>
              `,
            showConfirmButton: false,
             backdrop: `
            rgba(0, 0, 0, 0.75)
            top
            no-repeat
          `
          
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
      boxToChange.innerHTML = this.currentword[this.nboftry][indexOfLetter];
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
      this.currentword[this.nboftry].forEach((el, i) => {
        let index = this.wordinfos.arrayWord.indexOf(el);
        // Index de la lettre dans letteroccurence
        let objIndex = this.letteroccurence.findIndex((obj => obj.letter == el));
        // if red or orange, désincrémente
       if(this.currentword[this.nboftry][i] == this.wordinfos.arrayWord[i] || index !== -1) {
        
        // Si la lettre est au bon emplacement
        // console.log("mot proposé : "+this.currentword[this.nboftry]);
        // console.table(this.wordinfos);
          if (this.currentword[this.nboftry][i] == this.wordinfos.arrayWord[i]) {
            allLettersTd[i].classList.add("bg-danger");
            this.currentwordWithHints[i] = allLettersTd[i].textContent;
          } else {
            this.currentwordWithHints[i] = ".";
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
      this.currentword[this.nboftry+1] = structuredClone(this.currentwordWithHints);
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
      
      for(let i in this.currentword) {
        // Generate an array thats equal the size of the word to guess
      this.currentword[i] = Array(this.wordinfos.size).fill(".");
      //  and put first letter
      this.currentword[i][0] = this.wordinfos.firstLetter;
      }
    }
  },
  mounted() {
  
    this.resetCurrentWord();
    this.setOccurence();

    this.letteroccurencereset = structuredClone(this.letteroccurence);
    this.currentwordWithHints= structuredClone(this.currentword[this.nboftry]);

    // console.table(this.letteroccurence);
  

  },
  beforeUpdate() {
    console.log(this.currentword);
  },


};


</script>
<style scoped>


table {
  width:100%;
}

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
  table {
    width: auto;
  }
}

.bg-primary {
 background-color: var(--purple)!important;
  color:white!important;
}

.bg-warning {
  background-color: var(--main-color)!important;
  color:white!important
}

.bg-danger {
  background-color: var(--secondary)!important;
  color:white!important;
}


/* Swal2 */
.swal2-container.swal2-top > .swal2-popup {
  width: 82% !important;
}




</style>