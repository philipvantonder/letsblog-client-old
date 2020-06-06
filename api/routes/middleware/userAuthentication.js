const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../../config/index');

const { InvalidPermissionError, EntityNotFoundError } = require('../../utils/error-handling/custom-errors');

const UsersModel = require('../../models/users');
const UserRolesModel = require('../../models/userRoles');
const RolesModel = require('../../models/roles');

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
				
				UsersModel.findOne({ _id: decoded.userId })
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

			});

		} else {

			res.status(200).send({
				code: 'EXPIRED_TOKEN',
				message: 'Token is expired'
			});

		}

	},

	isModerator: async (req, res, next) => {

		const token = req.headers['authorization'];

		const verify = await jwt.verify(token, jwt_secret);

		const user = await UsersModel.findOne({ _id: verify.userId });

		if (!user) {
			throw new EntityNotFoundError('User', 'User not found.');
		}

		const roles = await RolesModel.findOne({ name: "Moderator" });

		const userRole = await UserRolesModel.findOne({ user: user._id, role: roles._id });

		if (userRole) {
			throw new InvalidPermissionError();
		} else {
			next();
		}

	} 

}