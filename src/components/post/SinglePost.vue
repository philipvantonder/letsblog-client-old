<template>
    <div>
        <navbar />

		<div class="container">
			<div class="row pt-4">
				<div class="col-lg-12">

					<h1> {{ post.title }} </h1>
					
					<img :src="'http://localhost:4000/posts/image/' + post.user + '/' + post.fileName" alt="post image" class="img-fluid" > 	

					<p> {{ post.body }} </p>

				</div>
			</div>
		</div>
    </div>
</template>

<script>

    export default {

		data() {

			return {

				post: []

			}

		},

		created() {

			let id = this.$route.params.id

			let uri = `http://localhost:4000/posts/edit/${id}`;

			this.axios.get(uri).then((response) => {
				this.post = response.data;
			});


		}

    }

</script>