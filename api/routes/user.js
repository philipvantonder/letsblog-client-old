const express = require('express');
const router = express.Router();
const UserService = require('../services/user');
const userAuthentication = require('../middleware/userAuthentication');
const multer = require("multer");
const fs = require('fs');
const path = require('path');

var imageDir;

var storage = multer.diskStorage({

	destination: async function (req, file, cb) {

		const token = req.headers['authorization'];

		const { user } = await UserService.getUserByToken(token);

		imageDir = 'images/user/' + user._id;

		if (!fs.existsSync(imageDir)) {
			fs.mkdirSync(imageDir, { recursive: true });
		}

		cb(null, imageDir + '/');
		
	},
	
	filename: function (req, file, cb) {

		var originalname = file.originalname;
		if (fs.existsSync(imageDir + '/' + originalname)) {
			let fileName = path.parse(originalname).name;
			let fileExtension = path.parse(originalname).ext;
			originalname = fileName + '-' + Date.now() + '.' + fileExtension;
		}

		cb(null, originalname);
	}
	
});

const fileFilter = (req, file, cb) => {

	const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

	if (!allowedTypes.includes(file.mimetype)) {
		const error = new Error('Incorrect file type');
		error.code = "INCORRECT_FILETYPE";

		return cb(error, false);
	}

	cb(null, true)

}

const fileUpload = multer({ 
	
	storage: storage, 
	
	fileFilter,
	
	limits: {
		fileSize: 500000
	}

});

/**
 * @route GET api/users/isAuthenticated
 * @desc check if token is valid.
 * @access Public
 */
router.route('/isAuthenticated').get(async (req, res) => {

	try {

		const token = req.headers['authorization'];

		const { code, message} = await UserService.isAuthenticated(token);

		res.status(200).send({ code, message });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route POST api/users/login
 * @desc login function
 * @access Public
 */
router.route('/login').post(async (req, res) => {	

	try {

		const { code, message, token } = await UserService.signIn(req, res, req.body);
		
		res.status(200).send({ code, message, token });
		
	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route POST api/users/register
 * @desc Register function
 * @access Public
 */
router.route('/register').post(async (req, res) => {

	try {

		const { code, message } = await UserService.createUser(req.body);

		res.status(200).send({ code, message });
		
	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route GET api/users/getUser
 * @desc fetch user by using token
 * @access Public
 */
router.route('/getUser').get(async (req, res) => {

	try {

		const token = req.headers['authorization'];

		const { user } = await UserService.getUserByToken(token);

		res.status(200).send({ code: 0, message: 'User details', user });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route POST api/users/update
 * @desc update user's details
 * @access Private
 */
router.route('/update').post(userAuthentication.isLoggedIn, fileUpload.single('file'), async (req, res) => {

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
 * @route POST api/users/sendPasswordReset
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
 * @route GET api/users/image/:id/:file
 * @desc fetch users image.
 * @access Public
 */
router.route('/image/:id/:file').get((req, res) => {

	try {

		const { id, file } = req.params

		let fileDir = '../images/user/' + id + '/' + file;
		
		if (!fs.existsSync(path.join(__dirname, fileDir))) {
			fileDir = '../images/placeholder/user-placeholder.jpg';
		}
		
		res.sendFile(path.join(__dirname, fileDir));

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route POST api/users/changePassword
 * @desc Reset Password - if token is valid update password
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