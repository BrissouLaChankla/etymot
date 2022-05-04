<template>
  <div id="keyboard" class="text-white mt-5">
    <div class="line1">
      <span>A</span>
      <span>Z</span>
      <span>E</span>
      <span>R</span>
      <span>T</span>
      <span>Y</span>
      <span>U</span>
      <span>I</span>
      <span>O</span>
      <span>P</span>
    </div>
    <div class="line2">
      <span>Q</span>
      <span>S</span>
      <span>D</span>
      <span>F</span>
      <span>G</span>
      <span>H</span>
      <span>J</span>
      <span>K</span>
      <span>L</span>
      <span>M</span>
    </div>
    <div class="line3">
      <span>W</span>
      <span>X</span>
      <span>C</span>
      <span>V</span>
      <span>B</span>
      <span>N</span>
    </div>
  </div>
</template>

<style>
#keyboard span {
    display: inline-block;
    height: 45px;
    width:40px;

    margin:4px;
    border:1px solid white;
    border-radius:5px;
    cursor: pointer;
    transition: all .3s ease;
}

#keyboard span:hover { 
    background-color:blueviolet;
}

.line1, .line2, .line3 {
    height: 58px;
}
</style>