<template>
	<div class="container px-4 pb-4">
		<div class="row py-4">
			<div class="col-lg-12"> 
				<div class="shadow rounded bg-white d-flex flex-column p-5">
					<form @submit.prevent="submitForm()"> 

						<div class="form-group">
							<input type="text" class="form-control" v-model="user.name" :class="{ 'is-invalid' : $v.user.name.$error }" placeholder="Name">
						</div>

						<div class="form-group">
							<input type="text" class="form-control" v-model="user.surname" :class="{ 'is-invalid' : $v.user.surname.$error }" placeholder="Surname">
						</div>

						<div class="form-group">
							<input type="text" class="form-control" v-model="user.email" :class="{ 'is-invalid' : $v.user.email.$error }" placeholder="Email">
						</div>

						<div class="form-group">
							<input type="text" class="form-control" v-model="user.cellnumber" :class="{ 'is-invalid' : $v.user.cellnumber.$error }" placeholder="Cell number">
						</div>

						<div class="form-group">
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
			
		}

	},

	computed: {
		...mapState('user', ['user']),
	},

	methods: {
	
		...mapActions('user', ['setUser', 'updateUser']),

		async submitForm() {

			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			let { code } = await this.updateUser(this.user);

			if (code === 0) {

				this.$router.push({ name: 'profile' });

				Alert.toast({ title: 'User details have been updated', customClass: 'mt-7' });

			}

		}

	},

	created() {

		this.setUser();

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
