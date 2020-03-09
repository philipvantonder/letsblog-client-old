const jwt = require('jsonwebtoken')
const appSettings = require('../config/appSettings')
const User = require('../models/user')

module.exports = {

	isLoggedIn: function(req, res, next) {

		let token = req.headers['x-access-token'] || req.headers['authorization']

		if (token.startsWith('Bearer ')) {
			token = token.slice(7, token.length)
		}

		if (token) {

			jwt.verify(token, appSettings.jwt_secret, (err, decoded) => {

				if (err) {
					
					res.status(200).send({
						code: 1,
						message: 'Invalid token'
					})
					
				}
				
				User.findOne({ _id: decoded._id })
				.then(user => next())
				.catch(error => req.status(200).send({ code: 1, message: 'Could not find user' }))

			})

		} else {

			console.log('could not find token')

			res.status(200).send({
				code: 1,
				message: 'Token is expired'
			})

		}

	}

}
