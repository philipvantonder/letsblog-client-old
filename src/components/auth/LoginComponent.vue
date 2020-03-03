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

import { required } from 'vuelidate/lib/validators'
import Alert from '@/model/Alert'

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

		signIn() {

			this.$v.$touch()
			if (this.$v.$invalid) {
				return;
			}

			let uri = 'http://localhost:4000/users/login'

			this.axios.post(uri, this.user)
			.then(response => {

				let { code, message, token } = response.data;

				if (code == 1) {

					Alert.message({
						icon: 'error',
						title: 'Login failed', 
						text: message,
						confirmBtnText: 'Try again',
					})

				}

				if (code == 0) {

					localStorage.setItem('token', token)

					this.$router.push({ name: 'home' })

				}

			})
			.catch(error => console.log(error))

		}

	}

}
</script>