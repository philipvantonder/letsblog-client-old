import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api';

const token = (localStorage.getItem('token') !== null ? localStorage.getItem('token') : false);

if (token) {
	axios.defaults.headers.common['authorization'] = token;
}

export default {

	async signIn(user) {

		try {
			
			const response = await axios.post('/users/login', user);

			return response;

		} catch(error) {
			console.error(error);
		}

	},

	async register(user) {

		try {

			const response = await axios.post('users/register', user);

			return response.data;
			
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

	},

	async fetchUser() {

		try {
		
			const response = await axios.get('users/getUser');

			return response.data;

		} catch (error) {
			console.error(error)
		}

	},

	async update(userDTO) {

		try {
		
			const response = await axios.post('users/update', userDTO);

			return response.data;

		} catch (error) {
			console.error(error)
		}

	},

	async sendPasswordReset(userDTO) {

		try {

			const response = await axios.post('users/sendPasswordReset', userDTO);

			return response.data;
			
		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	async changePassword(userDTO) {

		try {

			const response = await axios.post('users/changePassword', userDTO);

			return response.data;
			
		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	}

}