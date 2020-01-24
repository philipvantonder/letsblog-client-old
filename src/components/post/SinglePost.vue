<template>
    <div>
        <navbar />

		<div class="container">
			<div class="row pt-4">
				<div class="col-lg-12">

					<h1> {{ post.fileName }} </h1>
					
					<img :src="'/images/' + post.fileName" alt="Card image cap" > 	

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