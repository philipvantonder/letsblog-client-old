import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

import LoginPage from '@/pages/auth/Login';
import RegisterPage from '@/pages/auth/Register';
import ForgotPasswordPage from '@/pages/auth/ForgotPassword';
import ChangePasswordPage from '@/pages/auth/ChangePassword';

import BlogFeed from '@/pages/public/BlogFeed';
import BlogPost from '@/pages/public/BlogPost';
import BlogCategory from '@/pages/public/BlogCategory';

import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

import { lazyLoad } from '@/utilities/functions';

Vue.component('navbar', Navbar);
Vue.component('sidebar', Sidebar);

const router = new VueRouter({

	mode: 'history',

	linkActiveClass: 'font-weight-bold is-active-link active',

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
			name: 'forgot-password',
			path: '/forgot-password',
			component: ForgotPasswordPage
		},
		
		{
			name: 'change-password',
			path: '/change-password/:token',
			component: ChangePasswordPage
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
			name: 'blog-category',
			path: '/category/:id',
			component: BlogCategory,
		},

		{
			name: 'profile',
			path: '/profile',
			component: lazyLoad('pages/profile/index'),
			meta: {
				requiresAuth: true
			}
		},

		{
			name: 'edit-profile',
			path: '/edit-profile',
			component: lazyLoad('pages/profile/EditProfile'),
			meta: {
				requiresAuth: true
			}
		},

		{
			name: 'categories',
			path: '/categories',
			component: lazyLoad('pages/category/index'),
			meta: {
				requiresAuthAndIsAdmin: true
			}
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

		{
			name: 'review-posts',
			path: '/review-posts',
			component: lazyLoad('pages/reviewPosts/index'),
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

	} else if (to.matched.some(record => record.meta.requiresAuthAndIsAdmin)) {

		if (!store.getters['user/isLoggedIn'] || !store.getters['userRoles/isAdmin']) {

			console.error("Routes: You are not logged in or is not a Admin. Redirect you to the Feed Page");

			next({ name: 'feed' });
		} else {
			next();
		}
		

	} else {
		next();
	}

})

export default router;