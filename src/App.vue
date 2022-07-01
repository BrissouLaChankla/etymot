<template>

  <router-view/>
</template>

<style>
.text-muted {
  color:#7a7a7a;
}
:root {
    --main-color-dark: #B15301;
    --main-color: #fd7f12;
    --main-color-light: #FD9A44;
    --main-color-lighter: #FFF7F0;
    --secondary: #ffd800;
    --purple:#c90a4c;
    --red:red;
    --green:green;
    --soft-orange:#fec08b;
    --gray-light:#fafafa;
}


#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1, h2, h3, h4, h5, h6, table {
  font-family: 'Fredoka One', cursive;
}



/* Section bouton */
.btn {
    padding: 0.75rem 2.25rem;
    border-radius: 12px;
    border: 0;
    font-weight: bold;
    letter-spacing: .8px;
    border-bottom: 5px solid var(--main-color-dark);
}

.btn:active {
    border-bottom:0;
    transform: translateY(5px);
    margin-bottom: 5px;
}
  
.btn-primary {
    background-color: var(--main-color);
    color: white!important;
}

.btn-primary:hover {
      background-color: var(--main-color-light);
      border-color: var(--main-color-dark);
  }

.btn-white {
    background-color: white;
    color: var(--main-color);
}

.btn-white:hover {
    color: var(--main-color-light);
}


</style>
