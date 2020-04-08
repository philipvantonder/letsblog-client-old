import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

const token = (localStorage.getItem('token') !== null ? localStorage.getItem('token') : false);

if (token) {
	axios.defaults.headers.common['authorization'] = token;
}

export default {

	async fetchUserPosts() {

		try {

			const reponse = await axios.get('/posts/user');

			return reponse;

		} catch(error) {
			console.error(error);
		}

	},

	async fetchFeedPost(id) {

		try {

			const response = await axios.get('/posts/feedPost/' + id);

			return response;

		} catch (error) {
			console.log(error);
		}

	},

	async fetchPublishedPosts() {
			
		try {

			const reponse = await axios.get('/posts/published');

			return reponse;

		} catch (error) {
			console.error(error);
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

			return reponse;

		} catch(error) {
			console.error(error);
		}

	},

	async edit(id) {

		try {

			const response = await axios.get('/posts/edit/' + id);

			return response;

		} catch (error) {
			console.log(error);
		}

	},

	async delete (id) {

		try {

			const response = await axios.delete('/posts/delete/' + id);

			return response;

		} catch (error) {
			console.log(error);
		}
		
	},

	async getImage (post) {

		try {

			const response = await axios.get('/posts/image/' + post.user + '/' + post.fileName);

			return response;

		} catch (error) {
			console.log(error);
		}

	}

}