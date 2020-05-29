import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:4000/api/comment'
});

const token = (localStorage.getItem('token') !== null ? localStorage.getItem('token') : false);

if (token) {
	axiosInstance.defaults.headers.common['authorization'] = token;
}

export default {

	async create (postDTO) {

		const { data } = await axiosInstance.post('/', postDTO);

		return data;

	},

	async getPostCommentsById (id) {

		const { data } = await axiosInstance.get('/' + id);

		return data;

	},

	async addreply (postDTO) {

		const { data } = await axiosInstance.post('/addReply', postDTO);

		return data;

	},

	async addLike(postDTO) {

		const { data } = await axiosInstance.post('/addLike', postDTO);

		return data;

	}

}