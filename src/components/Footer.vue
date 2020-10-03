<template>
  <footer>
    <p> Nikola Pavicevic @ 2020 </p>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
  footer {
    position: relative;
    z-index: 1;
    background-color: var(--blue);
    padding: 2em;
    border-top: 2px solid black;
    box-shadow: 0px -2px 2px -1px rgba(0,0,0,0.75);
  }
</style>