<template>
	<div class="container-fluid px-4 pb-4">
				
		<div class="row py-2 no-gutters">
			<h1>My Posts</h1>
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
							<th>Reviewed</th>
							<th>Date Added</th>
							<th>Date last updated</th>
							<th colspan="2">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="post in userPosts" :key="post._id">
							<td>{{ post.title }}</td>
							<td>{{ LimitText(post.body, 50) }}</td>
							<td><img class="img-thumbnail img-thumb" :src="'http://localhost:4000/api/posts/image/' + post._id" alt="post image" /></td>
							<td>{{ BooleanText(post.isPublished) }}</td>
							<td>{{ BooleanText(post.reviewed) }}</td>
							<td>{{ FormatDate(post.createdAt) }}</td>
							<td>{{ FormatDate(post.updatedAt) }}</td>
							<td class="text-center" colspan="2">
								<router-link :to="{ name: 'edit-post', params: { id: post._id } }" class="btn btn-primary">Edit</router-link>
								<button class="ml-2 btn btn-danger" @click="deletePost(post._id)">Delete</button>
							</td>
						</tr>
					</tbody>
				</table>
				<div v-else>
					<p> No posts. <router-link tag="a" :to="{ name: 'add-post' }"> Create first Post </router-link> </p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
import Alert from '@/utilities/Alert';

import { BooleanText, LimitText, FormatDate } from '@/utilities/filters/index';

export default {
	
	computed: {
		...mapState('posts', ['userPosts'])
	},

	methods: {
		
		BooleanText,
		LimitText,
		FormatDate,

		...mapActions('posts', ['setUserPosts', 'removePost']),

		async deletePost(id) {
			
			const post_index = this.userPosts.map(post => post._id).indexOf(id);

			const post = this.userPosts[post_index];

			if (post.isPublished) {

				await Alert.confirm({ title: "Cannot remove Published Post.", confirmButton: true, confirmButtonText: 'Unpublish Post', icon: 'error'});

				this.$router.push({ name: 'edit-post', params: { id: id } });

			} else {
	
				await Alert.confirm({ title: "Are you sure you want to remove this post?" });

				await this.removePost(id);

				Alert.toast({ title: 'Post have been removed.', customClass: 'mt-7' });

			}

        }
	},
	
	async created() {

		await this.setUserPosts();

	},

}

</script>