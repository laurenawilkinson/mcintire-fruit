import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import './scss/main.scss';
import AOS from 'aos'
import 'aos/dist/aos.css'

Vue.config.productionTip = false;

new Vue({
  router,
  created () {
    AOS.init({
      once: true,
      duration: 800
    })
  },
  render: h => h(App)
}).$mount("#app");
