import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Axios from 'axios'
import moment from 'moment'
import './plugins/filter'
import './plugins/fontAwesomeIcon'

Vue.prototype.moment = moment
Vue.config.productionTip = false
Vue.prototype.$http = Axios

const token = localStorage.getItem('token')
if (token) {
   Vue.prototype.$http.defaults.headers.common[
      'Authorization'
   ] = `Bearer ${token}`
}
Axios.interceptors.response.use(
   function (response) {
      if (response.data.result != undefined && response.data.code != 200) {
         return Promise.reject(response.data.errors)
      }
      return response
   },
   function (error) {

      if (error.response.status == 402) {
         localStorage.removeItem('token')
         localStorage.removeItem('user_name')
         localStorage.removeItem("store");
         localStorage.removeItem("user_id");
         store.state.token = null
         
         router.replace('/login')
      }
     
      let message = error.response.data.message
      Object.keys(error.response.data.errors).forEach((element) => {
         message = message + '\n' + error.response.data.errors[element][0]
      })
      error.response.data.message = message
      
      return Promise.reject(error)
   }
)

  
new Vue({
  router,
  store,
   vuetify,
  render: h => h(App)
}).$mount('#app')
