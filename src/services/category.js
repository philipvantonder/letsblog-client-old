import { getAxiosInstance } from '@/services/axios/index';

export default {
	
	async checkUniqueCategory(postDTO) {

		const { data } = await getAxiosInstance('/category').post('/uniqueCategory', postDTO);

		return data;

	},

	async getCategoryById(id) {

		const { data } = await getAxiosInstance('/category').get('/categories/' + id);

		return data;

	},

	async getCategories() {

		const { data } = await getAxiosInstance('/category').get('/categories');

		return data;

	},

	async createCategory(postDTO) {

		const { data } = await getAxiosInstance('/category').post('/addCategory', postDTO);

		return data;

	},

	async removeCategory(id) {

		const { data } = await getAxiosInstance('/category').post('/removeCategory', { id });

		return data;

	},

	async update(postDTO) {

		const { data } = await getAxiosInstance('/category').put('/update', postDTO);

		return data;

	},

	async getCategoryBySlug(slug) {

		const { data } = await getAxiosInstance('/category').get('/categoryBySlug/' + slug);

		return data;

	},

}
