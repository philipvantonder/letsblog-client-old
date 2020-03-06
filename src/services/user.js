import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

const token = (localStorage.getItem('token') !== null ? localStorage.getItem('token') : false);

if (token) {
	axios.defaults.headers.common['token'] = token 
}

export default {

	signIn(user) {

		return new Promise((resolve, reject) => {

			axios.post('/users/login', user)
			.then(response => resolve(response))
			.catch(error => reject(error))

		})

	}

}