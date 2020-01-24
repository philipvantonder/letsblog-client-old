import Vue from 'vue'
import App from './App.vue'

import './css/style.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

import Navbar from './components/layout/Navbar.vue'

Vue.component('navbar', Navbar)

import LoginComponent from './components/auth/LoginComponent.vue'
import RegisterComponent from './components/auth/RegisterComponent.vue'

import Home from './components/Home.vue'
import AddPost from './components/post/AddPost.vue'
import EditPost from './components/post/EditPost.vue'
import AllPosts from './components/post/AllPosts.vue'
import SinglePosts from './components/post/SinglePost.vue'

const routes = [
    {
        name: 'login',
        path: '/login',
        component: LoginComponent
    },
    {
        name: 'register',
        path: '/register',
        component: RegisterComponent
    },
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'add-post',
        path: '/add-post',
        component: AddPost
    },
	{
		name: 'edit-post',
		path: '/edit-post/:id',
		component: EditPost
	},
	{
		name: 'single-post',
		path: '/single-post/:id',
		component: SinglePosts
	},
    {
        name: 'posts',
        path: '/posts',
        component: AllPosts
    }
]

const router = new VueRouter({ mode: 'history', routes: routes})

new Vue(Vue.util.extend({ router }, App)).$mount('#app')