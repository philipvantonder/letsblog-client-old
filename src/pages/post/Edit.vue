<template>
	<div v-if="!loading" class="container px-4 pb-4">

		<div class="row py-2 mt-2 no-gutters">
			<h1>Edit New Blog Post</h1>
		</div>

		<div class="row py-2">
			<div v-if="post" class="col-lg-12">
				<div class="shadow radius-10 p-5 bg-white">

					<div v-if="message" class="alert alert-warning" role="alert">
						{{ message }}
					</div>

					<form enctype="multipart/form-data"> 
						<div class="form-group">
							<input type="text" class="form-control" v-model="post.title" :class="{ 'is-invalid': $v.post.title.$error }" placeholder="Title">
						</div>

						<div class="form-group">
							<vue-editor v-model="post.body" ></vue-editor>
						</div>

						<div class="form-group">
							<img class="img-thumbnail img-thumb" :src="'http://localhost:4000/api/posts/image/' + post.user + '/' + post.fileName" alt="post image"/>
						</div>

						<div class="form-group">
							<input type="file" class="form-control" id="file" ref="file" @change="onSelect()" >
						</div>	

						<div class="form-group">
							<button class="btn btn-outline-primary" @click.prevent="savePost({ publish: false })"> Save </button>
							<button class="btn ml-1" :class="[post.isPublished ? 'btn-outline-danger' : 'btn-outline-success']" @click.prevent="savePost({ publish: true })"> {{ publisedText }} </button>
							<router-link class="btn btn-outline-secondary ml-1 float-right" :to="{ name: 'post-list' }"> Cancel </router-link>
						</div>

					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { required } from  'vuelidate/lib/validators';
import { mapActions, mapState } from 'vuex';

import { VueEditor } from "vue2-editor";
import Alert from '@/model/Alert'; 

export default {

	data() {

		return {

			loading: true,
			fileError: false,
			message: ''

		}

	},

	components: {
		VueEditor
	},

	computed: {
		...mapState('posts', ['post']),

		publisedText() {
			return this.post.isPublished ? 'Unpublish' : 'Publish';
		},
	},

    methods: {
		...mapActions('posts', ['setPost', 'updatePost']),

        async submitPost() {

			let formData = new FormData();
		
			formData.append('title', this.post.title);
			formData.append('body', this.post.body);
			formData.append('isPublished', this.post.isPublished);

			if (this.$refs.file.value) {
				formData.append('file', this.post.file)
				formData.append('fileName', this.post.file.name);
			}

			let { id } = this.$route.params;

			let response = await this.updatePost({ id, post: formData })

			if (response.code === 0) {
				this.$router.push({ name: 'post-list' });
			}

		},
		
        async savePost(data) {
			
			this.$v.$touch();
			if (this.$v.$invalid || this.fileError) {
				return;
			}

			if (data.publish) {

				let message = "Are you sure you want to Publish this post?";
				let tosts_message = "Post have been Published.";
				if (this.post.isPublished) {
					message = "Are you sure you want to Unpublish this post?";
					tosts_message = "Post have been Unpublish.";
				}

				const response = await Alert.confirm({ title: message });

				if (response) {

					this.post.isPublished = !this.post.isPublished;

					this.submitPost();

					Alert.toast({ title: tosts_message, customClass: 'mt-7' });
				}

			} else {

				this.submitPost();

				Alert.toast({ title: 'Post have been updated.', customClass: 'mt-7' });

			}
            
		},

		onSelect() {

			this.fileError = false;
			this.message = '';

			const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
			const file = this.$refs.file.files[0];

			if (!allowedTypes.includes(file.type)) {
				this.fileError = true;
				this.message = 'Only images are required';
			}

			if (file.size > 500000) {
				this.fileError = true;
				this.message = 'File is too large, max size is 500KB';
			}

			this.post.fileName = file.name;
			this.post.file = file;

		}

	},

	async created() {

		let { id } = this.$route.params;

		let response = await this.setPost(id);

		if (response.code === 0) {
			this.loading = false;
		}

	},
	
	validations: {

		post: {

			title: { required },
			body: { required },

		}
		
	}

}

</script>