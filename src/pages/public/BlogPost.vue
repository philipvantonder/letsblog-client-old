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

			let { id } = this.$route.params;

			let response = await this.setBlogPostBySlug(id);

			if (response.code === 0) {
				this.loading = false;
			}

		}

    }

</script>

<style>

.language-php {
	background: #f5f2f0;
	padding: 1em;
    margin: .5em 0;
	overflow: auto;
	
}

</style>