<template>
  <div id="app">
<!--     <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <transition name="slide-fade" mode="out-in"> -->
    <router-view/>
    <!-- </transition> -->
  </div>
</template>

<style >
  @import './assets/css/app.css';

#app {
  font-family: 'Londrina Solid', cursive;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  margin: 0;
}

/* #nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */

</style>
