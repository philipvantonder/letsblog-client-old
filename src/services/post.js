import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

const token = (localStorage.getItem('token') !== null ? localStorage.getItem('token') : false)

if (token) {
	axios.defaults.headers.common['authorization'] = token
}

export default {

	fetchAll() {

		return new Promise((resolve, reject) => {
			
			axios.get('/posts')
			.then(response => resolve(response))
			.catch(error => reject(error))

		})

	},

	fetchAllPublished() {

		return new Promise((resolve, reject) => {
			
			axios.get('/posts/published')
			.then(response => resolve(response))
			.catch(error => reject(error))

		})

	},

	addNew(data) {

		return new Promise((resolve, reject) => {

			axios.post('/posts/add', data,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			)
			.then(response => resolve(response))
			.catch(error => reject(error))

		})

	}

}