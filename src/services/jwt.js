import jsonwebtoken from 'jsonwebtoken';

export default {

	async getUserBasicInfo(token) {

		let user = await jsonwebtoken.verify(token, process.env.VUE_APP_JWT_SECRET);

		return user;
		
	}

}