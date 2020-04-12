import jsonwebtoken from 'jsonwebtoken';

export default {

	async getUserInfo(token) {

		try {
		
			let user = await jsonwebtoken.verify(token, process.env.VUE_APP_JWT_SECRET);

			return { user };

		} catch (error) {
			console.error(error)
		}
	}

}