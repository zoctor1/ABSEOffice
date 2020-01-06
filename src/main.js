import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import i18n from '@/plugins/i18n';
import * as authService from '@/services/auth.service';
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  created: function () {
    var textword = {};

    if (localStorage.getItem('textword') != null) {
      try {
        textword = JSON.parse(localStorage.getItem('textword'));
      } catch (e) {}
      if (Object.keys(textword).length > 0) {
        i18n.setLocaleMessage('1', textword[1]);
        i18n.setLocaleMessage('2', textword[2]);
        i18n.setLocaleMessage('3', textword[3]);
      }
    }
  },
  render: h => h(App)
}).$mount("#app");
