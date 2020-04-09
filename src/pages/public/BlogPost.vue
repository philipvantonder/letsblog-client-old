<template>
    <div>
        <navbar />

		<div v-if="publishedPost" class="container">
			<div class="row pt-4">
				<div class="col-lg-12">

					<h1> {{ publishedPost.title }} </h1>
					
					<img :src="'http://localhost:4000/posts/image/' + publishedPost.user + '/' + publishedPost.fileName" alt="post image" class="img-fluid" > 	

					<p class="text-break mt-3"> {{ publishedPost.body }} </p>

				</div>
			</div>
		</div>
    </div>
</template>

<script>

	import { mapActions, mapState } from 'vuex';

    export default {

		computed: {
			...mapState('posts', ['publishedPost'])
		},

		methods: {
			...mapActions('posts', ['setPublishedPost'])
		},

		async created() {
			await this.setPublishedPost(this.$route.params.id);
		}

    }

</script>