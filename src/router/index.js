import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'

import Navbar from '@/components/layout/Navbar'

import userService from '@/services/user'
import { lazyLoad } from '@/model/utilities'

Vue.component('navbar', Navbar)

const router = new VueRouter({

	mode: 'history',

	routes: [

		{
			name: 'login',
			path: '/login',
			component: Login
		},

		{
			name: 'register',
			path: '/register',
			component: Register
		},

		{
			name: 'home',
			path: '/',
			component: lazyLoad('components/Home')
		},

		{
			name: 'add-post',
			path: '/add-post',
			component: lazyLoad('components/post/AddPost')
		},

		{
			name: 'edit-post',
			path: '/edit-post/:id',
			component: lazyLoad('components/post/EditPost')
		},

		{
			name: 'single-post',
			path: '/single-post/:id',
			component: lazyLoad('components/post/SinglePost')
		},

		{
			name: 'posts',
			path: '/posts',
			component: lazyLoad('components/post/AllPosts')
		},

	]

})

router.beforeEach((to, from, next) => {

	const unAuthenticatedRoutes = ['login', 'register'];

	// these routes do not need authentication
	if (unAuthenticatedRoutes.includes(to.name)) {
		next()
	} else {

		// If token is not setted redirect to login
		if (localStorage.getItem('token') === null) {
			next({ name: 'login' })
		}

		// check if the token that is provide is valid
		userService.isAuthenticated()
		.then(response => {

			let { code } = response.data
			
			if (code === 1) {
				
				localStorage.removeItem('token')
				
				next({ name: 'login' })
			} else if (code === 0) {
				next()
			}

		})
		.catch(error => console.error(error))

		next()

	}

})

export default router