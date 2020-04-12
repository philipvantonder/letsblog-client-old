<template>

	<div>
		<nav class="navbar navbar-dark navbar-expand-lg bg-primary">
			<a href="javascript:void(0)" class="text-white pl-3" @click="isOpen = !isOpen">
				<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="fill-current w-6 h-6" >
					<g>
						<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" ></path>
					</g>
				</svg>
			</a>

			<a class="navbar-brand" href="javascript:void(0)"> <router-link to="/" class="nav-link text-white"> Lets Blog </router-link> </a>
			
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleMobileView" aria-controls="navbarToggleMobileView" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse justify-content-between" id="navbarToggleMobileView">
				<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
					<li class="nav-item" v-if="isLoggedIn">
						<router-link :to="{ name: 'add-post' }" class="nav-link text-white ml-3 ml-lg-0"> Create Post </router-link>
					</li>
					<li class="nav-item" v-if="isLoggedIn">
						<router-link :to="{ name: 'post-list' }" class="nav-link text-white ml-3 ml-lg-0"> Posts </router-link>
					</li>
				</ul>

				<ul class="navbar-nav d-flex align-items-center">
					<li class="nav-item" v-if="!isLoggedIn">
						<router-link :to="{ name: 'login' }" class="nav-link text-white"> Login </router-link>
					</li>

					<div v-if="isLoggedIn" class="d-flex align-items-center">
						<div class="d-none d-lg-block">
							<img class="rounded-circle h-8 w-8 obj-fit" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
						</div>

						<li class="nav-item dropdown d-none d-lg-block">
							<a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								{{ loggedInPerson.name }} {{ loggedInPerson.surname }}
							</a>
							<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
								<router-link :to="{ name: 'profile' }" class="dropdown-item"> Profile </router-link>
								<div class="dropdown-divider"></div>
								<a href="javascript:void(0)" class="dropdown-item" @click="logout()"> Logout </a>
							</div>
						</li>
					</div>

				</ul>
			</div>
		</nav>

		<transition name="slide">
			<div v-if="isOpen" class="w-64 bg-primary vh-100 position-absolute z-50">
				<ul class="navbar-nav">
					<li class="nav-item" v-if="isLoggedIn">
						<router-link tag="a" :to="{ name: 'add-post' }" class="nav-link text-white pl-2rem"> Create Post </router-link>
					</li>
					<li class="nav-item" v-if="isLoggedIn">
						<router-link tag="a" :to="{ name: 'post-list' }" class="nav-link text-white pl-2rem"> Posts </router-link>
					</li>
				</ul>
			</div>
		</transition>

	</div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {

	data () {

		return  {
			myWidth: 0,
			isOpen: false,
			loggedInPerson: ''

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
		...mapGetters('user', ['isLoggedIn', 'getUserDetails']),
	},

	async created () {

		this.loggedInPerson = await this.getUserDetails;

	}

}
</script>

<style scoped>

.w-64 {
	width: 16rem;
}

.h-6 {
	height: 1.5rem;;
}

.w-6 {
	width: 1.5rem;;
}

.h-8 {
    height: 2rem;
}

.w-8 {
    width: 2rem;
}

.obj-fit {
	object-fit: cover;
}

.pl-2rem {
	padding-left: 2rem !important;
}

.z-50 {
	z-index: 50;
}

.slide-enter-active, .slide-leave-active{
	transition: transform 0.2s ease;
}

.slide-enter, .slide-leave-to {
	transform: translateX(-100%);
	transition: all 150ms ease-in 0s
}

</style>