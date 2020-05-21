const UserModel = require('../models/user');
const EmailService =  require('../services/email');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwt_secret, client_url } = require('../config/index');
const { EntityAlreadyExists, EntityNotFoundError } = require('../utils/error-handling/custom-errors');

module.exports = {

	isAuthenticated: async (token) => {

		const verify = await jwt.verify(token, jwt_secret);

		const user = await UserModel.findOne({ _id: verify.userId });

		if (!user) {
			return { code: 1, message: 'User not found' };
		}

		return { code: 0, message: 'User is logged in' }

	},

	createUser: async (userDTO) => {

		userDTO.password = await bcrypt.hash(userDTO.password, 10);

		const user = await UserModel.findOne({ email: userDTO.email });

		if (user) {
			throw new EntityAlreadyExists('User', `Email ${userDTO.email} already exists.`);
		}

		const User = new UserModel({
			'name': userDTO.name,
			'surname': userDTO.surname,
			'email': userDTO.email,
			'password': userDTO.password
		});

		await User.save();

	},

	signIn: async (req, res, user) => {

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

	},

	getUserByToken: async (token) => {

		const token_verify = await jwt.verify(token, jwt_secret);
		
		const user = await UserModel.findById({ _id: token_verify.userId });

		if (!user) {
			throw new EntityNotFoundError('User', 'Could not find user');
		}

		return { user };

	},

	update: async (id, userDTO) => {

		const user = await UserModel.findById({ _id: id });

		if (!user) {
			throw new EntityNotFoundError('User', 'Could not find user');
		}

		user.name = userDTO.name;
		user.surname = userDTO.surname;
		user.email = userDTO.email;
		user.cellnumber = userDTO.cellnumber;
		user.bio = userDTO.bio;

		// check if a new file are being uploaded.
		if (userDTO.fileName !== undefined) {
			user.profileImage = userDTO.fileName;
		}

		await user.save();

		return { code: 0, message: 'User have been updated' };

	},

	sendPasswordResetEmail: async (email) => {

		const user = await UserModel.findOne({ email: email });

		if (!user) {
			throw new EntityNotFoundError('User', 'Email does not exists.');
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

	},

	resetPassword: async (token, password) => {

		const user = await UserModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

		if (!user) {
			throw new Error("Password token is invalid or has expires");
		}

		await user.resetPassword(password);

		await user.save();

	}

};