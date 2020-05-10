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
			<li v-for="category in categories" :key="category._id" class="nav-item dropdown" >
				<router-link class="nav-link text-white" tag="a" :to="{ name: 'login' }" >
					{{ category.name }} <font-awesome-layers v-if="category.subcategories.length > 0" full-width class="fa-fw fa-1x py-1 category-caret"> <font-awesome-icon icon="caret-down" /> </font-awesome-layers>
				</router-link>

				<ul v-if="category.subcategories.length > 0" class="navbar-nav position-absolute shadow bg-white rounded z-10">
					<li class="nav-item dropdown" >
						<router-link class="nav-link text-black" tag="a" :to="{ name: 'login' }" v-for="subcategory in category.subcategories" :key="subcategory._id">
							{{ subcategory.subcategoryName }}
						</router-link>
					</li>
				</ul>
			</li>

			<li class="nav-item d-flex align-items-center" v-if="!isLoggedIn">
				<router-link :to="{ name: 'login' }" class="nav-link text-white"> Sign In </router-link>
			</li>

			<div v-if="isLoggedIn" class="d-flex align-items-center">
				<div class="cursor-pointer" id="navbarDropdown" data-toggle="dropdown">
					<img class="rounded-circle h-10 w-10 obj-fit profile-border" :src="'http://localhost:4000/api/users/image/' + user._id + '/' + user.profileImage" />
				</div>

				<li class="nav-item dropdown">
					<a class="nav-link text-white" href="javascript:void(0)" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{{ loggedInUser }}
					</a>
					<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
						<router-link :to="{ name: 'profile' }" class="dropdown-item"> Profile </router-link>
						<div class="dropdown-divider"></div>
						<a href="javascript:void(0)" class="dropdown-item" @click="logoutUser()"> Logout </a>
					</div>
				</li>
			</div>
		</ul>
	</nav>
</template>

<script>

import { mapGetters, mapActions, mapState } from 'vuex';

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
			isOpen: false

		}

	},

	watch: {

		navBarStatus: function(status) {
			this.isOpen = status;
		}

	},

	methods: {

		...mapActions('user', ['setUserDetailsFromToken', 'setUser', 'logout']),
		...mapActions('category', ['setCategories']),

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
		...mapGetters('user', ['isLoggedIn', 'loggedInUser']),
		...mapState('user', ['user']),
		...mapState('category', ['categories']),
	},

	async created() {

		await this.setCategories();

		await this.setUser();
				
		await this.setUserDetailsFromToken();

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

<style scoped>

.category-caret {
	transition: transform 0.5s;
}

ul li a:hover > .category-caret  {
	transform: rotate(180deg);
}

ul li ul {
	visibility: hidden;
	opacity: 0;
	display: none;
	padding: 0.5rem 0 !important;
}

ul li:hover > ul, ul li:focus-within > ul, ul li ul:hover {
	visibility: visible;
	opacity: 1;
	display: block;
}

ul li ul li a {
	display: block !important;
    width: 100% !important;
    padding: 0.25rem 1.5rem !important;
    clear: both !important;
    font-weight: 400 !important;
    color: #212529 !important;
    text-align: inherit !important;
    white-space: nowrap !important;
	border: 0 !important;
}

ul li ul li a:active {
	color: #fff !important;
    text-decoration: none !important;
    background-color: #18799a !important;
}

ul li ul li a:hover {
	color: #16181b;
    text-decoration: none;
    background-color: #f8f9fa;
}

ul li ul li {
	clear: both;
}

</style>