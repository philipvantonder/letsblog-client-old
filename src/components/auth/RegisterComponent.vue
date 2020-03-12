<template>
    <div class="container w-50 shadow p-3 mt-5 rounded">

        <h2> Lets Blog </h2>

        <form @submit.prevent="registerUser()">
            
            <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': $v.user.name.$error }" v-model="user.name" >
            </div>

            <div class="form-group">
                <label for="surname">Surname</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': $v.user.surname.$error }" v-model="user.surname">
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" :class="{ 'is-invalid': $v.user.email.$error }" v-model="user.email">
                <div v-if="$v.user.email.$error" class="invalid-feedback">
                    <span v-if="!$v.user.email.email">Email is invalid</span>
                </div>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" :class="{ 'is-invalid': $v.user.password.$error }" v-model="user.password">
                <span v-if="!$v.user.password.minLength" >Password must have at least 6 letters.</span>
            </div>

            <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" class="form-control" :class="{ 'is-invalid': $v.user.confirmPassword.$error }" v-model="user.confirmPassword">
                <div v-if="$v.user.confirmPassword.$error" class="invalid-feedback">
                    <span v-if="!$v.user.confirmPassword.sameAsPassword">Passwords must match</span>
                </div>
            </div>

            <div class="d-flex justify-content-between">
                <button class="btn btn-outline-primary">Register</button>
                <router-link :to="{ name: 'login' }" class="btn btn-outline-secondary">Back to login</router-link>
            </div>
        </form>
    </div>
</template>

<script>

	import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
	import Alert from '@/model/Alert'
	import userService from '@/services/user'

    export default {

        data() {

            return {

                user: {
                    name: '',
                    surname: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }

            }

        },

        validations: {
            
            user: {
                
                name: { required },
                surname: { required },
                email: { required, email },
                password: { required, minLength: minLength(6) },
                confirmPassword: { required, sameAsPassword: sameAs('password') }

            }

        },

        methods: {

            registerUser() {

                this.$v.$touch()
                if (this.$v.$invalid) {
                    return;
				}

				userService.register(this.user)
				.then(response => {

					let { code, message } = response.data

					if (code === 0) {

						Alert.message({
							icon: 'success',
							title: 'Completed', 
							text: message,
							confirmBtnText: 'Login',
							redirect: '/login'
						})

					}

				})
				.catch(error => console.error(error))

            }

        }

    }

</script>