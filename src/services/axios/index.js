
import axios from 'axios';

function getAxiosInstance(url) {

	const axiosInstance = axios.create({
		baseURL:  process.env.VUE_APP_API_URL + '/api' + url
	});
	
	const token = (localStorage.getItem('token') !== null ? localStorage.getItem('token') : false);

	if (token) {
		axiosInstance.defaults.headers.common['authorization'] = token;
	}

	return axiosInstance;

}

export { getAxiosInstance };