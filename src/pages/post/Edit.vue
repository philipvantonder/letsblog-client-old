<template>
	<div v-if="!loading" class="container-fluid px-4 pb-4">

		<div class="row py-2 mt-2 no-gutters">
			<h1>Edit post</h1>
		</div>

		<div class="row py-2 mb-5">
			<div v-if="blogPosts" class="col-lg-9">
				<div class="shadow radius-10 p-5 bg-white">

					<div v-if="blogPosts.reviewed && !blogPosts.isPublished" class="alert alert-success" role="alert">
						This Blog post is ready to be <b>Published</b>.
					</div>

					<div v-if="!blogPosts.reviewed" class="alert alert-warning" role="alert">
						This Blog post is currently being Reviewed before it can be published.
					</div>
					
					<div v-if="message" class="alert alert-warning" role="alert">
						{{ message }}
					</div>

					<form enctype="multipart/form-data"> 
						<div class="form-group">
							<input type="text" class="form-control" v-model="blogPosts.title" :class="{ 'is-invalid': $v.blogPosts.title.$error }" placeholder="Title">
						</div>

						<div class="form-group">
							<SlugWidget @slugChanged="updateSlug($event)" :url="api_url" :subdirectory="'/post/'" :title="slugTitle" :id="blogPosts._id" :type="'post'" />
						</div>

						<div class="form-group">
							<vue-editor v-model="blogPosts.body" ></vue-editor>
						</div>

						<div class="form-group">
							<img class="img-thumbnail img-thumb" :src="api_url + '/api/posts/image/' + blogPosts._id" alt="post image"/>
						</div>

						<div class="form-group">
							<div class="custom-file">
								<input type="file" class="custom-file-input" ref="file" @change="onSelect()" >
								<label class="custom-file-label" for="customFile"> {{ fileName }} </label>
							</div>
						</div>

						<div class="form-group">
							<select v-model="blogPosts.category" :class="{ 'is-invalid': $v.blogPosts.category.$error }" class="form-control">
								<option value=""> Choose a category </option>
								
								<template v-for="category in categories" >
									<optgroup v-if="category.subcategory.length > 0" :key="category.category.id" :label="category.category.name">
										<option v-for="(subcategory, index) in category.subcategory" :key="index" :value="subcategory.id"> {{ subcategory.name }} </option>
									</optgroup>
									<option v-else :key="category.category.name" :value="category.category.id" > {{ category.category.name }} </option>
								</template>
							</select>
						</div>

						<div class="form-group">
							<button class="btn btn-outline-primary" v-if="!blogPosts.isPublished && !blogPosts.inReview" @click.prevent="saveAsDraft()"> Save as Draft </button>
							<button class="btn ml-1" v-if="blogPosts.reviewed" :class="[blogPosts.isPublished ? 'btn-outline-danger' : 'btn-outline-success']" @click.prevent="publishPost()"> {{ publisedText }} </button>
							<button class="btn ml-1 btn-outline-danger" v-if="!blogPosts.reviewed && !blogPosts.inReview" @click.prevent="submitForReview()"> Submit for Review </button>
							<router-link class="btn btn-outline-secondary ml-1 float-right" :to="{ name: 'post-list' }"> Cancel </router-link>
						</div>

					</form>
				</div>
			</div>

			<div class="col-md-12 col-lg-3 mt-4 mt-lg-0">
				<div class="border-0 p-5 shadow radius-10 bg-white">
					<TagInput v-model="blogPosts.tags" :tagsArr="blogPosts.tags" />
				</div>
			</div>

		</div>

	</div>
</template>

<script>

import { required } from  'vuelidate/lib/validators';
import { mapActions, mapState } from 'vuex';

import { VueEditor } from "vue2-editor";
import Alert from '@/utilities/Alert'; 

import SlugWidget from '@/components/SlugWidget.vue';
import TagInput from '@/components/TagInput.vue';

import { api_url } from '@/utilities/config/index';

export default {

	data() {

		return {

			loading: true,
			fileError: false,
			message: '',
			fileName: '', // this property is use to show which new file you are uploading
			slugTitle: '',
			api_url
		}

	},

	watch: {
		'blogPosts.title': {
			handler(newVal) {
				this.slugTitle = newVal;
			}
		}

	},

	components: {
		VueEditor,
		SlugWidget,
		TagInput
	},

	computed: {
		...mapState('Posts', ['blogPosts']),
		...mapState('Category', ['categories']),
		publisedText() {
			return this.blogPosts.isPublished ? 'Unpublish' : 'Publish';
		},
		saveBtnText() {
			return this.blogPosts.isPublished ? 'Unpublish' : 'Publish';
		}
	},

    methods: {
		...mapActions('Posts', ['setPost', 'updatePost']),
		...mapActions('Category', ['setCategories']),
		...mapActions('UserRoles', ['getUserRoles']),

        async submitPost() {

			let formData = new FormData();
		
			formData.append('title', this.blogPosts.title);
			formData.append('body', this.blogPosts.body);
			formData.append('isPublished', this.blogPosts.isPublished);
			formData.append('category', this.blogPosts.category);
			formData.append('slug', this.blogPosts.slug);
			formData.append('tags', this.blogPosts.tags);

			formData.append('inReview', this.blogPosts.inReview);
			formData.append('reviewed', this.blogPosts.reviewed);

			if (this.$refs.file.value) {
				formData.append('file', this.blogPosts.file)
				formData.append('fileName', this.blogPosts.file.name);
			}

			let { id } = this.$route.params;

			await this.updatePost({ id, post: formData });

			this.$router.push({ name: 'post-list' });

		},

		async publishPost() {

			this.$v.$touch();
			if (this.$v.$invalid || this.fileError) {
				return;
			}

			let title = "Are you sure you want to Publish this post?";
			let toastMessage = "Post have been Published.";
			if (this.blogPosts.isPublished) {
				title = "Are you sure you want to Unpublish this post?";
				toastMessage = "Post have been Unpublish.";
			}

			const response = await Alert.confirm({ title });

			if (response) {

				this.blogPosts.isPublished = !this.blogPosts.isPublished;

				this.submitPost();

				Alert.toast({ title: toastMessage, customClass: 'mt-7' });

			}

		},

		async submitForReview() {

			this.$v.$touch();
			if (this.$v.$invalid || this.fileError) {
				return;
			}

			let title = "Are you sure you want to Submit this post for Review?";
			let toastMessage = "Post have been Submitted for Review.";

			const response = await Alert.confirm({ title });

			if (response) {
			
				this.blogPosts.reviewed = false;
				this.blogPosts.inReview = true;

				this.submitPost();

				Alert.toast({ title: toastMessage, customClass: 'mt-7' });

			}

		},

        async saveAsDraft() {

			this.$v.$touch();
			if (this.$v.$invalid || this.fileError) {
				return;
			}

			this.submitPost();

			Alert.toast({ title: 'Post have been updated.', customClass: 'mt-7' });

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

			this.fileName = file.name;
			this.blogPosts.fileName = file.name;
			this.blogPosts.file = file;

		},

		updateSlug(val) {
			this.blogPosts.slug = val;
		}

	},

	async created() {

		let { id } = this.$route.params;

		await this.setPost(id);

		this.loading = false;

		this.slugTitle = this.blogPosts.slug

		await this.setCategories();

		await this.getUserRoles();

	},
	
	validations: {

		blogPosts: {

			title: { required },
			body: { required },
			category: { required },

		}
		
	}

}

</script>