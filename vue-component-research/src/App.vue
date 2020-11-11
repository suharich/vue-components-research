<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!--HelloWorld msg="Welcome to Your Vue.js App"/-->
    <br/><br/>
    <h2>Vue-Good-Table example</h2>
    <p></p>
    <vue-good-table-example></vue-good-table-example>
    <br/><br/><br/><br/>
    <!-- <h2>Bootstrap-Vue</h2>
    <p></p>
    <bootstrap-vue-example></bootstrap-vue-example>
    <br/><br/><br/><br/> -->
    <h2>Bootstrap-Vue Grouped tabel</h2>
    <p></p>
    <bootstrap-vue-grouped-example></bootstrap-vue-grouped-example>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import VueGoodTableExample from './components/VueGoodTableExample.vue';
//import BootstrapVueExample from './components/BootstrapVue.vue';
import BootstrapVueGroupedExample from './components/BootstrapVueGrouped.vue';


export default {
  name: 'App',
  components: {
    // HelloWorld,
    VueGoodTableExample,
    //BootstrapVueExample,
    BootstrapVueGroupedExample
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
