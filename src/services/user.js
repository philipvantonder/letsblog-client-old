import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:4000/api/users'
});

// axios.defaults.baseURL = 'http://localhost:4000/api/users';

const token = (localStorage.getItem('token') !== null ? localStorage.getItem('token') : false);

if (token) {
	axiosInstance.defaults.headers.common['authorization'] = token;
}

export default {

	async signIn(user) {

		try {
			
			const response = await axiosInstance.post('/login', user);

			return response;

		} catch(error) {
			console.error(error);
		}

	},

	async register(user) {

		try {

			const response = await axiosInstance.post('/register', user);

			return response.data;
			
		} catch(error) {
			console.error(error);
		}

	},

	async isAuthenticated() {

		try {

			const response = await axiosInstance.get('/isAuthenticated');

			return response;

		} catch(error) {
			console.error(error);
		}

	},

	async fetchUser() {

		try {
		
			const response = await axiosInstance.get('/getUser');

			return response.data;

		} catch (error) {
			console.error(error)
		}

	},

	async update(userDTO) {

		try {
		
			const response = await axiosInstance.post('/update', userDTO, 
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}

				}
			);

			return response.data;

		} catch (error) {
			console.error(error)
		}

	},

	async sendPasswordReset(userDTO) {

		try {

			const response = await axiosInstance.post('/sendPasswordReset', userDTO);

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

			const response = await axiosInstance.post('/changePassword', userDTO);

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