const express = require('express');
const router = express.Router();

const CommentService = require('../services/comment');
const { isLoggedIn } = require('./middleware/authentication');
const { handle } = require('../utils/error-handling/request-handler');

/**
 * @route POST api/comment/
 * @desc Create new comment.
 * @access Private
 */
router.route('/').post(isLoggedIn, async (req, res, next) => {

	await handle(async () => {

		await CommentService.create(req.body);

		res.end();

	}, next);

});

/**
 * @route GET api/comment/
 * @desc Get all Post comments.
 * @access Public
 */
router.route('/postComment/:id').get(async (req, res, next) => {

	await handle(async () => {

		const { id } = req.params;

		const { postComments, totalComments } = await CommentService.getPostCommentsById(id);

		res.status(200).send({ postComments, totalComments });

		res.end();

	}, next);

});

/**
 * @route POST api/comment/addReply
 * @desc Add reply to a post comment.
 * @access Private
 */
router.route('/addReply').post(isLoggedIn, async (req, res, next) => {

	await handle(async () => {

		await CommentService.addReply(req.body);

		res.end();

	}, next);

});

/**
 * @route POST api/comment/addLike
 * @desc Add reply to a post comment.
 * @access Private
 */
router.route('/addLike').post(isLoggedIn, async (req, res, next) => {

	await handle(async () => {

		const token = req.headers['authorization'];

		await CommentService.addLike(req.body, token);

		res.end();

	}, next);

});

/**
 * @route GET api/comment/likes
 * @desc Get all user likes that have been made to a comment.
 * @access Private
 */
router.route('/userLikes').get(isLoggedIn, async (req, res, next) => {

	await handle(async () => {

		const token = req.headers['authorization'];

		const { likes } = await CommentService.getUserCommentLikes(token);

		res.status(200).send({ likes });

		res.end();

	}, next);

});

module.exports = router;