import Vue from 'vue'
import App from './App.vue' 
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(require('vue-moment'));
Vue.use(VueToast);

Vue.filter('bm_time', function (value) {
  const format = 'YYYY-MM-DD HH:mm:ss';
  return moment(value).format(format);
})

new Vue({
  render: h => h(App),
}).$mount('#app')

