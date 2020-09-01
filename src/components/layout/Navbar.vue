<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-primary d-flex justify-content-between">
		<div class="d-flex align-items-center">
			<a v-if="isLoggedIn" href="javascript:void(0)" @click="$emit('toggle-sidebar', isOpen = !isOpen)">
				<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="w-6 h-6" >
					<g>
						<path id="menu-bar" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" ></path>
					</g>
				</svg>
			</a>
			
			<button v-if="isOpen" @click="$emit('toggle-sidebar', isOpen = !isOpen)" tabindex="-1" class="position-fixed border-0 bg-black inset-0 opacity-50 h-100 w-100 cursor-default z-10"></button>

			<router-link to="/" tag="a" :class="{ 'ml-2': isLoggedIn }" class="navbar-brand text-white" exact> Lets Blog </router-link>
		</div>
		
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse flex-grow-0" id="navbarNavAltMarkup">
			<div class="navbar-nav">
				<div v-for="(category, index) in categories" :key="index" class="dropdown">
					<router-link v-if="category.subcategory.length === 0" class="nav-link text-white" tag="a" data-toggle="dropdown" :to="{ name: 'blog-category', params: { 'id': category.category.slug } }" >
						{{ category.category.name }} 
					</router-link>

					<a v-if="category.subcategory.length > 0" class="nav-link dropdown-toggle text-white cursor-pointer" tag="a" data-toggle="dropdown" >
						{{ category.category.name }} 
					</a>

					<div v-if="category.subcategory.length > 0" class="dropdown-menu" aria-labelledby="categoryDropdown">
						<router-link class="dropdown-item" tag="a" :to="{ name: 'blog-category', params: { 'id': subcategoryItem.slug } }" v-for="subcategoryItem in category.subcategory" :key="subcategoryItem._id">
							{{ subcategoryItem.name }}
						</router-link>
					</div>
				</div>

				<router-link v-if="!isLoggedIn" :to="{ name: 'login' }" class="nav-link text-white"> Sign In </router-link>

				<div v-if="isLoggedIn" class="d-flex align-items-center">
					<div class="cursor-pointer" id="navbarDropdown" data-toggle="dropdown">
						<img class="rounded-circle h-10 w-10 obj-fit profile-border" :src="api_url + '/api/users/image/' + user.id + '/' + user.profileImage" />
					</div>

					<li class="nav-item dropdown">
						<a class="nav-link text-white" href="javascript:void(0)" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							{{ user.name }} {{ user.surname }}
						</a>
						<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
							<router-link :to="{ name: 'profile' }" class="dropdown-item"> Profile </router-link>
							<div class="dropdown-divider"></div>
							<a href="javascript:void(0)" class="dropdown-item" @click="logoutUser()"> Logout </a>
						</div>
					</li>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>

import { mapGetters, mapActions, mapState } from 'vuex';
import { api_url } from '@/utilities/config/index';

export default {

	props: {

		navBarStatus: {

			type: Boolean,
			required: true

		}

	},

	data () {

		return  {
			
			showModal: false,
			isOpen: false,
			api_url

		}

	},

	watch: {

		navBarStatus: function(status) {
			this.isOpen = status;
		}

	},

	methods: {

		...mapActions('User', ['setUser', 'logout']),
		...mapActions('Category', ['setCategories']),

		logoutUser() {

			if (localStorage.getItem('token') !== null) {

				localStorage.removeItem('token');

				this.logout();

				this.$router.push({ name: 'login' });
				
			}

		},

		updateModalState(state) {
			this.showModal = state;
		}

	},

	computed: {
		...mapGetters('User', ['isLoggedIn']),
		...mapState('User', ['user']),
		...mapState('Category', ['categories']),
	},

	async created() {

		await this.setCategories();

		await this.setUser();

		const handleEscape = (e) => {
			if (e.key === 'Esc' || e.key === 'Escape') {
				this.isOpen = false;
				this.$emit('toggle-sidebar', this.isOpen);
			}
		};

		document.addEventListener('keydown', handleEscape);

		this.$once('hook:beforeDestroy', () => {
			document.removeEventListener('keydown', handleEscape);
		});

	}

}
</script>