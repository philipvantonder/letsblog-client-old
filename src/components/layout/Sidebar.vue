<template>
	<transition name="slide">
		<div v-if="isOpen" class="w-64 flex-none bg-primary z-50 overflow-auto h-100 position-fixed">
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
</template>

<script>

import { mapGetters } from 'vuex';

export default {

	props: {

		isOpen: {
			type: Boolean,
			required: true
		}

	},

	computed: {
		...mapGetters('user', ['isLoggedIn']),
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

.flex-none {
	flex: none;
}

</style>