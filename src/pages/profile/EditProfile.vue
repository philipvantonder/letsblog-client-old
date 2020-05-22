<template>
	<div v-if="!loading" class="container px-4 pb-4">

		<div class="row no-gutters">
			<div class="d-flex justify-content-center py-4">
				<h3 data-v-f5c15bd4="">Update Profile</h3>
			</div>
		</div>

		<div class="row">

			<div class="col-lg-4">
				<div class="shadow rounded bg-white d-flex flex-column p-5 mb-2 mb-lg-0">

					<div v-if="message" class="alert alert-warning" role="alert">
						{{ message }}
					</div>

					<div class="d-flex justify-content-center">
						<img class="rounded-circle obj-fit h-20 w-20" :src="'http://localhost:4000/api/users/image/' + user._id + '/' + user.profileImage" />
					</div>

					<div v-show="changeProfilePicture" class="mt-3">
						<div class="form-group">
							<div class="custom-file">
								<input type="file" class="custom-file-input" ref="file" @change="onSelect()" >
								<label class="custom-file-label" for="customFile">{{ user.fileName }} </label>
							</div>
						</div>
					</div>

					<div class="d-flex justify-content-center mt-3">
						<button class="btn btn-outline-secondary btn-sm" @click="changeProfilePicture = !changeProfilePicture">  {{ changeProfileText }} </button>
					</div>

				</div>
			</div>

			<div class="col-lg-8">
				<div class="shadow rounded bg-white d-flex flex-column p-5">
					<form @submit.prevent="submitForm()"> 

						<div class="form-group">
							<label for="name" class="font-weight-bolder"> Name </label>
							<input type="text" class="form-control" v-model="user.name" :class="{ 'is-invalid' : $v.user.name.$error }" placeholder="Name">
						</div>

						<div class="form-group">
							<label for="name" class="font-weight-bolder"> Surname </label>
							<input type="text" class="form-control" v-model="user.surname" :class="{ 'is-invalid' : $v.user.surname.$error }" placeholder="Surname">
						</div>

						<div class="form-group">
							<label for="name" class="font-weight-bolder"> Email </label>
							<input type="text" class="form-control" v-model="user.email" :class="{ 'is-invalid' : $v.user.email.$error }" placeholder="Email">
						</div>

						<div class="form-group">
							<label for="name" class="font-weight-bolder"> Cell number </label>
							<input type="text" class="form-control" v-model="user.cellnumber" :class="{ 'is-invalid' : $v.user.cellnumber.$error }" placeholder="Cell number">
						</div>

						<div class="form-group">
							<label for="name" class="font-weight-bolder"> Bio </label>
							<textarea class="form-control" v-model="user.bio" :class="{ 'is-invalid' : $v.user.bio.$error }" placeholder="Bio" rows="3"> </textarea>
						</div>

						<div class="form-group">
							<button class="btn btn-outline-primary"> Update </button>
							<router-link class="btn btn-outline-secondary ml-1 float-right" tag="a" :to="{ name: 'profile' }"> Back </router-link>
						</div>

					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { required } from 'vuelidate/lib/validators';
import { mapActions, mapState } from 'vuex';
import Alert from '@/model/Alert';

export default {

	data() {

		return {
			
			loading: true,
			changeProfilePicture: false,
			message: false

		}

	},

	computed: {
		...mapState('user', ['user']),

		changeProfileText() {
			return (this.changeProfilePicture ? 'Cancel' : 'Change Profile Picture');
		}
	},

	methods: {
	
		...mapActions('user', ['setUser', 'updateUser']),

		async submitForm() {

			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			let formData = new FormData();
			formData.append('name', this.user.name);
			formData.append('surname', this.user.surname);
			formData.append('email', this.user.email);
			formData.append('cellnumber', this.user.cellnumber);
			formData.append('bio', this.user.bio);

			if (this.$refs.file.value) {
				formData.append('file', this.user.file)
				formData.append('fileName', this.user.file.name);
			}

			await this.updateUser(formData);

			this.$router.push({ name: 'profile' });

			Alert.toast({ title: 'User details have been updated', customClass: 'mt-7' });

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

			this.user.fileName = file.name;
			this.user.file = file;

		}


	},

	async created() {

		await this.setUser();

		this.loading = false;

	},

	validations: {

		user: {
			
			name: { required },
			surname: { required },
			email: { required },
			cellnumber: { required },
			bio: { required },

		}

	}

}

</script>
