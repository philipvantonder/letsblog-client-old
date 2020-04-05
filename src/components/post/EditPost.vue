<template>
    <div>
        <navbar />

		<div class="container">
			<div class="row pt-4">
				<div class="col-lg-12">

					<h1>Edit Post</h1>
					<form @submit.prevent="updatePost">
						<div class="form-group">
							<label>Post Title:</label>
							<input type="text" class="form-control" v-model="post.title">
						</div>

						<div class="form-group">
							<label>Post Body:</label>
							<textarea class="form-control" v-model="post.body" rows="5"></textarea>
						</div>

						<div class="form-group">
							<label> <input type="checkbox" v-model="post.isPublished" > Publish </label>
						</div>

						<div class="form-group">
							<button class="btn btn-outline-primary">Update</button>
							<router-link class="btn btn-outline-secondary ml-1" :to="{ name: 'posts' }"> Back </router-link>
						</div>
					</form>
				</div>
			</div>
		</div>
    </div>
</template>

<script>

export default {

    data() {

        return {

            post: {}

        }
        
    },

    created() {

        let uri = `http://localhost:4000/posts/edit/${this.$route.params.id}`;

        this.axios.get(uri).then((response) => {

			let { code, post } = response.data;

			if (code == 0) {
				this.post = post;
			}
			
        });

    },

    methods: {

        updatePost() {

            let uri = `http://localhost:4000/posts/update/${this.$route.params.id}`;

            this.axios.post(uri, this.post).then(() => {
                this.$router.push({name: 'posts'});
            });
            
        }
    }

}

</script>