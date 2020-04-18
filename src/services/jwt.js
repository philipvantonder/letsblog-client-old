import jsonwebtoken from 'jsonwebtoken';

export default {

	async getUserBasicInfo(token) {

		try {
		
			let user = await jsonwebtoken.verify(token, process.env.VUE_APP_JWT_SECRET);

			return user;

		} catch (error) {
			console.error(error)
		}
	}

}