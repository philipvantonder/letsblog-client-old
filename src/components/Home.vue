<template>
    <div>
        <navbar />

		<div class="container">
			<div class="row pt-4">
				<div class="col-md-12">

					<div v-if="posts.length" class="card-deck">
						<div class="col-md-4 mb-4" v-for="post in posts" :key="post._id">

							<div class="card" >
								<img class="card-img-top" :src="'http://localhost:4000/posts/image/' + post.user + '/' + post.fileName" alt="Card image cap">

								<div class="card-body">
									<h5 class="card-title" title="View post"> <router-link :to="{ name: 'single-post', params: { 'id': post._id } }"> {{ post.title }} </router-link> </h5>

									<p class="card-text"> {{ post.body | LimitText(200) }}</p>
								</div>

								<div class="card-footer">
									<small class="text-muted">Date published: {{ post.dateAdded | Date }} </small>
								</div>
							</div>

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
		
		postService.fetchAllPublished()
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