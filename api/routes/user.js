const express = require('express');
const router = express.Router();
const UserService = require('../services/user');
const userAuthentication = require('../middleware/userAuthentication');

router.route('/isAuthenticated').get(async (req, res) => {

	try {

		const token = req.headers['authorization'];

		const { code, message} = await UserService.isAuthenticated(token);

		res.status(200).send({ code, message });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

router.route('/login').post(async (req, res) => {	

	try {

		const { code, message, token } = await UserService.signIn(req, res, req.body);
		
		res.status(200).send({ code, message, token });
		
	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

router.route('/register').post(async (req, res) => {

	try {

		const { code, message } = await UserService.createUser(req.body);

		res.status(200).send({ code, message });
		
	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

router.route('/getUser').get(async (req, res) => {

	try {

		const token = req.headers['authorization'];

		const { user } = await UserService.getUserByToken(token);

		res.status(200).send({ code: 0, message: 'User details', user });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

router.route('/update').post(userAuthentication.isLoggedIn, async (req, res) => {

	try {

		const token = req.headers['authorization']; 

		const { user } = await UserService.getUserByToken(token);

		const { code, message } = await UserService.update(user._id, req.body);

		res.status(200).send({ code, message, user });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route POST api/user/sendPasswordReset
 * @desc Recover Password - Generates token and Sends password reset email
 * @access Public
 */
router.route('/sendPasswordReset').post(async (req, res) => {

	try {

		const { email } = req.body;

		await UserService.sendPasswordResetEmail(email);

		res.status(200).send({ code: 0, message: `Email have been sent to <strong>${email}</strong>.` });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});


/**
 * @route POST api/user/changePassword
 * @desc Reset Password - if token is valid update user's password
 * @access Public
 */
router.route('/changePassword').post(async (req, res) => {
	
	const { token, password } = req.body;

	try {

		await UserService.resetPassword(token, password);

		res.status(200).send({ code: 0, message: 'Password have been updated.' });
		
	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

module.exports = router;