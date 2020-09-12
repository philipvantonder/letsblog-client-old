import Vue from 'vue';
import App from './App.vue';

import Vuelidate from 'vuelidate';
import Axios from 'axios';

import store from './store/index';
import router from './router/index';

/* Bootstrap Styles */
import './assets/css/style.scss';
import 'bootstrap';

/* Font Awesome */
import '@/utilities/font-awesome/index';

/* Directives */
import '@/utilities/directives/index';

Vue.use(Vuelidate);

Vue.prototype.$http = Axios;

Axios.interceptors.response.use(response => {

	let { code } = response.data;

	// code === "EXPIRED_TOKEN"
	if (code === "INVALID_TOKEN") {

		if (store.getters['User/isLoggedIn']) {
			
			console.error("Routes: You are not logged in. Redirect you to the Feed Page");
			
			localStorage.removeItem('token');
			
			store.dispatch('User/logout');
			
			router.push({ name: 'feed' });
		
		}
	
	}

	return Promise.resolve(response);

});

Vue.config.productionTip = false;

new Vue(Vue.util.extend({ router, store }, App)).$mount('#app');