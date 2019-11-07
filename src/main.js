import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'
import router from './router.js'
import VueMaterial from 'vue-material'

import 'vue-material/dist/theme/default.css' // This line here
import 'vue-material/dist/vue-material.min.css'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import 'uikit/dist/js/uikit-icons.min.js';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';

Vue.use(Notifications)
Vue.use(VueMaterial)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
