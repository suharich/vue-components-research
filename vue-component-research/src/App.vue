<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!--HelloWorld msg="Welcome to Your Vue.js App"/-->
    <br/>
    <h2>Vue-Good-Table example</h2>
    <vue-good-table-example></vue-good-table-example>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import VueGoodTableExample from './components/VueGoodTableExample.vue'


export default {
  name: 'App',
  components: {
    // HelloWorld,
    VueGoodTableExample
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
