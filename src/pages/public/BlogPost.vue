<template>
	<div v-if="!loading" class="container">
		<div v-if="blogPost" class="row pt-4">
			<div class="col-lg-12">

				<h1> {{ blogPost.title }} </h1>
				
				<img :src="'http://localhost:4000/api/posts/image/' + blogPost._id" alt="post image" class="img-fluid w-100" > 	

				<div class="text-break mt-3" v-html="blogPost.body"> </div>
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
			...mapState('posts', ['blogPost'])
		},

		methods: {
			...mapActions('posts', ['setBlogPostBySlug'])
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