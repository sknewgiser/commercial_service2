import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


// 引入样式重置文件
import '@/assets/css/reset.css'
// 引入rem布局文件
import '@/assets/js/rem.js'
import Axios from 'axios'
import { Icon, Search, Pagination } from 'vant';
Vue.use(Icon).use(Search).use(Pagination);
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.prototype.$axios = Axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
