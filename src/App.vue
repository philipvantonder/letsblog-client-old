<template>
	<div class="vh-100 d-flex flex-column">

		<navbar @toggleSidebar="updateSideBarStatus($event)"/>

		<div class="d-flex flex-grow-1 overflow-y-hidden">

			<sidebar v-if="isLoggedIn" :isOpen="sideBarStatus" />
			
			<div class="d-flex flex-grow-1 overflow-auto feed-content">
				<router-view ></router-view>
			</div>
		</div>

	</div>
</template>


<script>

import { mapGetters } from 'vuex';

export default {

	name: 'app',

	data() {

		return {

			sideBarStatus: false

		}

	},
	
	computed: {
		...mapGetters('user', ['isLoggedIn']),
	},

	methods: {

		updateSideBarStatus(status) {
			this.sideBarStatus = status
		}

	}

}
</script>

<style>

.overflow-y-hidden {
	overflow-y: hidden !important;
}

.feed-content::-webkit-scrollbar {
	width: 15px;
	background-color: #fff;
}

.feed-content::-webkit-scrollbar-thumb {
	width: 15px;
	background-color: #95999c;
}

</style>