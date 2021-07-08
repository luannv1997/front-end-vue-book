import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import './scss/main.scss';
import notificate from './plugins/notificate'

Vue.config.productionTip = false
Vue.use(notificate,{store})

new Vue({
  vuetify,
  router,
  store,
  notificate,
  render: h => h(App)
}).$mount('#app')
