<template>
    <div>
        <navbar />

		<div class="container">
			<div class="row pt-4">
				<div class="col-md-12">
					<div v-if="publishedBlogPosts.length" class="card-deck">
						<div class="col-md-4 mb-4 d-flex" v-for="post in publishedBlogPosts" :key="post._id">
							<router-link :to="{ name: 'blog-post', params: { 'id': post._id } }" tag="div" class="card shadow border-0">
								<img class="card-img-top card-height" :src="'http://localhost:4000/posts/image/' + post.user + '/' + post.fileName" alt="Card image cap">

								<div class="card-body">
									<h5 class="card-title" title="View post"> {{ post.title }} </h5>

									<p class="card-text" v-html="$options.filters.LimitText(post.body, 200)"> </p>
								</div>
							</router-link>
						</div>
					</div>
					<div v-else>
						There is currently no posts loaded.
					</div>
				</div>
			</div>
		</div>

    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';

export default {

	computed: {
		...mapState('posts', ['publishedBlogPosts']),
	},

	methods: {
		...mapActions('posts', ['setPublishedBlogPosts'])
	},

    async created() {
		await this.setPublishedBlogPosts();
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