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

		const response = await axiosInstance.post('/uniqueCategory', postDTO);

		return response.data;

	},

	async getCategories () {

		const response = await axiosInstance.get('/categories');

		return response.data;

	},

	async createCategory (postDTO) {

		const response = await axiosInstance.post('/addCategory', postDTO);

		return response.data;

	},

	async removeCategory (id) {

		const response = await axiosInstance.post('/removeCategory', { id });

		return response.data;

	},

	async getCategory (id) {

		const response = await axiosInstance.post('/category', { id });

		return response.data;

	},

	async update (postDTO) {

		const response = await axiosInstance.post('/update', postDTO);

		return response.data;

	},

	async getCategoryBySlug (slug) {

		const response = await axiosInstance.get('/categoryBySlug/' + slug );

		return response.data;

	},

}
