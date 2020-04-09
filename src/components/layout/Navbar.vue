<template>
	<nav class="navbar navbar-dark navbar-expand-lg bg-primary">
		<a class="navbar-brand" href="javascript:void(0)"> <router-link to="/" class="nav-link text-white"> Lets Blog </router-link> </a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo02">
			<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
				<!-- <li class="nav-item active">
					<router-link to="/" class="nav-link text-white">Home</router-link>
				</li> -->
				<li class="nav-item" v-if="isLoggedIn">
					<router-link :to="{ name: 'add-post' }" class="nav-link text-white">Create Post</router-link>
				</li>
				<li class="nav-item" v-if="isLoggedIn">
					<router-link :to="{ name: 'post-list' }" class="nav-link text-white">Posts</router-link>
				</li>
			</ul>
			<ul class="navbar-nav">
				<li class="nav-item" v-if="isLoggedIn">
					<a href="javascript:void(0)" class="nav-link text-white" @click="logout()">Logout</a>
				</li>
				<li class="nav-item" v-if="!isLoggedIn">
					<router-link :to="{ name: 'login' }" class="nav-link text-white"> Login </router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

	methods: {

		logout() {

			if (localStorage.getItem('token') !== null) {

				localStorage.removeItem('token');
				
				this.$store.dispatch('user/logout');

				this.$router.push({ name: 'login' });
			}

		}

	},

	computed: {
		...mapGetters('user', ['isLoggedIn']),
	}

}
</script>