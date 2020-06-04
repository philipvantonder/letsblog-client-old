import { getAxiosInstance } from '@/services/axios/index';

export default {

	async create(postDTO) {

		const { data } = await getAxiosInstance('/comment').post('/', postDTO);

		return data;

	},

	async fetchPostCommentsById(id) {

		const { data } = await getAxiosInstance('/comment').get('/postComment/' + id);

		return data;

	},

	async addreply(postDTO) {

		const { data } = await getAxiosInstance('/comment').post('/addReply', postDTO);

		return data;

	},

	async addLike(postDTO) {

		const { data } = await getAxiosInstance('/comment').post('/addLike', postDTO);

		return data;

	},

	async fetchUserCommentLikes() {

		const { data } = await getAxiosInstance('/comment').get('/userLikes');

		return data;

	}

}