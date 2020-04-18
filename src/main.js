import Vue from 'vue';
import App from './App.vue';

import Vuelidate from 'vuelidate';
import Axios from 'axios';

import store from './store/index';
import router from './router/index';

import './css/style.scss';
import 'bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'

library.add(faLink)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)

/* Filters */
import '@/model/filters/index';

/* Directives */
import '@/model/directives/index';

Vue.use(Vuelidate);

Vue.prototype.$http = Axios;

Axios.interceptors.response.use(response => {

	let { code } = response.data;

	if (code === "INVALID_TOKEN") {

		if (store.getters['user/isLoggedIn']) {
			
			console.error("Routes: You are not logged in. Redirect you to the Feed Page");
			
			localStorage.removeItem('token');
			
			store.dispatch('user/logout');
			
			router.push({ name: 'feed' });
		
		}
	
	}

	return Promise.resolve(response);

});

Vue.config.productionTip = false;

new Vue(Vue.util.extend({ router, store }, App)).$mount('#app');