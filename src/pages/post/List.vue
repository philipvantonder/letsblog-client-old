<template>
	<div class="container-fluid px-4 pb-4">
				
		<div class="row py-2 no-gutters">
			<h1>Posts</h1>
		</div>

		<div class="row py-2">
			<div class="col-lg-12">
				<table v-if="userPosts.length" class="table table-borderless table-hover table-striped bg-white radius-10 shadow">
					<thead>
						<tr>
							<th>Title</th>
							<th>Body</th>
							<th>File</th>
							<th>Published</th>
							<th>Date Added</th>
							<th>Date last updated</th>
							<th colspan="2">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="post in userPosts" :key="post._id">
							<td>{{ post.title }}</td>
							<td>{{ post.body | LimitText(50) }}</td>
							<td><img class="img-thumbnail img-thumb" :src="'http://localhost:4000/api/posts/image/' + post.user + '/' + post.fileName" alt="post image" /></td>
							<td>{{ post.isPublished | BooleanText }}</td>
							<td>{{ post.createdAt | Date }}</td>
							<td>{{ post.updatedAt | Date }}</td>
							<td class="text-center" colspan="2">
								<router-link :to="{ name: 'edit-post', params: { id: post._id } }" class="btn btn-primary">Edit</router-link>
								<button class="ml-2 btn btn-danger" @click="deletePost(post._id)">Delete</button>
							</td>
						</tr>
					</tbody>
				</table>
				<p v-else> No posts loaded.</p>
			</div>
		</div>
	</div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
import Alert from '@/model/Alert';

export default {
	
	computed: {
		...mapState('posts', ['userPosts'])
	},

	methods: {
		
		...mapActions('posts', ['setUserPosts', 'removePost']),

		async deletePost(id) {
			
			let post_index = this.userPosts.map(post => post._id).indexOf(id);

			let post = this.userPosts[post_index];

			if (post.isPublished) {

				let response = await Alert.confirm({ title: "Cannot remove Published Post.", confirmButton: true, confirmButtonText: 'Unpublish Post', icon: 'error'});

				if (response) {
					this.$router.push({ name: 'edit-post', params: { id: id } })
				}

			} else {
	
				let response = await Alert.confirm({ title: "Are you sure you want to remove this post?" });

				if (response) {
					await this.removePost(id);
				}

			}

        }
	},
	
	async created() {

		await this.setUserPosts();

	},

}

</script>