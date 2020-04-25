<template>
    <div class="container">
		<div class="mx-auto w-50 radius-10 p-3 mt-5 bg-white">
			<div class="d-flex justify-content-center">
				<h2> Create your account </h2>
			</div>

			<div class="mt-3">
				<form @submit.prevent="registerUser()">
					
					<div class="form-group">
						<label for="name" class="font-weight-bolder">Name</label>
						<input type="text" class="form-control" :class="{ 'is-invalid': $v.user.name.$error }" v-model="user.name" placeholder="Name" >
					</div>

					<div class="form-group">
						<label for="surname" class="font-weight-bolder">Surname</label>
						<input type="text" class="form-control" :class="{ 'is-invalid': $v.user.surname.$error }" v-model="user.surname" placeholder="Surname">
					</div>

					<div class="form-group">
						<label for="email" class="font-weight-bolder">Email</label>
						<input type="email" class="form-control" :class="{ 'is-invalid': $v.user.email.$error }" v-model="user.email" placeholder="Email">
						<div v-if="$v.user.email.$error" class="invalid-feedback">
							<span v-if="!$v.user.email.email">Email is invalid</span>
						</div>
					</div>
					
					<div class="form-group">
						<label for="password" class="font-weight-bolder">Password</label>
						<input type="password" class="form-control" :class="{ 'is-invalid': $v.user.password.$error }" v-model="user.password" placeholder="Password">
						<div class="invalid-feedback">
							<span v-if="!$v.user.password.minLength" >Password must have at least 6 letters.</span>
						</div>
					</div>

					<div class="form-group">
						<label for="confirmPassword" class="font-weight-bolder">Confirm Password</label>
						<input type="password" class="form-control" :class="{ 'is-invalid': $v.user.confirmPassword.$error }" v-model="user.confirmPassword" placeholder="Confirm Password">
						<div v-if="$v.user.confirmPassword.$error" class="invalid-feedback">
							<span v-if="!$v.user.confirmPassword.sameAsPassword">Passwords must match</span>
						</div>
					</div>

					<div class="d-flex align-items-center justify-content-between">
						<button class="btn btn-outline-primary">Register</button>
						<router-link :to="{ name: 'login' }" class="btn-link"> Back to login </router-link>
					</div>
				</form>
			</div>
		</div>
    </div>
</template>

<script>

	import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
	import Alert from '@/model/Alert';
	import UserService from '@/services/user';

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

            async registerUser() {

                this.$v.$touch()
                if (this.$v.$invalid) {
                    return;
				}

				let { code, message } = await UserService.register(this.user)

				if (code === 0) {

					Alert.message({
						text: message,
						confirmBtnText: 'Login',
						redirect: '/login',
						confirmButton: true
					});

				}

            }

        }

    }

</script>