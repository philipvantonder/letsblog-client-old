import Vue from 'vue'
import App from './App.vue'

import Vuelidate from 'vuelidate';

import VueAxios from 'vue-axios'
import axios from 'axios'

import store from './store/index'
import router from './router/index'

import './css/style.scss'

Vue.use(Vuelidate)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue(Vue.util.extend({ router, store }, App)).$mount('#app')