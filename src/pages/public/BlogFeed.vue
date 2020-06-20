<template>
	<div class="container">
		<div class="row pt-4">
			<div class="col-lg-12">
				<div v-if="blogPosts.length" class="card-deck">
					<div class="col-xs-12 col-sm-6 col-lg-4 mb-4 d-flex" v-for="post in blogPosts" :key="post.id">
						<router-link :to="{ name: 'blog-post', params: { 'id': post.slug } }" tag="div" class="card w-100 shadow border-0">
							<img class="card-img-top card-height" :src="'http://localhost:4000/api/posts/image/' + post.id" alt="Card image cap">

							<div class="card-body d-flex flex-column justify-content-between">
								<h5 class="card-title" title="View post"> {{ post.title }} </h5>

								<p class="card-text" v-html="LimitText(post.body, 80)"> </p>

								<div class="d-flex align-items-center">
									<div>
										<img class="rounded-circle h-10 w-10 obj-fit" :src="'http://localhost:4000/api/users/image/' + post.authorId + '/' + post.authorPicture" />
									</div>
									<div class="d-flex flex-column ml-2">
										<div>
											{{ post.author }} <br>
											{{ post.datePublished }}
										</div>
									</div>
								</div>

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
</template>

<script>

import { mapActions, mapState } from 'vuex';

import { LimitText } from '@/utilities/filters/index'; 

export default {

	computed: {
		...mapState('posts', ['blogPosts']),
	},

	methods: {
		LimitText,
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