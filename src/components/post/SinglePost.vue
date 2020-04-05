<template>
    <div>
        <navbar />

		<div v-if="post" class="container">
			<div class="row pt-4">
				<div class="col-lg-12">

					<h1> {{ post.title }} </h1>
					
					<img :src="'http://localhost:4000/posts/image/' + post.user + '/' + post.fileName" alt="post image" class="img-fluid" > 	

					<p class="text-break mt-3"> {{ post.body }} </p>

				</div>
			</div>
		</div>
    </div>
</template>

<script>

	import PostService from '@/services/post';

    export default {

		data() {

			return {

				post: false

			}

		},

		async created() {

			let id = this.$route.params.id;

			let response = await PostService.edit(id);

			let { code, post } = response.data;

			if (code === 0) {
				this.post = post;
			}

		}

    }

</script>