const express = require('express');
const router = express.Router();

const CategoryService = require('../services/category');
const userAuthentication = require('./middleware/userAuthentication');
const { handle } = require('../utils/error-handling/request-handler');

/**
 * @route POST api/category/uniqueCategory
 * @desc Check if the Slug category name is unique.
 * @access Private
 */
router.route('/uniqueCategory').post(userAuthentication.isLoggedIn, async (req, res, next) => {

	await handle(async () => {

		const postDTO = req.body;
		
		const { newSlug } = await CategoryService.uniqueCategory(postDTO);

		res.status(200).send({ newSlug });

		res.end();

	}, next);

});

/**
 * @route GET api/category/categories
 * @desc Get all blog categories.
 * @access Public
 */
router.route('/categories').get(async (req, res, next) => {

	await handle(async () => {
		
		const { categories } = await CategoryService.getCategories();

		res.status(200).send({ categories });

		res.end();

	}, next);

});

/**
 * @route POST api/category/addCategory
 * @desc Add new category.
 * @access Private
 */
router.route('/addCategory').post(userAuthentication.isLoggedIn, async (req, res, next) => {

	await handle(async () => {
	
		const { categories } = await CategoryService.addCategory(req.body);

		res.status(200).send({ categories });

		res.end();

	}, next);

});

/**
 * @route POST api/category/removeCategory
 * @desc remove category.
 * @access Private
 */
router.route('/removeCategory').post(userAuthentication.isLoggedIn, async (req, res, next) => {

	await handle(async () => {

		const { id } = req.body;
	
		await CategoryService.removeCategory(id);

		res.end();

	}, next);

});

/**
 * @route GET api/category/category
 * @desc get single category.
 * @access Private
 */
router.route('/category').post(userAuthentication.isLoggedIn, async (req, res, next) => {

	await handle(async () => {

		const { id } = req.body;
	
		const { category } = await CategoryService.getCategory(id);

		res.status(200).send({ category });

		res.end();

	}, next);

});

/**
 * @route POST api/category/category
 * @desc update category.
 * @access Private
 */
router.route('/update').post(userAuthentication.isLoggedIn, async (req, res, next) => {

	await handle(async () => {

		await CategoryService.update(req.body);

		res.end();

	}, next);

});

/**
 * @route GET api/category/categoryBySlug
 * @desc Get all blog categories by slug name.
 * @access Public
 */
router.route('/categoryBySlug/:slug').get(async (req, res, next) => {

	await handle(async () => {

		const { slug } = req.params;
		
		const { posts } = await CategoryService.getCategoriesBySlug(slug);

		res.status(200).send({ posts });

		res.end();

	}, next);

});

module.exports = router;