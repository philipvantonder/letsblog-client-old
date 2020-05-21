const express = require('express');
const router = express.Router();

const CategoryService = require('../services/category');
const userAuthentication = require('./middleware/userAuthentication');

/**
 * @route POST api/category/uniqueCategory
 * @desc Check if the Slug category name is unique.
 * @access Private
 */
router.route('/uniqueCategory').post(userAuthentication.isLoggedIn, async (req, res) => {

	try {

		const postDTO = req.body;
		
		const { code, newSlug } = await CategoryService.uniqueCategory(postDTO);

		res.status(200).send({ code, newSlug });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route GET api/category/categories
 * @desc Get all blog categories.
 * @access Public
 */
router.route('/categories').get(async (req, res) => {

	try {
		
		const { code, categories } = await CategoryService.getCategories();

		res.status(200).send({ code, categories });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route POST api/category/addCategory
 * @desc Add new category.
 * @access Private
 */
router.route('/addCategory').post(userAuthentication.isLoggedIn, async (req, res) => {

	try {
	
		const { code, message, categories } = await CategoryService.addCategory(req.body);

		res.status(200).send({ code, message, categories });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route POST api/category/removeCategory
 * @desc remove category.
 * @access Private
 */
router.route('/removeCategory').post(userAuthentication.isLoggedIn, async (req, res) => {

	try {

		const { id } = req.body;
	
		const { code, message } = await CategoryService.removeCategory(id);

		res.status(200).send({ code, message });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route GET api/category/category
 * @desc get single category.
 * @access Private
 */
router.route('/category').post(userAuthentication.isLoggedIn, async (req, res) => {

	try {

		const { id } = req.body;
	
		const { code, message, category } = await CategoryService.getCategory(id);

		res.status(200).send({ code, message, category });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route POST api/category/category
 * @desc update category.
 * @access Private
 */
router.route('/update').post(userAuthentication.isLoggedIn, async (req, res) => {

	try {

		const { code, message } = await CategoryService.update(req.body);

		res.status(200).send({ code, message });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route GET api/category/categoryBySlug
 * @desc Get all blog categories by slug name.
 * @access Public
 */
router.route('/categoryBySlug/:slug').get(async (req, res) => {

	try {

		const { slug } = req.params;
		
		const { code, message, posts } = await CategoryService.getCategoriesBySlug(slug);

		res.status(200).send({ code, message, posts });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

module.exports = router;