const express = require('express');
const router = express.Router();

const CommentService = require('../services/comment');
const userAuthentication = require('./middleware/userAuthentication');
const { handle } = require('../utils/error-handling/request-handler');

/**
 * @route POST api/comment/
 * @desc Create new comment.
 * @access Private
 */
router.route('/').post(userAuthentication.isLoggedIn, async (req, res, next) => {

	await handle(async () => {

		const postDTO = req.body;

		await CommentService.create(postDTO);

		res.end();

	}, next);

});

/**
 * @route GET api/comment/
 * @desc Get all Post comments.
 * @access Public
 */
router.route('/:id').get(async (req, res, next) => {

	await handle(async () => {

		const { id } = req.params;

		const { postComments } = await CommentService.getPostCommentsById(id);

		res.status(200).send({ postComments });

		res.end();

	}, next);

});

module.exports = router;