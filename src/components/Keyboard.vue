<template>
  <div id="keyboard" class="mt-3 mt-md-5">
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
          line3:['<span class="material-symbols-rounded">backspace</span>','W','X','C','V','B','N','<span class="material-symbols-rounded">done</span>'],
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

    height: 30px;
    width:24px;

    margin:8px 4px;
    font-weight: bold;
    border:2px solid var(--soft-orange);
    border-radius:5px;
    cursor: pointer;
    transition: all .3s ease;
    
}

#line3 span:last-child, #line3 span:first-child {
  width: 56px;
}

@media screen and (min-width: 640px) {
  [id^="line"] > span {
    height: 45px;
    width: 40px;
  }
  #line3 span:last-child, #line3 span:first-child {
    width: 90px;
  }
}

#keyboard [id^="line"] > span:hover { 
    background-color:blueviolet;
}

#line1, #line2, #line3 {
    display: flex;
    justify-content: center;
}


</style>