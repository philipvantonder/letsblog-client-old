const express = require('express');
const router = express.Router();

const CategoryService = require('../services/category');
const { isLoggedIn } = require('./middleware/authentication');
const { handle } = require('../utils/error-handling/request-handler');

/**
 * @route POST api/category/uniqueCategory
 * @desc Check if the Slug category name is unique.
 * @access Private
 */
router.route('/uniqueCategory').post(isLoggedIn, async (req, res, next) => {

	await handle(async () => {
		
		const { newSlug } = await CategoryService.uniqueCategory(req.body);

		res.status(200).send({ newSlug });

		res.end();

	}, next);

});

/**
 * @route GET api/category/categories
 * @desc Get all blog categories.
 * @access Public
 */
router.route('/categories/:id').get(async (req, res, next) => {

	await handle(async () => {
		
		const { id } = req.params;
		
		const { category } = await CategoryService.getCategoryById(id);

		res.status(200).send({ category });

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
router.route('/addCategory').post(isLoggedIn, async (req, res, next) => {

	await handle(async () => {
	
		await CategoryService.addCategory(req.body);

		res.end();

	}, next);

});

/**
 * @route POST api/category/removeCategory
 * @desc remove category.
 * @access Private
 */
router.route('/removeCategory').post(isLoggedIn, async (req, res, next) => {

	await handle(async () => {

		const { id } = req.body;
	
		await CategoryService.removeCategory(id);

		res.end();

	}, next);

});

/**
 * @route POST api/category/category
 * @desc update category.
 * @access Private
 */
router.route('/update').put(isLoggedIn, async (req, res, next) => {

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