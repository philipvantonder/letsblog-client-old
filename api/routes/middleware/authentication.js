const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../../config/index');

const { InvalidPermissionError, EntityNotFoundError, InvalidTokenError } = require('../../utils/error-handling/custom-errors');

const UsersModel = require('../../models/users');
const UserRolesModel = require('../../models/userRoles');
const RolesModel = require('../../models/roles');

module.exports = {

	isLoggedIn: async function(req, res, next) {

		const token = req.headers['authorization'];

		if (!token) {

			try {
				throw new InvalidTokenError();
			} catch(err) {
				next(err);
			}

		}

		const verify = await jwt.verify(token, jwt_secret);

		if (!verify) {

			try {
				throw new InvalidTokenError();
			} catch(err) {
				next(err);
			}

		}

		const user = await UsersModel.findOne({ _id: verify.userId });

		if (!user) {

			try {
				throw new EntityNotFoundError('User', 'User not found.');
			} catch(err) {
				next(err);
			}
			
		} else {
			next();
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

		if (!userRole) {

			try {
				throw new InvalidPermissionError();
			} catch(err) {
				next(err);
			}

		} else {
			next();
		}
		
	} 

}