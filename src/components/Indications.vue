<template>
  <div
    id="indications"
    class="
      rounded
      bg-white
      p-4
      shadow
      d-flex
      flex-column
      justify-content-around
    "
    v-bind:class="{ reduced: isReduced }"
  >
    <span
      class="material-symbols-rounded text-muted close"
      @click="closeIndications"
    >
      {{ this.icon }}
    </span>
    <div class="d-flex align-items-center">
      <span class="bg-correct correct"></span>
      <small class="text-muted ms-2">Lettre au bon endroit</small>
    </div>


    <div class="d-flex align-items-center">
      <span class="bg-almost almost"></span>
      <small class="text-muted ms-2">Lettre dans le mot</small>
    </div>
    
    <div class="d-flex align-items-center">
      <span class="bg-wrong wrong"></span>
      <small class="text-muted ms-2">Mauvaise lettre</small>
    </div>

    <span class="vertical" v-bind:class="{ 'd-none': !isReduced }"
      >Indications</span
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      isReduced: false,
      icon: "close",
    };
  },

  methods: {
    closeIndications() {
      this.isReduced = !this.isReduced;
      this.isReduced ? (this.icon = "chevron_right") : (this.icon = "close");
    },
    indicationsMobile() {
        if (window.innerWidth < 1460 ) {
            this.isReduced = true
        } else {
            this.isReduced = false
        }
    },
  },

  created() {
    this.indicationsMobile();
    window.addEventListener("resize", this.indicationsMobile);
  },
  destroyed() {
    window.removeEventListener("resize", this.indicationsMobile);
  }
};
</script>

<style scoped>
#indications {
  position: absolute;
  left: 89px;
  height: 184px;
  width: 268px;
  transition: all 0.5s ease;
  z-index: 3;
}

.vertical {
  letter-spacing: 2px;
  text-transform: uppercase;
  position: absolute;
  right: -40px;
  top: 95px;
  transform: rotate(90deg);
  font-weight: bold;
}

.reduced {
  left: -230px !important;
}

.close {
  cursor: pointer;
  position: absolute;
  right: 8px;
  top: 8px;
}

small {
  letter-spacing: 0.56px;
}

.correct,
.almost,
.wrong {
  width: 20px;
  height: 20px;
  display: inline-block;
}


</style>