<template>
    <div class="container">
		<div class="mx-auto w-50 shadow p-3 mt-5 radius-10 bg-white">
			<h2 class="mb-3"> Forgot Password </h2>

			<form @submit.prevent="submitPassportReset()">
				<div class="form-group">
					<input type="email" class="form-control" :class="{ 'is-invalid': $v.user.email.$error }" v-model="user.email" placeholder="Email">
				</div>
				<div class="d-flex align-items-center">
					<button class="btn btn-outline-primary"> Send password reset email </button>
				</div>
			</form>
		</div>
    </div>
</template>

<script>

import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {

	data() {

		return {

			user: {
				email: '',
			}
			
		}

	},

	validations: {

		user: {

			email: { required, email },

		}

	},

	methods: {

		...mapActions('user', ['PasswordReset']),

		async submitPassportReset() {

			this.$v.$touch()
			if (this.$v.$invalid) {
				return;
			}

			let { code } = await this.PasswordReset(this.user);

			console.log(code);

			// if (code === 0) {
			// 	this.$router.push({ name: 'feed' });
			// }

		}

	}

}
</script>