<template>
	<div class="container">
		<div class="row pt-4">
			<div class="col-lg-12">
				<div v-if="blogPosts.length" class="card-deck">
					<div class="col-xs-12 col-sm-6 col-lg-4 mb-4 d-flex" v-for="post in blogPosts" :key="post.id">
						<router-link :to="{ name: 'review-post', params: { 'id': post.slug } }" tag="div" :class="getReviewState(post.reviewed)" class="card w-100 shadow border-0">
							<img class="card-img-top card-height" :src="api_url + '/api/posts/image/' + post.id" alt="Card image cap">

							<div class="card-body d-flex flex-column justify-content-between">
								<h5 class="card-title" title="View post"> {{ post.title }} </h5>

								<p class="card-text" v-html="LimitText(post.body, 80)"> </p>

								<div class="d-flex align-items-center justify-content-between">
									<div class="d-flex align-items-center">
										<div>
											<img class="rounded-circle h-10 w-10 obj-fit" :src="api_url + '/api/users/image/' + post.authorId + '/' + post.authorPicture" />
										</div>
										<div class="d-flex flex-column ml-2">
											<div>
												{{ post.author }} <br>
												{{ post.datePublished }}
											</div>
										</div>
									</div>
									<div>
										<span v-if="post.reviewed">
											<font-awesome-layers full-width class="fa-fw fa-1x text-success"> <font-awesome-icon icon="check" /> </font-awesome-layers>
											Reviewed
										</span>
										<span v-else>
											<font-awesome-layers full-width class="fa-fw fa-1x text-danger"> <font-awesome-icon icon="times" /> </font-awesome-layers>
											Reviewed
										</span>
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
import { api_url } from '@/utilities/config/index';

export default {
	
	name: 'post-review',

	data() {

		return {
			api_url
		}

	},

	computed: {
		...mapState('posts', ['blogPosts']),
	},

	methods: {
		...mapActions('posts', ['setPostsforReview']),

		LimitText,

		getReviewState(review) {
			return review ? 'approve-border' : 'not-approve-border';
		}
	},

	async created() {
		await this.setPostsforReview();
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

.approve-border {
	border: 4px solid green !important;
}

.not-approve-border {
	border: 4px solid red !important;
}

</style>