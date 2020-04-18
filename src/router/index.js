import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

import LoginPage from '@/pages/auth/Login';
import RegisterPage from '@/pages/auth/Register';
import ProfilePage from '@/pages/profile/profile';

import BlogFeed from '@/pages/public/BlogFeed';
import BlogPost from '@/pages/public/BlogPost';


import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

import { lazyLoad } from '@/model/utilities';

Vue.component('navbar', Navbar);
Vue.component('sidebar', Sidebar);

const router = new VueRouter({

	mode: 'history',

	linkActiveClass: 'font-weight-bold is-active-link',

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
			name: 'profile',
			path: '/profile',
			component: ProfilePage
		},

		{
			name: 'feed',
			path: '/',
			component: BlogFeed,
		},

		{
			name: 'blog-post',
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

		if (!store.getters['user/isLoggedIn']) {

			console.error("Routes: You are not logged in. Redirect you to the Feed Page");

			next({ name: 'feed' });
		} else {
			next();
		}

	} else {
		next();
	}

})

export default router;