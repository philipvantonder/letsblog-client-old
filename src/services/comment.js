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

	async fetchPostComments (postDTO) {

		const { data } = await axiosInstance.get('/', postDTO);

		return data;

	}

}