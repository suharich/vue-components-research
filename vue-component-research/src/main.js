import Vue from 'vue'
import App from './App.vue'
import VueGoodTablePlugin from "vue-good-table";
import {_} from 'vue-underscore';

// import the styles
import "vue-good-table/dist/vue-good-table.css";

Vue.use(VueGoodTablePlugin);
Vue.use(_);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
