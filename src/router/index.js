import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

import LoginPage from '@/pages/auth/Login';
import RegisterPage from '@/pages/auth/Register';
import BlogFeed from '@/pages/public/BlogFeed';
import BlogPost from '@/pages/public/BlogPost';

import Navbar from '@/components/layout/Navbar';

// import userService from '@/services/user';
import { lazyLoad } from '@/model/utilities';

Vue.component('navbar', Navbar);

const router = new VueRouter({

	mode: 'history',

	routes: [

		{
			name: 'login',
			path: '/login',
			component: LoginPage
		},

		{
			name: 'register',
			path: '/register',
			component: RegisterPage
		},

		{
			name: 'feed',
			path: '/',
			component: BlogFeed,
		},

		{
			name: 'read-post',
			path: '/post/:id',
			component: BlogPost,
		},

		{
			name: 'add-post',
			path: '/add-post',
			component: lazyLoad('pages/post/Add'),
			meta: {
				requiresAuth: true 
			}
		},

		{
			name: 'edit-post',
			path: '/edit-post/:id',
			component: lazyLoad('pages/post/Edit'),
			meta: {
				requiresAuth: true 
			}
		},

		{
			name: 'post-list',
			path: '/post-list',
			component: lazyLoad('pages/post/List'),
			meta: {
				requiresAuth: true 
			}
		},

	]

});

router.beforeEach((to, from, next) => {

	if (to.matched.some(record => record.meta.requiresAuth)) {

		if (!store.getters['users/isLoggedIn']) {

			console.log("Routes: You are not logged in");

			next({ name: 'feed' });
		} else {
			next();
		}

	} else {
		next();
	}

	// const unAuthenticatedRoutes = ['login', 'register', 'home', 'single-post'];

	// these routes do not need authentication
	// if (unAuthenticatedRoutes.includes(to.name)) {
	// 	next();
	// } else {

		// If token is not setted redirect to login
		// if (localStorage.getItem('token') === null) {
		// 	next({ name: 'login' });
		// }

		// console.log(store.getters['users/isLoggedIn']);

		// if (store.getters['users/isLoggedIn']) {
			
		// }

		// check if the token that is provide is valid
		// userService.isAuthenticated()
		// .then(response => {

		// 	let { code } = response.data;
			
		// 	if (code === 1) {

		// 		localStorage.removeItem('token');

		// 		store.dispatch('users/logout');
				
		// 		next({ name: 'login' });

		// 	} else if (code === 0) {

		// 		next();
		// 	}

		// })
		// .catch(error => console.error(error));

		// next();

	// }

})

export default router;