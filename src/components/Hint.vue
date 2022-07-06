<template>
  <span class="material-symbols-rounded getHint" v-if="nboftry > 3" @click="showModalHint">
        info
    </span>
    <div class="hint d-none" >
        <div class="img-container">
            <img src="../assets/mister-nanaba/hint.webp"  class="img-fluid" alt="">
            <h2 v-if="getHint" class="hint-theme">{{wordtheme}}</h2>
        </div>
          <span class="material-symbols-rounded text-white closeHint" @click="closeModalHint">
                close
            </span>
    </div>
        <div class="hintBackdrop d-none" @click="closeModalHint"></div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  props: ["wordtheme", "nboftry"],
    data() {
        return {
            getHint: false,
        }
    },
    
    methods: {
        placeHint(hintIcon) {
            let topPosHint = document.querySelector("[data-line='3']").getBoundingClientRect().top+"px";
            let rightPostHint = document.querySelector("[data-line='3']").getBoundingClientRect().left-40+"px";
            let respTop = "2vh";

            hintIcon.style.setProperty("right", rightPostHint);
            hintIcon.style.setProperty("top", `calc(${respTop} + ${topPosHint})`);
        },

        showModalHint() {
           Swal.fire({
            title: 'Tu veux un indice ?',
            text: "Tu vas prendre -100 à ton score !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, envoie l\'indice!',
            cancelButtonText: 'Je vais réfléchir...'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.getHint = true;
                    document.querySelector(".hint.d-none").classList.remove("d-none");
                    document.querySelector(".hintBackdrop").classList.remove("d-none");
                    setTimeout(() => {  document.querySelector(".img-container").classList.add("slideIn"); }, 200);
                }
            })
        },
        closeModalHint() {
            document.querySelector(".img-container").classList.remove("slideIn");

            setTimeout(() => {  document.querySelector(".hint").classList.add("d-none"); }, 800);
            setTimeout(() => {  document.querySelector(".hintBackdrop").classList.add("d-none"); }, 800);
            

        }

     
    },
    destroyed() {
       window.removeEventListener('resize', () => {
            this.placeHint(hintIcon)
        });
    },
    updated() {
        if(this.nboftry > 3) {
                let hintIcon = document.querySelector(".getHint");
                this.placeHint(hintIcon)
                window.addEventListener('resize', () => {
                    this.placeHint(hintIcon)
                });
            }
    }
}
</script>

<style scoped>

.getHint {
    position: absolute;
    font-size:2.1rem;
    cursor: pointer;
}


.hintBackdrop {
    background-color:rgba(0, 0, 0, 0.75);
    height: 100vh;
    width:100vw;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: 9;
}

.hint {
    /* height: 100vh;
    width:100vw; */
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
}

.hint .img-container {
    width: 80%;
    max-width: 780px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);
    transition: all 1s ease;
}

.hint-theme {
    position: absolute;
    top: 16%;
    height: 15%;
    right: 30px;
    width: 40%;

    display: flex;
    align-items: center ;
    justify-content: center;
}

.hint .img-container.slideIn {
    transform: translate(-50%, 0%);
}

.closeHint {
    cursor: pointer;
    position: fixed;
    top: 10px;
    right:10px;
    font-size:4.5rem;
    font-weight: bold;
}


</style>