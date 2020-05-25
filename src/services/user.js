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

		const { data } = await axiosInstance.post('/login', user);

		return data;

	},

	async create(user) {

		const { data } = await axiosInstance.post('/register', user);
		
		return data;	

	},

	async isAuthenticated() {

		const { data } = await axiosInstance.get('/isAuthenticated');

		return data;

	},

	async fetchUser() {

		const { data } = await axiosInstance.get('/getUser');

		return data;

	},

	async update(userDTO) {

		const { data } = await axiosInstance.put('/update', userDTO, 
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}

			}
		);

		return data;

	},

	async sendPasswordReset(userDTO) {

		const { data } = await axiosInstance.post('/sendPasswordReset', userDTO);

		return data;

	},

	async changePassword(userDTO) {

		const { data } = await axiosInstance.post('/changePassword', userDTO);

		return data;

	}

}