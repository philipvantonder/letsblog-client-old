import { getAxiosInstance } from '@/services/axios/index';

export default {

	async signIn(user) {

		const { data } = await getAxiosInstance('/users').post('/login', user);

		return data;

	},

	async create(user) {

		const { data } = await getAxiosInstance('/users').post('/register', user);
		
		return data;	

	},

	async isAuthenticated() {

		const { data } = await getAxiosInstance('/users').get('/isAuthenticated');

		return data;

	},

	async fetchUser() {

		const { data } = await getAxiosInstance('/users').get('/getUser');

		return data;

	},

	async update(userDTO) {

		const { data } = await getAxiosInstance('/users').put('/update', userDTO, 
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}

			}
		);

		return data;

	},

	async sendPasswordReset(userDTO) {

		const { data } = await getAxiosInstance('/users').post('/sendPasswordReset', userDTO);

		return data;

	},

	async changePassword(userDTO) {

		const { data } = await getAxiosInstance('/users').post('/changePassword', userDTO);

		return data;

	}

}