import Vue from 'vue';
import App from './App.vue';

import Routers from './router';
import axios from 'axios';
// import store from './store';
import 'animate.css';

// 全局变量
import all from './assets/js/allvariable.js';
Vue.prototype.all = all;
// 全局函数获取数据
import getData from './assets/js/getdata.js';
import get from './assets/js/get.js';
import 'babel-polyfill';
import Es6Promise from 'es6-promise';
import UserBehaviorMonitoring from './assets/js/UserBehaviorMonitoring'
Vue.use(UserBehaviorMonitoring)
Es6Promise.polyfill();
import rem from './assets/js/rem.js';
Vue.prototype.rem = rem;
Vue.prototype.getData = getData;
Vue.prototype.get = get;
Vue.config.productionTip = false;
//配置echart
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
Vue.component('chart', ECharts)
//配置element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
// 使用富文本编译器
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
//全局配置axios
Vue.prototype.$http = axios;
import { Message } from 'element-ui'
Vue.prototype.$message = Message;
// axios.default.baseURL="http://192.168.1.115:81"
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.interceptors.request.use(
//   config => {
//     const userId = localStorage.getItem('userId')
//     const token = localStorage.getItem('token')
//     if(!userId){
//       userId = 0
//     }
//     if(!token){
//       token = ''
//     }
//     if(config.method === 'post') {
//       console.log('post')
//       config.data = {
//         ...config.data,
//         userId:userId,
//         token:token
//       }
//     } else if (config.method === 'get') {
//       console.log('get')
//       config.params = {
//         userId:userId,
//         token:token,
//         ...config.params
//       }
//     }
//     return config
//   }
// )
new Vue({
  render: h => h(App),
  // store,
  router: Routers
}).$mount('#app')