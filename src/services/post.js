import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

const token = (localStorage.getItem('token') !== null ? localStorage.getItem('token') : false);

if (token) {
	axios.defaults.headers.common['authorization'] = token;
}

export default {

	async fetchAll() {

		try {
			const reponse = await axios.get('/posts');

			return reponse;

		} catch(error) {
			console.error(error);
		}

	},

	async fetchAllPublished() {
			
		try {
			const reponse = await axios.get('/posts/published');

			return reponse;
		} catch (error) {
			console.error(error);
		}

	},

	async addNew(data) {

		try {

			const reponse = await axios.post('/posts/add', data,
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

	}

}