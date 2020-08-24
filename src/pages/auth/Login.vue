<template>
    <div class="container">
		<div class="row">
			<div class="col-md-12 col-lg-4 mx-auto">
				<div class="mx-auto shadow p-3 mt-5 radius-10 bg-white">
					<div class="d-flex justify-content-center">
						<h2> Lets Blog </h2>
					</div>
					
					<div class="mt-4">
						<form @submit.prevent="signIn()" novalidate>
							<div class="form-group">
								<label for="email" class="font-weight-bolder">Email address </label>
								<input type="email" class="form-control" :class="{ 'is-invalid': $v.user.email.$error }" v-model="user.email" >
								<div v-if="$v.user.email.$error" class="invalid-feedback">
									<span v-if="!$v.user.email.email">Email is invalid</span>
								</div>
							</div>
							<div class="form-group">
								<label for="password" class="font-weight-bolder">Password</label>
								<input type="password" class="form-control" :class="{ 'is-invalid': $v.user.password.$error }" v-model="user.password" >
							</div>

							<div class="d-flex justify-content-between">
								<button class="btn btn-outline-primary w-100"> Sign In </button>
							</div>

							<div class="d-flex align-items-center justify-content-between pt-3">
								<router-link :to="{ name: 'forgot-password' }" class="btn-link"> Forgot Password </router-link>
								<router-link :to="{ name: 'register' }" tag="a" class="btn-link"> Sign Up </router-link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>

import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import Alert from '@/utilities/Alert';

export default {

	data() {

		return {

			message: false,

			user: {
				email: '',
				password: ''
			}
			
		}

	},

	validations: {

		user: {

			email: { required, email },
			password: { required }

		}

	},

	methods: {

		...mapActions('user', ['login', 'setUser']),

		async signIn() {

			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			try {

				await this.login(this.user);
				
				this.$router.push({ name: 'feed' });

			} catch (error) {

				if (error.response.data.message) {

					let message = error.response.data.message;

					Alert.message({
						icon: 'error',
						title: 'Login failed', 
						text: message,
						confirmBtnText: 'Try again',
						confirmButton: true
					});

				}

			}

		}

	}

}
</script>