<template>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&family=Poppins:wght@500&display=swap");

.text-muted {
  color: #7a7a7a;
}
:root {
  --main-color-dark: #b15301;
  --main-color: #fd7f12;
  --main-color-light: #fd9a44;
  --main-color-lighter: #fff7f0;
  --secondary: #ffd800;
  --purple: #c90a4c;
  --red: red;
  --green: green;
  --soft-orange: #fec08b;
  --gray-light: #fafafa;
  --table-bg: #fefaf3;
}

#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1,
h2,
h3,
h4,
h5,
h6,
table,
.fredoka {
  font-family: "Fredoka One", cursive;
  font-weight: normal !important;
}

table {
  background-color: var(--table-bg);
  z-index: 2;
}

/* Section bouton */
.btn {
  padding: 0.75rem 2.25rem;
  border-radius: 12px;
  border: 0;
  font-weight: bold;
  letter-spacing: 0.8px;
  box-shadow: 0px 5px 0px var(--main-color-dark);
  transition: all 0s !important;
}

.btn-primary {
  background-color: var(--main-color) !important;
  color: white !important;
}

.btn:focus {
  outline: none;
  box-shadow: 0px 5px 0px var(--main-color-dark);
}

.btn-primary:active:focus {
  box-shadow: 0px 5px 0px var(--main-color-dark);
}

.btn-primary:hover {
  background-color: var(--main-color-light);
  border-color: var(--main-color-dark);
}

.btn:active {
  box-shadow: none !important;
  transform: translateY(5px);
}

.btn-white {
  background-color: white;
  color: var(--main-color) !important;
}

.btn-white:hover {
  color: var(--main-color-light);
}

.swal2-styled.swal2-confirm:focus,
.swal2-styled.swal2-default-outline:focus {
  box-shadow: none !important;
  /* box-shadow: none!important; */
}
.swal2-styled.swal2-confirm:active,
.swal2-styled.swal2-default-outline:active {
  transform: translateY(0px);
}

/* Colors */

.btn-primary:focus {
  border: 0 !important;
}

.bg-correct {
  background-color: var(--secondary) !important;
  color: white !important;
}

.bg-almost {
  background-color: var(--main-color) !important;
  color: white !important;
}

.bg-wrong {
  background-color: var(--purple) !important;
  color: white !important;
}
</style>
