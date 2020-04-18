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
			
			<button v-if="isOpen" @click="$emit('toggleSidebar', isOpen = !isOpen)" tabindex="-1" class="position-fixed border-0 bg-black inset-0 opacity-50 h-100 w-100 cursor-default z-10"></button>

			<div class="navbar-brand"> 
				<router-link to="/" class="nav-link text-white" exact> Lets Blog </router-link> 
			</div>
		</div>

		<ul class="navbar-nav">
			<li class="nav-item" v-if="!isLoggedIn">
				<router-link :to="{ name: 'login' }" class="nav-link text-white"> Login </router-link>
			</li>

			<div v-if="isLoggedIn" class="d-flex align-items-center">
				<div class="">
					<img class="rounded-circle h-8 w-8 obj-fit" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
				</div>

				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle text-white" href="javascript:void(0)" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{{ loggedInUser }}
					</a>
					<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
						<router-link :to="{ name: 'profile' }" class="dropdown-item"> Profile </router-link>
						<div class="dropdown-divider"></div>
						<a href="javascript:void(0)" class="dropdown-item" @click="logout()"> Logout </a>
					</div>
				</li>
			</div>
		</ul>
	</nav>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {

	props: {

		navBarStatus: {

			type: Boolean,
			required: true

		}

	},

	data () {

		return  {
			
			isOpen: false

		}

	},

	watch: {

		navBarStatus: function(status) {
			this.isOpen = status;
		}

	},

	methods: {

		...mapActions('user', ['setUserDetails']),

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
	},

	created() {

		this.setUserDetails();

		const handleEscape = (e) => {
			if (e.key === 'Esc' || e.key === 'Escape') {
				this.isOpen = false;
				this.$emit('toggleSidebar', this.isOpen);
			}
		};

		document.addEventListener('keydown', handleEscape);

		this.$once('hook:beforeDestroy', () => {
			document.removeEventListener('keydown', handleEscape);
		});

	}

}
</script>