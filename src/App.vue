<template>
	<div id="app">
		<div class="vh-100 d-flex flex-column">

			<navbar @toggleSidebar="updateSidebarStatus($event)" :navBarStatus="isOpen" />

			<sidebar @toggleNavbarStatus="updateNavbarStatus($event)" v-if="isLoggedIn" :sideBarStatus="isOpen" />

			<div class="d-flex flex-grow-1 overflow-y-hidden">
				<div class="d-flex flex-grow-1 overflow-auto feed-content">
					<router-view :key="$route.fullPath" ></router-view>
				</div>
			</div>

		</div>
	</div>
</template>


<script>

import { mapGetters } from 'vuex';
import './assets/css/utilities.css'

export default {

	name: 'app',

	data() {

		return {

			isOpen: false,

		}

	},
	
	computed: {
		...mapGetters('user', ['isLoggedIn']),
	},

	methods: {

		updateSidebarStatus(status) {
			this.isOpen = status;
		},

		updateNavbarStatus(status) {
			this.isOpen = status;
		}

	}

}
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');

	body {
		font-family: 'Playfair Display', serif;
	}

	h1, h2, h3, h4 ,h5, h6 {
		font-family: 'Playfair Display', serif;
	}

	p {
		font-family: 'Playfair Display', serif;
	}

	::-moz-selection { /* Code for Firefox */
		color: #FFF;
		background: #18799a;
	}

	::selection {
		color: #FFF;
		background: #18799a;
	}

</style>