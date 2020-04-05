const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { jwt_secret } = require('../../config/index');

function getUser(req) {

	return new Promise((resolve, reject) => {
		
		let token = req.headers['x-access-token'] || req.headers['authorization']
		
		if (token) {
			
			jwt.verify(token, jwt_secret, (err, decoded) => {
				
				if (err) { 
					reject(err) 
				}
				
				User.findOne({ _id: decoded.userId })
				.then(user => {
					return resolve(user)
				})
				.catch(err => {
					reject(err)
				})
				
			})
			
		}
		
	})
}
	
module.exports = {
	getUser
}