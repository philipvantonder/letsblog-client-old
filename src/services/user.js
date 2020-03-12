import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

const token = (localStorage.getItem('token') !== null ? localStorage.getItem('token') : false);

if (token) {
	axios.defaults.headers.common['authorization'] = token 
}

export default {

	signIn(user) {

		return new Promise((resolve, reject) => {

			axios.post('/users/login', user)
			.then(response => resolve(response))
			.catch(error => reject(error))

		})

	},

	register(user) {

		return new Promise((resolve, reject) => {
			
			axios.post('users/register', user)
			.then(response => resolve(response))
			.catch(error => reject(error))
		
		})

	},

	isAuthenticated() {

		return new Promise((resolve, reject) => {

			axios.get('users/isAuthenticated')
			.then(response => resolve(response))
			.catch(error => reject(error))

		})

	}

}