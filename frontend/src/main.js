import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

//Tem
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ikx1Y2FzIEQuIEFudHVuZXMiLCJlbWFpbCI6Imx1Y2FzZGFuaWVsYW50dW5lc0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTgxMTMzMjgwLCJleHAiOjE1ODEzOTI0ODB9.1vEraTFrTsm0Yamw50558iRah_3uUerMUHhQfw_Xq0s'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')