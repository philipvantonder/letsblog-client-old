const express = require('express');
const router = express.Router();

const CommentService = require('../services/comment');
const { isLoggedIn } = require('./middleware/userAuthentication');
const { handle } = require('../utils/error-handling/request-handler');

/**
 * @route POST api/comment/
 * @desc Create new commnet.
 * @access Private
 */
router.route('/').post(isLoggedIn, async (req, res, next) => {

	await handle(async () => {

		const postDTO = req.body;
		
		console.log(postDTO);

		await CommentService.create(postDTO);

		res.end();

	}, next);

});