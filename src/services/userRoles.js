import { getAxiosInstance } from '@/services/axios/index';

export default {
	
	async fetchUserRoles() {

		const { data } = await getAxiosInstance('/userRole').post('/');

		return data;

	},

}