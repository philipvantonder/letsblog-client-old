<template>
	<div v-if="!loading" class="container">
		<div v-if="blogPosts" class="row py-4">
			<div class="col-lg-12">
				<div class="shadow radius-10 bg-white">
					<div class="d-flex align-items-center justify-content-between px-5 py-4">
						<div>
							<h1> {{ blogPosts.title }} </h1>
						</div>
						<div class="d-flex align-items-center">
							<div>
								<img class="rounded-circle h-10 w-10 obj-fit" :src="api_url + '/api/users/image/' + blogPosts.authorId + '/' + blogPosts.authorPicture" />
							</div>
							<div class="d-flex flex-column ml-2">
								<div>
									{{ blogPosts.author }} <br>
									{{ blogPosts.datePublished }}
								</div>
							</div>
						</div>
					</div>
					
					<div class="px-5 pb-4">
						<img :src="api_url + '/api/posts/image/' + blogPosts.id" alt="post image" class="img-fluid w-100" > 	

						<div class="text-break mt-3" v-html="blogPosts.body"> </div>
					</div>
				</div>
			</div>
		</div>

		<div class="row pb-lg-5">
			<div class="col-lg-12">
				<div class="d-flex justify-content-between align-items-center">
					<button v-if="isModerator" class="btn ml-1" :class="[blogPosts.reviewed ? 'btn-outline-danger' : 'btn-outline-dark']" @click.prevent="approveReview()" > {{ reviewedText }} </button>
					<router-link tag="button" :to="{ name: 'review-posts' }" class="btn btn-secondary ml-1" > Cancel </router-link>
				</div>
			</div>
		</div>

	</div>
</template>

<script>

	import { mapActions, mapState, mapGetters } from 'vuex';
	import Alert from '@/utilities/Alert';
	import { api_url } from '@/utilities/config/index';

    export default {

		data() {

			return {
				loading: true,
				api_url
			}
			
		},

		computed: {
			...mapState('Posts', ['blogPosts']),
			...mapGetters('UserRoles', ['isModerator']),
			reviewedText() {
				return this.blogPosts.reviewed ? 'Reject Review' : 'Approve Review';
			},
		},

		methods: {
			...mapActions('Posts', ['setReviewBlogPostBySlug', 'updateReview']),

			async approveReview() {

				let title = "Are you sure you want to Approve this post?";
				let toastMessage = "Post have been Approved.";
				if (this.blogPosts.reviewed) {
					title = "Are you sure you want to Reject this post?";
					toastMessage = "Post have been Rejected.";
				}

				const response = await Alert.confirm({ title });

				if (response) {

					await this.updateReview({ id: this.blogPosts.id, review: !this.blogPosts.reviewed });

					Alert.toast({ title: toastMessage, customClass: 'mt-7' });

					const { id } = this.$route.params;

					await this.setReviewBlogPostBySlug(id);

					this.$router.push({ name: 'review-posts' });

				}

			},

		},

		async created() {

			const { id } = this.$route.params;

			await this.setReviewBlogPostBySlug(id);

			this.loading = false;

		}

    }

</script>

<style>

.ql-syntax {
	background-color: #23241f;
	color: #f8f8f2;
	padding: 5px 10px;
	border-radius: 3px;
}

p > img {
	width: 100%;
}

</style>