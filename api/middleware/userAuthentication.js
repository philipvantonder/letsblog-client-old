const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/index');
const User = require('../models/user');

module.exports = {

	isLoggedIn: function(req, res, next) {

		let token = req.headers['x-access-token'] || req.headers['authorization']

		if (token.startsWith('Bearer ')) {
			token = token.slice(7, token.length)
		}

		if (token) {

			jwt.verify(token, jwt_secret, (err, decoded) => {

				if (err) {
					
					res.status(200).send({
						code: 1,
						message: 'Invalid token'
					})
					
				}
				
				User.findOne({ _id: decoded.userId })
				.then(user => {

					if (user) {
						next()
					} else {
						res.status(200).send({ 
							code: 1, 
							message: 'Could not find user' 
						})
					}

				})
				.catch(() => res.status(200).send({ code: 1, message: 'Error retreiving user' }))

			})

		} else {

			res.status(200).send({
				code: 1,
				message: 'Token is expired'
			})

		}

	}

}
