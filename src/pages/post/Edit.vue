<template>
    <div>
        <navbar />

		<div class="container">
			<div class="row pt-4">
				<div v-if="post" class="col-lg-12">
					<div class="shadow rounded p-5">
						<h1>Edit</h1>
						<form @submit.prevent="updatePost">
							<div class="form-group">
								<input type="text" class="form-control" v-model="post.title" placeholder="Title">
							</div>

							<div class="form-group">
								<textarea class="form-control" v-model="post.body" rows="5" placeholder="Body"></textarea>
							</div>

							<div class="form-group">
								<label> <input type="checkbox" v-model="post.isPublished" > Publish </label>
							</div>

							<div class="form-group">
								<img class="img-thumbnail img-thumb" :src="'http://localhost:4000/posts/image/' + post.user + '/' + post.fileName" alt="post image"/>
							</div>

							<div class="form-group">
								<input type="file" class="form-control" id="file" ref="file" @change="onSelect()" >
							</div>	

							<div class="form-group">
								<button class="btn btn-outline-primary"> Save </button>
								<router-link class="btn btn-outline-secondary ml-1 float-right" :to="{ name: 'post-list' }"> Cancel </router-link>
							</div>

						</form>
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

            post: false

        }
        
    },

    created() {

        let uri = `http://localhost:4000/posts/edit/${this.$route.params.id}`;

        this.$http.get(uri).then((response) => {

			let { code, post } = response.data;

			if (code === 0) {
				this.post = post;
			}
			
        });

    },

    methods: {

        updatePost() {

            let uri = `http://localhost:4000/posts/update/${this.$route.params.id}`;

            this.$http.post(uri, this.post).then(() => {
                this.$router.push({ name: 'post-list' });
            });
            
		},

		onSelect() {

			this.message = '';

			const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
			const file = this.$refs.file.files[0];

			if (!allowedTypes.includes(file.type)) {
				this.message = 'Only images are required';
			}

			if (file.size > 500000) {
				this.message = 'Too large, max size is 500KB';
			}

			this.post.fileName = file.name;
			this.post.file = file;

		}

	},

}

</script>

<style scoped>

.img-thumb {
	max-width: 200px;
	max-height: 200px;
}

</style>