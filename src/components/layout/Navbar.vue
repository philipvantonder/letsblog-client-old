<template>
	<nav class="navbar navbar-dark navbar-expand-lg bg-primary d-flex justify-content-between">
		<div class="d-flex align-items-center pl-3">
			<a v-if="isLoggedIn" href="javascript:void(0)" @click="$emit('toggleSidebar', isOpen = !isOpen)">
				<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="w-6 h-6" >
					<g>
						<path id="menu-bar" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" ></path>
					</g>
				</svg>
			</a>

			<a class="navbar-brand" href="javascript:void(0)"> <router-link to="/" class="nav-link text-white"> Lets Blog </router-link> </a>
		</div>

		<ul class="navbar-nav">
			<li class="nav-item" v-if="!isLoggedIn">
				<router-link :to="{ name: 'login' }" class="nav-link text-white"> Login </router-link>
			</li>

			<div v-if="isLoggedIn" class="d-flex align-items-center">
				<div class="d-none d-lg-block">
					<img class="rounded-circle h-8 w-8 obj-fit" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
				</div>

				<li class="nav-item dropdown d-none d-lg-block">
					<a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{{ loggedInUser }}
					</a>
					<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
						<router-link :to="{ name: '' }" class="dropdown-item"> Profile </router-link>
						<div class="dropdown-divider"></div>
						<a href="javascript:void(0)" class="dropdown-item" @click="logout()"> Logout </a>
					</div>
				</li>
			</div>
		</ul>
	</nav>
</template>

<script>

import { mapGetters } from 'vuex';

export default {

	data () {

		return  {
			
			isOpen: false

		}

	},

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
		...mapGetters('user', ['isLoggedIn', 'loggedInUser']),
	}

}
</script>

<style scoped>

#menu-bar {
	fill: #FFF;
}

.h-8 {
    height: 2rem;
}

.w-8 {
    width: 2rem;
}

.h-6 {
	height: 1.5rem;;
}

.w-6 {
	width: 1.5rem;;
}

.obj-fit {
	object-fit: cover;
}

</style>