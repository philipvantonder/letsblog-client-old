<template>
    <div>
        <navbar />

		<div class="container">
			<div class="row pt-4">
				<div class="col-lg-12">

					<h1>Create A Post</h1>

					<div v-if="message" class="alert alert-warning" role="alert">
						{{ message }}
					</div>

					<form @submit.prevent="addPost()" enctype="multipart/form-data">
						<div class="form-group">
							<label>Title:</label>
							<input type="text" class="form-control" v-model="post.title" :class="{ 'is-invalid': $v.post.title.$error }">
						</div>

						<div class="form-group">
							<label>Body:</label>
							<textarea class="form-control" v-model="post.body" rows="5" :class="{ 'is-invalid': $v.post.body.$error }"></textarea>
						</div>

						<div class="form-group">
							<label> <input type="checkbox" v-model="post.isPublished" > Publish </label>
						</div>

						<div class="form-group">
							<input type="file" class="form-control" id="file" ref="file" :class="{ 'is-invalid': $v.post.file.$error }" @change="onSelect()" >
						</div>	

						<div class="form-group">
							<button class="btn btn-outline-primary">Create</button>
						</div>
					</form>

				</div>
			</div>
		</div>
    </div>
</template>

<script>

	import { required } from 'vuelidate/lib/validators'
	import postService from '@/services/post'

    export default {

        data() {

            return {

				message: '',

				post: {}

            }

        },

        methods: {

            addPost() {

				this.$v.$touch()
				if (this.$v.$invalid) {
					return;
				}

				let formData = new FormData()
				formData.append('file', this.post.file)
				formData.append('title', this.post.title)
				formData.append('body', this.post.body)
				formData.append('isPublished', this.post.isPublished)
				formData.append('fileName', this.post.file.name)

               	postService.addNew(formData)
				.then(() => {

					this.$router.push({ name: 'posts' })
					
				})
				.catch(error => console.error(error))
				
			},
			
			onSelect() {

				this.message = ''

				const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
				const file = this.$refs.file.files[0];

				if (!allowedTypes.includes(file.type)) {
					this.message = 'Only images are required'
				}

				if (file.size > 500000) {
					this.message = 'Too large, max size is 500KB'
				}

				this.post.fileName = file.name
				this.post.file = file

			}

		},
		
		validations: {

			post: {

				title: { required },
				body: { required },
				file: { required },

			}

		}

    }

</script>