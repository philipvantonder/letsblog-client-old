import { getAxiosInstance } from '@/services/axios/index';

export default {

	async create (postDTO) {

		const { data } = await getAxiosInstance('/comment').post('/', postDTO);

		return data;

	},

	async getPostCommentsById (id) {

		const { data } = await getAxiosInstance('/comment').get('/' + id);

		return data;

	},

	async addreply (postDTO) {

		const { data } = await getAxiosInstance('/comment').post('/addReply', postDTO);

		return data;

	},

	async addLike(postDTO) {

		const { data } = await getAxiosInstance('/comment').post('/addLike', postDTO);

		return data;

	}

}