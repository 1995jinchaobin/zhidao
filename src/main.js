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
import 'babel-polyfill';
import Es6Promise from 'es6-promise';
import UserBehaviorMonitoring from './assets/js/UserBehaviorMonitoring'
Vue.use(UserBehaviorMonitoring)
Es6Promise.polyfill();
import rem from './assets/js/rem.js';
Vue.prototype.rem = rem;
Vue.prototype.getData = getData;
Vue.config.productionTip = false;
//配置echart
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
Vue.component('chart', ECharts)
//配置element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//全局配置axios
Vue.prototype.$axios = axios;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 
new Vue({
  render: h => h(App),
  // store,
  router: Routers
}).$mount('#app')