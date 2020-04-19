<template>
    <div class="container">
		<div class="mx-auto w-50 shadow p-3 mt-5 radius-10 bg-white">
			<h2> Lets Blog </h2>

			<form @submit.prevent="signIn()">
				<div class="form-group">
					<label for="exampleInputEmail1">Email</label>
					<input type="email" class="form-control" :class="{ 'is-invalid': $v.user.email.$error }" v-model="user.email" >
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Password</label>
					<input type="password" class="form-control" :class="{ 'is-invalid': $v.user.password.$error }" v-model="user.password" >
				</div>

				<div class="d-flex justify-content-between">
					<button class="btn btn-outline-primary"> Login </button>

					<div class="d-flex align-items-center">
						<router-link :to="{ name: 'forgot-password' }" class="btn btn-link"> Forgot Password </router-link>
						<router-link :to="{ name: 'register' }" tag="a" class="btn btn-outline-secondary ml-2"> Register </router-link>
					</div>
				</div>
			</form>
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