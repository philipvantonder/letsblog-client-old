import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api';

const token = (localStorage.getItem('token') !== null ? localStorage.getItem('token') : false);

if (token) {
	axios.defaults.headers.common['authorization'] = token;
}

export default {

	async fetchUserPosts() {

		const reponse = await axios.get('/posts/user');

		return reponse.data;

	},

	async fetchBlogPost(id) {

		const response = await axios.get('/posts/blogPost/' + id);

		return response.data;

	},

	async fetchBlogPostBySlug(slug) {

		const response = await axios.get('/posts/slug/' + slug);

		return response.data;

	},

	async fetchPublishedBlogPosts() {
			
		const response = await axios.get('/posts/publishedBlogs');

		return response.data;

	},

	async fetchPost(id) {

		const response = await axios.get('/posts/post/' + id);

		return response.data;

	},

	async create(data) {

		const reponse = await axios.post('/posts/create', data,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		);

		return reponse.data;

	},

	async delete (id) {

		const response = await axios.delete('/posts/delete/' + id);

		return response.data;

	},

	async update (id, post) {

		const response = await axios.put('/posts/update/' + id, post,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		);		

		return response.data;

	},

	async getImage (post) {

		const response = await axios.get('/posts/image/' + post.user + '/' + post.fileName);

		return response.data;

	},

	async checkUnique(postDTO) {

		const response = await axios.post('/posts/unique', postDTO);

		return response.data;

	}

}