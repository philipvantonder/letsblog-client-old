<template>
    <div>
        <navbar />

		<div class="container">
			<div class="row pt-4">
				<div class="col-md-12">
					<div v-if="posts.length" class="card-deck">
						<div class="col-md-4 mb-4 d-flex" v-for="post in posts" :key="post._id">
							<router-link :to="{ name: 'read-post', params: { 'id': post._id } }" tag="div" class="card shadow">
								<img class="card-img-top card-height" :src="'http://localhost:4000/posts/image/' + post.user + '/' + post.fileName" alt="Card image cap">

								<div class="card-body">
									<h5 class="card-title" title="View post"> {{ post.title }} </h5>

									<p class="card-text"> {{ post.body | LimitText(200) }}</p>
								</div>

								<div class="card-footer">
									<small class="text-muted">Date published: {{ post.dateAdded | Date }} </small>
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

import postService from '@/services/post';

export default {

    data() {

        return {

			posts: []
			
		}
		
    },

    created() {
		
		postService.fetchPublishedPosts()
		.then(response => {

			let { code, posts } = response.data;

			if (code === 0) {

				this.posts = posts;

			}
			
		})
		.catch(error => console.error(error));

    }

}

</script>

<style scoped>

.card-height {
	height: 200px;
}

.card {
	transition: transform 0.4s;
}

.card:hover {
	transform: translate(0, -5px);
	cursor: pointer;
}

</style>