const UserModel = require('../models/user');
const EmailService =  require('../services/email');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwt_secret, client_url } = require('../config/index');

module.exports = {

	isAuthenticated: async (token) => {

		try {
	
			const verify = await jwt.verify(token, jwt_secret);

			const user = await UserModel.findOne({ _id: verify.userId });

			if (!user) {
				return { code: 1, message: 'User not found' };
			}

			return { code: 0, message: 'User is logged in' }
		
		} catch (error) {
			throw new Error("Token is invalid.");
		}

	},

	createUser: async (userDTO) => {

		try {

			userDTO.password = await bcrypt.hash(userDTO.password, 10);

			const User = new UserModel({
				'name': userDTO.name,
				'surname': userDTO.surname,
				'email': userDTO.email,
				'password': userDTO.password
			});

			await User.save();

			return { code: 0, message: 'Registration successfully' };

		} catch(error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	signIn: async (req, res, user) => {
		
		try {

			const getUser = await UserModel.findOne({ email: user.email });
			
			if (!getUser) {
				return { code: 1, message: 'Password or username does not match.' };
			}

			const findUser = await bcrypt.compare(user.password, getUser.password);

			if (!findUser) {
				return { code: 1, message: 'Password or username does not match.' };
			}

			const signed_token = await jwt.sign({ 'userId': getUser._id, 'name': getUser.name, 'surname': getUser.surname }, jwt_secret);

			return { code: 0, message: 'Logged in', token: signed_token };

		} catch(error) {
			throw new Error("Something went wrong.");
		}

	},

	getUserByToken: async (token) => {

		try {

			const token_verify = await jwt.verify(token, jwt_secret);
			
			const user = await UserModel.findById({ _id: token_verify.userId });

			if (!user) {
				return { code: 0, message: 'could not find user' };
			}

			return { code: 0, message: 'User found', user };

		} catch(error) {
			throw new Error("Something went wrong.");
		}

	},

	update: async (id, userDTO) => {

		try {

			const user = await UserModel.findById({ _id: id });

			if (!user) {
				return { code: 1, message: 'User not found' };
			}

			user.name = userDTO.name;
			user.surname = userDTO.surname;
			user.email = userDTO.email;
			user.cellnumber = userDTO.cellnumber;
			user.bio = userDTO.bio;

			await user.save();

			return { code: 0, message: 'User have been updated' };

		} catch(error) {
			throw new Error("Something went wrong.");
		}

	},

	sendPasswordResetEmail: async (email) => {

		try {

			const user = await UserModel.findOne({ email: email });

			if (!user) {
				throw new Error("Email does not exists.");
			}

			user.generatePasswordReset();

			await user.save();

			const link = client_url + '/change-password/' + user.resetPasswordToken;

			await EmailService.sendEmail({
				to: user.email,
				subject: 'Password Change Request',
				body: `Hi ${user.name} \n 
					Please click on the following link <a href='${link}'> Click Here </a> to reset your password. \n\n 
					If you did not request this, please ignore this email and your password will remain unchanged.\n`,
				html: true
			});

		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	resetPassword: async (token, password) => {

		try {

			const user = await UserModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

			if (!user) {
				throw new Error("Password token is invalid or has expires");
			}

			await user.resetPassword(password);

			await user.save();
			
		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		
		}

	}

};