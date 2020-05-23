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

		const { data } = await axiosInstance.get('/user');

		return data;

	},

	async fetchBlogPost(id) {

		const { data } = await axiosInstance.get('/blogPost/' + id);

		return data;

	},

	async fetchBlogPostBySlug(slug) {

		const { data } = await axiosInstance.get('/slug/' + slug);

		return data;

	},

	async fetchPublishedBlogPosts() {
			
		const { data } = await axiosInstance.get('/publishedBlogs');

		return data;

	},

	async fetchPost(id) {

		const { data } = await axiosInstance.get('/post/' + id);

		return data;

	},

	async create(postDTO) {

		const { data } = await axiosInstance.post('/create', postDTO,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		);

		return data;

	},

	async delete (id) {

		const { data } = await axiosInstance.delete('/delete/' + id);

		return data;

	},

	async update (id, post) {

		const { data } = await axiosInstance.put('/update/' + id, post,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		);		

		return data;

	},

	async getImage (post) {

		const { data } = await axiosInstance.get('/image/' + post.user + '/' + post.fileName);

		return data;

	},

	async checkUnique(postDTO) {

		const { data } = await axiosInstance.post('/unique', postDTO);

		return data;

	}

}