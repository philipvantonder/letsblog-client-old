const express = require('express');
const router = express.Router();

const userRolesService =  require('../services/userRoles');
const UserService = require('../services/user');

const { handle } = require('../utils/error-handling/request-handler');

/**
 * @route POST api/userRole
 * @desc fetch all user Roles
 * @access Public
 */
router.route('/').post(async (req, res, next) => { 	

	await handle(async () => {

		const token = req.headers['authorization'];

		const { user } = await UserService.getUserByToken(token);

		const { userRoles } = await userRolesService.getUserRolesById(user.id);
		
		res.status(200).send({ userRoles });

		res.end();

	}, next);

});

module.exports = router;