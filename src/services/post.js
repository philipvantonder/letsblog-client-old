import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:4000/api/posts'
});

const token = (localStorage.getItem('token') !== null ? localStorage.getItem('token') : false);

if (token) {
	axiosInstance.defaults.headers.common['authorization'] = token;
}

export default {

	async fetchUserPosts() {

		const reponse = await axiosInstance.get('/user');

		return reponse.data;

	},

	async fetchBlogPost(id) {

		const response = await axiosInstance.get('/blogPost/' + id);

		return response.data;

	},

	async fetchBlogPostBySlug(slug) {

		const response = await axiosInstance.get('/slug/' + slug);

		return response.data;

	},

	async fetchPublishedBlogPosts() {
			
		const response = await axiosInstance.get('/publishedBlogs');

		return response.data;

	},

	async fetchPost(id) {

		const response = await axiosInstance.get('/post/' + id);

		return response.data;

	},

	async create(data) {

		const reponse = await axiosInstance.post('/create', data,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		);

		return reponse.data;

	},

	async delete (id) {

		const response = await axiosInstance.delete('/delete/' + id);

		return response.data;

	},

	async update (id, post) {

		const response = await axiosInstance.put('/update/' + id, post,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		);		

		return response.data;

	},

	async getImage (post) {

		const response = await axiosInstance.get('/image/' + post.user + '/' + post.fileName);

		return response.data;

	},

	async checkUnique(postDTO) {

		const response = await axiosInstance.post('/unique', postDTO);

		return response.data;

	},

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

	}

}