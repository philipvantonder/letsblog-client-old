import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:4000/api/category' 
});

const token = (localStorage.getItem('token') !== null ? localStorage.getItem('token') : false);

if (token) {
	axiosInstance.defaults.headers.common['authorization'] = token;
}

export default {
	
	async checkUniqueCategory(postDTO) {

		const { data } = await axiosInstance.post('/uniqueCategory', postDTO);

		return data;

	},

	async getCategories (id = '') {

		const { data } = await axiosInstance.get('/categories/' + id);

		return data;

	},

	async createCategory (postDTO) {

		const { data } = await axiosInstance.post('/addCategory', postDTO);

		return data;

	},

	async removeCategory (id) {

		const { data } = await axiosInstance.post('/removeCategory', { id });

		return data;

	},

	async update (postDTO) {

		const { data } = await axiosInstance.post('/update', postDTO);

		return data;

	},

	async getCategoryBySlug (slug) {

		const { data } = await axiosInstance.get('/categoryBySlug/' + slug);

		return data;

	},

}
