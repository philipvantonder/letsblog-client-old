<template>
    <div class="container w-25 shadow p-3 mt-5 rounded">

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
                <button class="btn btn-outline-primary">Login</button>
                <router-link :to="{ name: 'register' }" class="btn btn-outline-secondary">Register</router-link>
            </div>
        </form>
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

		...mapActions('users', ['login']),

		async signIn() {

			this.$v.$touch()
			if (this.$v.$invalid) {
				return;
			}

			let response = await this.login(this.user);

			if (response.code == 0) {
				this.$router.push({ name: 'home' });
			}

		}

	}

}
</script>