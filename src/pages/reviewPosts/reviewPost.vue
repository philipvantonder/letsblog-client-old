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
								<img class="rounded-circle h-10 w-10 obj-fit" :src="'http://localhost:4000/api/users/image/' + blogPosts.authorId + '/' + blogPosts.authorPicture" />
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
						<img :src="'http://localhost:4000/api/posts/image/' + blogPosts.id" alt="post image" class="img-fluid w-100" > 	

						<div class="text-break mt-3" v-html="blogPosts.body"> </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import { mapActions, mapState } from 'vuex';

    export default {

		data() {

			return {
				loading: true
			}
			
		},

		computed: {
			...mapState('posts', ['blogPosts']),
		},

		methods: {
			...mapActions('posts', ['setBlogPostBySlug']),
		},

		async created() {

			const { id } = this.$route.params;

			await this.setBlogPostBySlug(id);

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