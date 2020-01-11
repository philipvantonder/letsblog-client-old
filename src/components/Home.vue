<template>
    <div>
        <navbar />

		<div class="container">
			<div class="row pt-4">
				<div class="col-md-12">
					
					<div class="card-deck">
						<div class="col-md-3 mb-4" v-for="post in posts" :key="post._id">

							<div class="card" >
								<img class="card-img-top" :src="'images/' + post.fileName" alt="Card image cap">

								<div class="card-body">
									<h5 class="card-title"> {{ post.title }}</h5>
									<p class="card-text"> {{ post.body }}</p>
								</div>

								<!-- <div class="card-footer">
									<small class="text-muted">Last updated 3 mins ago</small>
								</div> -->
							</div>

						</div>
					</div>

				</div>
			</div>
		</div>

    </div>
</template>

<script>

export default {

    data() {
        return {
            posts: []
        }
    },

    created() {

        let uri = 'http://localhost:4000/posts';

        this.axios.get(uri).then(response => {
            this.posts = response.data;
        });

    },

    methods: {
        
        deletePost(id) {

            let uri = `http://localhost:4000/posts/delete/${id}`;
            this.axios.delete(uri).then(() => {
                this.posts.splice(this.posts.indexOf(id), 1);
            });

        }
    }

}

</script>