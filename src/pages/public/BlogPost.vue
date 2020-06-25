<template>
	<div v-if="!loading" class="container">
		<div v-if="blogPosts" class="row py-lg-5 py-4">
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

				<div class="mt-3">
					<button v-if="!showComment" class="btn btn-dark" @click="showCommentBox()"> Comment </button>
				</div>
					
			</div>

			<div class="container">
				<div class="row">
					<div class="col-lg-6">
						<div v-if="showComment" class="mt-3">
							<AddComment @hideCommentBox="hideCommentBox()" :postId="blogPosts.id" :userId="user.id" />
						</div>
					</div>
				</div>
			</div>

			<div class="container">
				<div class="row">
					<div class="col-lg-12">
						<div v-if="postComments.length > 0" class="mt-4">

							<div> <strong> Comments ({{ totalComments }}) </strong> </div>
							
							<ListComment v-for="(comment, index) in postComments" :key="index" :comment="comment" :blogPostId="blogPosts.id" @update-blog-post="updateBlogPost()" />
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>

	import { mapActions, mapState, mapGetters } from 'vuex';
	import AddComment from '@/components/AddComment';
	import ListComment from '@/components/ListComment';
	import Alert from '@/utilities/Alert';
	import { api_url } from '@/utilities/config/index';

    export default {

		data() {

			return {

				loading: true,
				showComment: false,
				api_url

			}
			
		},

		components: {
			AddComment,
			ListComment
		},

		computed: {
			...mapState('posts', ['blogPosts']),
			...mapState('user', ['user']),
			...mapState('comment', ['postComments', 'totalComments']),
			...mapGetters('user', ['isLoggedIn']),
		},

		methods: {
			...mapActions('posts', ['setBlogPostBySlug']),
			...mapActions('comment', ['setPostCommentsById', 'getUserCommentLikes']),

			showCommentBox() {

				if (!this.isLoggedIn) {

					Alert.message({
						icon: 'error',
						title: 'Comment Failed', 
						text: 'You need to be logged in to continue.',
						confirmBtnText: 'Login',
						redirect: '/login',
						confirmButton: true,
						cancelButton: true
					});

				} else {

					this.showComment = true;

				}

			},
			hideCommentBox() {
				this.showComment = false;
			},
			async updateBlogPost() {
				await this.setPostCommentsById(this.blogPosts.id);
			}
		},

		async created() {

			const { id } = this.$route.params;

			await this.setBlogPostBySlug(id);

			await this.setPostCommentsById(this.blogPosts.id);

			if (this.isLoggedIn) {
				await this.getUserCommentLikes();
			}

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