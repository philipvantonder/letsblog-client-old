const express = require('express');
const router = express.Router();
const UserService = require('../services/user')

router.route('/isAuthenticated').get(async (req, res) => {

	let token = req.headers['x-access-token'] || req.headers['authorization'];

	const { code, message} = await UserService.isAuthenticated(token);

	res.send({ code, message });

})

router.route('/login').post(async (req, res) => {	

	try {

		const { code, message, token } = await UserService.signIn(req, res, req.body);
		return res.send({ code, message, token });
		
	} catch (error) {
		return res.status(500).send({ message: 'Something went wrong' });
	}

})

router.route('/register').post(async (req, res) => {

	const { code, message } = await UserService.createUser(req.body);

	res.send({ code, message });

})

module.exports = router