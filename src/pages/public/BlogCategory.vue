<template>
	<div class="container">
		<div class="row pt-4">
			<div class="col-lg-12">
				<div v-if="linkedCategoryPosts.length" class="card-deck">
					<div class="col-xs-12 col-sm-6 col-lg-4 mb-4 d-flex" v-for="post in linkedCategoryPosts" :key="post._id">
						<router-link :to="{ name: 'blog-post', params: { 'id': post.slug } }" tag="div" class="card w-100 shadow border-0">
							<img class="card-img-top card-height" :src="'http://localhost:4000/api/posts/image/' + post._id" alt="Card image cap">

							<div class="card-body">
								<h5 class="card-title" title="View post"> {{ post.title }} </h5>

								<p class="card-text" v-html="LimitText(post.body, 80)"> </p>
							</div>
						</router-link>
					</div>
				</div>
				<div v-else>
					There is currently no linked posts.
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
import { LimitText } from '@/utilities/filters/index'; 

export default {

	name: 'BlogCategory',

	data() {

		return {

		}

	},

	methods: {

		LimitText,

		...mapActions('category', ['setCategoryBySlug'])

	},

	computed: {

		...mapState('category', ['linkedCategoryPosts'])

	},

	created() {
		
		const { id } = this.$route.params;

		this.setCategoryBySlug(id);
		
	}

}

</script>

<style scoped>

.card-height {
	height: 200px;
}

.card {
	border-radius: .625rem;
	transition: transform 0.4s;
}

.card:hover {
	transform: translate(0, -5px);
	cursor: pointer;
}

</style>