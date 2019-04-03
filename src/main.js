import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import dayjs from 'dayjs'

import 'element-ui/lib/theme-chalk/index.css'
import './css/main.css'

Vue.use(ElementUI)

Vue.filter('dateFormat', function (value, format = 'YYYY-MM-DD HH:mm:ss') {
  console.log('value => ', value)
  console.log('format => ', format)
  return dayjs(value).format(format)
  // if (!value) return ''
  // value = value.toString()
  // return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
