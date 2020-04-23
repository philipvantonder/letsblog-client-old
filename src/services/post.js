import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api';

const token = (localStorage.getItem('token') !== null ? localStorage.getItem('token') : false);

if (token) {
	axios.defaults.headers.common['authorization'] = token;
}

export default {

	async fetchUserPosts() {

		try {

			const reponse = await axios.get('/posts/user');

			return reponse.data;

		} catch(error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	async fetchBlogPost(id) {

		try {

			const response = await axios.get('/posts/blogPost/' + id);

			return response.data;

		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	async fetchPublishedBlogPosts() {
			
		try {

			const response = await axios.get('/posts/publishedBlogs');

			return response.data;

		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	async fetchPost(id) {

		try {

			const response = await axios.get('/posts/post/' + id);

			return response.data;

		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	async create(data) {

		try {

			const reponse = await axios.post('/posts/create', data,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			);

			return reponse.data;

		} catch(error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	async delete (id) {

		try {

			const response = await axios.delete('/posts/delete/' + id);

			return response.data;

		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}
		
	},

	async update (id, post) {

		try {
		
			const response = await axios.put('/posts/update/' + id, post,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			);		

			return response.data;

		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	async getImage (post) {

		try {

			const response = await axios.get('/posts/image/' + post.user + '/' + post.fileName);

			return response.data;

		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	async checkUnique(postDTO) {

		try {
			
			const response = await axios.post('/posts/unique', postDTO);

			return response.data;

		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	}

}