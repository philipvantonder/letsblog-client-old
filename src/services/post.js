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

	}

}