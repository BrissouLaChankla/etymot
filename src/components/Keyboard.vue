<template>
  <div id="keyboard" class="text-white mt-5">
    <div v-for="(line, index) in letters" :key="line.id" :id="index">
      <span v-html="letter" v-for="letter in line" :key="letter.index" @click="sendLetter">

      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      letters: {
        line1:['A','Z','E','R','T','Y','U','I','O','P'],
        line2:['Q','S','D','F','G','H','J','K','L','M'],
        line3:['<span class="material-symbols-outlined">backspace</span>','W','X','C','V','B','N','<span class="material-symbols-outlined">done</span>'],
      }
      }
  },
  methods: {
    sendLetter(e) {
      let letter = e.target.innerText.toUpperCase();
      this.$emit("sendletter", letter);
    },
    catchKeyPress() {
      // Add event listener on keyup
      document.addEventListener('keyup', (event) => {
        // Detect alpha + backspace + enter
        if(event.which <= 90 && event.which >= 65 || event.which == 8 || event.which == 13) {
          let key = event.key;
          if(event.which == 13 ) {
            key = "done";
          }
          this.$emit("sendletter", key.toUpperCase());
        }
      }, false);
    }
  },
  mounted() {
    this.catchKeyPress();
  }
}
</script>

<style>
[id^="line"] > span {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    height: 45px;
    width:40px;

    margin:8px 4px;
    font-weight: bold;
    border:1px solid white;
    border-radius:5px;
    cursor: pointer;
    transition: all .3s ease;
}

#keyboard span:hover { 
    background-color:blueviolet;
}

#line1, #line2, #line3 {
    display: flex;
    justify-content: center;
}
</style>