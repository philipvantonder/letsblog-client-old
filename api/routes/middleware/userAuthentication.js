const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../../config/index');
const UserModel = require('../../models/user');

module.exports = {

	isLoggedIn: function(req, res, next) {

		const token = req.headers['authorization'];

		if (token) {

			jwt.verify(token, jwt_secret, (err, decoded) => {

				if (err) {
					
					res.status(200).send({
						code: 'INVALID_TOKEN',
						message: 'Invalid token'
					});
					
				}
				
				UserModel.findOne({ _id: decoded.userId })
				.then(user => {

					if (user) {
						next();
					} else {
						res.status(200).send({ 
							code: 1,
							message: 'Could not find user' 
						});
					}

				})
				.catch(() => res.status(200).send({ code: 1, message: 'Error retreiving user' }));

			})

		} else {

			res.status(200).send({
				code: 'EXPIRED_TOKEN',
				message: 'Token is expired'
			});

		}

	}

}
