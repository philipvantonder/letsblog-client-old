<template>
    <div class="container">
		<div class="mx-auto shadow p-3 mt-5 radius-10 bg-white w-80">
			<div class="d-flex justify-content-center">
				<h2> Lets Blog </h2>
			</div>
			
			<div class="mt-4">
				<form @submit.prevent="signIn()">
					<div class="form-group">
						<label for="email" class="font-weight-bolder">Email address </label>
						<input type="email" class="form-control" :class="{ 'is-invalid': $v.user.email.$error }" v-model="user.email" >
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
</template>

<script>

import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

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

			email: { required },
			password: { required }

		}

	},

	methods: {

		...mapActions('user', ['login']),

		async signIn() {

			this.$v.$touch()
			if (this.$v.$invalid) {
				return;
			}

			let { code } = await this.login(this.user);

			if (code === 0) {

				this.$router.push({ name: 'feed' });

			}

		}

	}

}
</script>