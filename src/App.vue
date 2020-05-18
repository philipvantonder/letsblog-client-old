<template>
	<div class="vh-100 d-flex flex-column">

		<navbar @toggleSidebar="updateSidebarStatus($event)" :navBarStatus="isOpen" />

		<sidebar @toggleNavbarStatus="updateNavbarStatus($event)" v-if="isLoggedIn" :sideBarStatus="isOpen" />

		<div class="d-flex flex-grow-1 overflow-y-hidden">
			<div class="d-flex flex-grow-1 overflow-auto feed-content">
				<router-view :key="$route.fullPath" ></router-view>
			</div>
		</div>

	</div>
</template>


<script>

import { mapGetters } from 'vuex';
import './css/utilities.css'

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

	::-moz-selection { /* Code for Firefox */
		color: #FFF;
		background: #18799a;
	}

	::selection {
		color: #FFF;
		background: #18799a;
	}

</style>