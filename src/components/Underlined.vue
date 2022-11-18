<template>
  <span class="position-relative">{{this.word}} <img src="../assets/decorations/yellow-underline.webp" class="yellow-underline" alt="Soulignage Jaune"></span>
</template>

<script>
export default {
  props: ["word"],
}
</script>

<style scoped>
  .yellow-underline {
      position: absolute;
      left: 0;
      bottom: -6px;
      z-index: -1;
      width: 100%;
      z-index: 1;
  }
</style>