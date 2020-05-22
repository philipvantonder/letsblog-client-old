import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:4000/api/users'
});

const token = (localStorage.getItem('token') !== null ? localStorage.getItem('token') : false);

if (token) {
	axiosInstance.defaults.headers.common['authorization'] = token;
}

export default {

	async signIn(user) {

		const response = await axiosInstance.post('/login', user);

		return response.data;

	},

	async register(user) {

		const response = await axiosInstance.post('/register', user);
		
		return response.data;	

	},

	async isAuthenticated() {

		const response = await axiosInstance.get('/isAuthenticated');

		return response;

	},

	async fetchUser() {

		const response = await axiosInstance.get('/getUser');

		return response.data;

	},

	async update(userDTO) {

		const response = await axiosInstance.post('/update', userDTO, 
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}

			}
		);

		return response.data;

	},

	async sendPasswordReset(userDTO) {

		const response = await axiosInstance.post('/sendPasswordReset', userDTO);

		return response.data;

	},

	async changePassword(userDTO) {

		const response = await axiosInstance.post('/changePassword', userDTO);

		return response.data;

	}

}