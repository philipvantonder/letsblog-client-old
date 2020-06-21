const UsersModel = require('../models/users');
const EmailService =  require('../services/email');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwt_secret, client_url } = require('../config/index');
const { EntityAlreadyExists, EntityNotFoundError, TokenExpiredError } = require('../utils/error-handling/custom-errors');

module.exports = {

	isAuthenticated: async (token) => {

		const verify = await jwt.verify(token, jwt_secret);

		const user = await UsersModel.findOne({ _id: verify.userId });

		if (!user) {
			throw new EntityNotFoundError('User', 'User not found.');
		}

	},

	createUser: async (userDTO) => {

		userDTO.password = await bcrypt.hash(userDTO.password, 10);

		const user = await UsersModel.findOne({ email: userDTO.email });

		if (user) {
			throw new EntityAlreadyExists('User', `Email ${userDTO.email} already exists.`);
		}

		const User = new UsersModel({
			'name': userDTO.name,
			'surname': userDTO.surname,
			'email': userDTO.email,
			'password': userDTO.password
		});

		await User.save();

	},

	signIn: async (userDTO) => {

		const user = await UsersModel.findOne({ email: userDTO.email });

		if (!user) {
			throw new EntityNotFoundError('User', 'Password or username does not match.');
		}
		
		const userPassword = await bcrypt.compare(userDTO.password, user.password);
		
		if (!userPassword) {
			throw new EntityNotFoundError('User', 'Password or username does not match.');
		}

		const token = await jwt.sign({ 'userId': user._id, 'name': user.name, 'surname': user.surname }, jwt_secret);

		return { token };

	},

	getUserByToken: async (token) => {

		const token_verify = await jwt.verify(token, jwt_secret);
		
		const userObj = await UsersModel.findById({ _id: token_verify.userId });

		if (!userObj) {
			throw new EntityNotFoundError('User', 'Could not find user');
		}

		const user = {
			id: userObj._id,
			name: userObj.name,
			surname: userObj.surname,
			email: userObj.email,
			createdAt: userObj.createdAt,
			updatedAt: userObj.updatedAt,
			profileImage: userObj.profileImage,
			bio: userObj.bio,
			cellnumber: userObj.cellnumber,
		};

		return { user };

	},

	update: async (id, userDTO) => {

		const user = await UsersModel.findById({ _id: id });

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

	},

	sendPasswordResetEmail: async (email) => {

		const user = await UsersModel.findOne({ email: email });

		if (!user) {
			throw new EntityNotFoundError('User', 'Email does not exists.');
		}

		await user.generatePasswordReset();

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

		const user = await UsersModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

		if (!user) {
			throw new TokenExpiredError();
		}

		await user.resetPassword(password);

		await user.save();

	}

};