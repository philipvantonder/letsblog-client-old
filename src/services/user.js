import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

const token = (localStorage.getItem('token') !== null ? localStorage.getItem('token') : false);

if (token) {
	axios.defaults.headers.common['authorization'] = token;
}

export default {

	async signIn(user) {

		try {
			const response  = await axios.post('/users/login', user);

			return response;

		} catch(error) {
			console.error(error);
		}

	},

	async register(user) {

		try {
			const response = await axios.post('users/register', user);

			return response;
			
		} catch(error) {
			console.error(error);
		}

	},

	async isAuthenticated() {

		try {
			const response = await axios.get('users/isAuthenticated');

			return response;

		} catch(error) {
			console.error(error);
		}

	}

}