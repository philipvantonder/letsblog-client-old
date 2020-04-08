import Vue from 'vue';
import App from './App.vue';

import Vuelidate from 'vuelidate';
import Axios from 'axios';

import store from './store/index';
import router from './router/index';

import './css/style.scss';
import 'bootstrap';

/* Filters */
import '@/model/filters/index';

Vue.use(Vuelidate);

Vue.prototype.$http = Axios;

Axios.interceptors.response.use(response => {

	let { code } = response.data;

	if (code === "INVALID_TOKEN") {

		if (store.getters['users/isLoggedIn']) {
			
			console.log("You are logged in and the token is invalid. Remove token and logout");
			
			localStorage.removeItem('token');
			
			store.dispatch('users/logout');
			
			router.push({ name: 'feed' });
		
		}
	
	}

	return Promise.resolve(response);

});

Vue.config.productionTip = false;

new Vue(Vue.util.extend({ router, store }, App)).$mount('#app');