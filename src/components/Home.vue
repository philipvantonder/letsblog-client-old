<template>
    <div>
        <navbar />

		<div class="container">
			<div class="row pt-4">
				<div class="col-md-12">

					<div v-if="posts.length" class="card-deck">
						<div class="col-md-3 mb-4" v-for="post in posts" :key="post._id">

							<div class="card" >
								<img class="card-img-top" :src="'/images/' + post.fileName" alt="Card image cap">

								<div class="card-body">
									<h5 class="card-title" title="View post"> <router-link :to="{ name: 'single-post', params: { 'id': post._id } }"> {{ post.title }} </router-link> </h5>

									<p class="card-text"> {{ post.body }}</p>
								</div>

								<!-- <div class="card-footer">
									<small class="text-muted">Last updated 3 mins ago</small>
								</div> -->
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

import postService from '@/services/post'

export default {

    data() {

        return {

			posts: []
			
		}
		
    },

    created() {
		
		postService.fetchAll()
		.then(response => {

			this.posts = response.data

		})
		.catch(error => console.error(error))

    }

}

</script>