<template>
  <footer>
    <p>Odin-book by 
      <a href="mailto:nijepa@hotmail.com"> Nikola Pavicevic </a> @ 2020
    </p>
    <p>Final project assignment for 
      <a href="https://www.theodinproject.com/courses/nodejs" target="blank">
        <img :src="require('../assets/odin-logo.svg')" alt=""> The Odin Project
      </a> , NodeJS path. The source code can be viewed on 
      <a href="https://github.com/nijepa/odinbook-frontend" target="blank">GitHub</a> .
    </p>
  </footer>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style scoped>
  footer {
    position: relative;
    z-index: 1;
    background-color: var(--blue);
    padding: .7em;
    border-top: 2px solid black;
    box-shadow: 0 -2px 2px -1px rgba(0,0,0,0.75);
  }
  img {
    width: 20px;
    height: auto;
  }
</style>
