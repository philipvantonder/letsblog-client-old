<template>
    <div>
        <navbar />

		<div class="container-fluid">
			<div class="row pt-4">
				<div class="col-lg-12">
					<h1>Posts</h1>

					<table class="table table-hover mt-4">
						<thead>
						<tr>
							<th>Title</th>
							<th>Body</th>
							<th>File</th>
							<th>Published</th>
							<th colspan="2">Actions</th>
						</tr>
						</thead>
						<tbody>
							<tr v-for="post in posts" :key="post._id">
								<td>{{ post.title }}</td>
								<td>{{ post.body | LimitText(50) }}</td>
								<td><img class="img-thumbnail img-thumb" :src="'http://localhost:4000/posts/image/' + post.user + '/' + post.fileName" alt="post image" /></td>
								<td>{{ post.isPublished | BooleanText }}</td>
								<td><router-link :to="{name: 'edit-post', params: { id: post._id }}" class="btn btn-primary">Edit</router-link></td>
								<td><button class="btn btn-danger" @click="deletePost(post._id)">Delete</button></td>
							</tr>
						</tbody>
					</table>
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
            posts: []
        }
    },

    async created() {

		let response = await PostService.fetchAll()

		let { code, posts } = response.data;

		if (code === 0) {
			this.posts = posts;
		}

    },

    methods: {
        
        async deletePost(id) {

			let response = await PostService.remove(id);

			let { code, posts } = response.data;

			if (code === 0) {
				this.posts = posts;
			}

        }
    }

}

</script>

<style scoped>

.img-thumb {
	max-width: 200px;
	max-height: 200px;
}

td {
    width:33%;
}

</style>