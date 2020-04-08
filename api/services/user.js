const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/index');

module.exports = {

	isAuthenticated: async (token) => {

		try {
	
			let verify = await jwt.verify(token, jwt_secret);

			let user = await UserModel.findOne({ _id: verify.userId });

			if (!user) {
				return { code: 1, message: 'User not found' };
			}

			return { code: 0, message: 'User is logged in' }
		
		} catch (error) {
			return { code: 1, message: 'Token is invalid' };
		}

	},

	createUser: async (user) => {

		try {

			user.password = await bcrypt.hash(user.password, 10);

			let User = new UserModel({
				'name': user.name,
				'surname': user.surname,
				'email': user.email,
				'password': user.password
			});

			await User.save();

			return { code: 0, message: 'Registration successfully' };

		} catch(error) {
			return { code: 1, message: 'Something went wrong' };
		}

	},

	signIn: async (req, res, user) => {
		
		try {

			let getUser = await UserModel.findOne({ email: user.email });
			
			if (!getUser) {
				return { code: 1, message: 'User not found' };
			}

			let findUser = await bcrypt.compare(user.password, getUser.password);

			if (!findUser) {
				return { code: 1, message: 'Password or username does not match.' };
			}

			let signed_token = await jwt.sign({ 'userId': getUser._id }, jwt_secret);

			return { code: 0, message: 'Logged in', token: signed_token };

		} catch(error) {
			return { code: 1, message: 'Something went wrong' };
		}

	},

	getUserByToken: async (token) => {

		let token_verify = await jwt.verify(token, jwt_secret);
		
		let user = await UserModel.findById({ _id: token_verify.userId });

		if (!user) {
			return { code: 0, message: 'could not find user' };
		}

		return { code: 0, message: 'User found', user };

	}

};