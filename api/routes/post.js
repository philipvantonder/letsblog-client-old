const PostService = require('../services/post');
const UserService = require('../services/user');

const fs = require('fs');
const express = require('express');
const path = require('path');
const multer = require('multer');
const userAuthentication = require('./middleware/userAuthentication');

const router = express.Router();
const app = express();

var postsImageDir;

var storage = multer.diskStorage({

	destination: async function (req, file, cb) {

		const token = req.headers['authorization'];

		const { user } = await UserService.getUserByToken(token);

		postsImageDir = 'images/blog/' + user._id;

		if (!fs.existsSync(postsImageDir)) {
			fs.mkdirSync(postsImageDir, { recursive: true });
		}

		cb(null, postsImageDir + '/');
		
	},
	
	filename: function (req, file, cb) {

		var originalname = file.originalname;
		if (fs.existsSync(postsImageDir + '/' + originalname)) {
			let fileName = path.parse(originalname).name;
			let fileExtension = path.parse(originalname).ext;
			originalname = fileName + '-' + Date.now() + fileExtension;
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

// app.use((err, req, res, next) =>  {

// 	if(err.code === "INCORRECT_FILETYPE") {
// 		res.status(422).json("Only images are allowed")
// 	}

// 	if(err.code === "LIMIT_FILE_SIZE") {
// 		res.status(422).json("Allowed file size is 2MB")
// 	}

// })

/**
 * @route GET api/posts/user
 * @desc fetch all posts linked to a user.
 * @access Public
 */
router.route('/user').get(userAuthentication.isLoggedIn, async (req, res) => { 	
	
	try {

		const token = req.headers['authorization'];
	
		const { code, message, posts } = await PostService.getUserPosts(token);

		res.status(200).send({ code, message, posts });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route GET api/posts/blogPost/:id
 * @desc fetch single blog post.
 * @access Public
 */
router.route('/blogPost/:id').get(async (req, res) => { 	

	try {

		const { id } = req.params;
		
		const { code, message, post } = await PostService.getBlogPost(id);

		res.status(200).send({ code, message, post });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route GET api/posts/slug/:slug
 * @desc fetch single blog post using slug.
 * @access Public
 */
router.route('/slug/:slug').get(async (req, res) => { 	

	try {

		const { slug } = req.params;
		
		const { code, message, post } = await PostService.getBlogPostBySlug(slug);

		res.status(200).send({ code, message, post });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route GET api/posts/create
 * @desc Create new blog post.
 * @access Private
 */
router.route('/create').post(userAuthentication.isLoggedIn, fileUpload.single('file'), async (req, res) => {

	try {

		const token = req.headers['authorization'];
	
		const postDTO = { ...req.body, ...req.file };
		
		const { code, message, post } = await PostService.create(postDTO, token);

		res.status(200).send({ code, message, post });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route GET api/posts/image/:id/:file
 * @desc fetch blog post image.
 * @access Public
 */
router.route('/image/:id').get(async (req, res) => {

	try {

		const { id } = req.params;

		const { post } = await PostService.getPost(id);

		fileDir = '../images/blog/' + post.user + '/' + post.fileName;
		
		res.sendFile(path.join(__dirname, fileDir));

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route GET api/posts/publishedBlogs
 * @desc fetch all published blog posts.
 * @access Public
 */
router.route('/publishedBlogs').get(async (req, res) => {

	try {
		
		const { code, message, posts } = await PostService.getPublishedBlogPosts();

		res.status(200).send({ code, message, posts });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}
	
});

/**
 * @route GET api/posts/post:id
 * @desc fetch single blog post.
 * @access Private
 */
router.route('/post/:id').get(userAuthentication.isLoggedIn, async (req, res) => {
	
	try {

		const { id } = req.params;
		
		const { code, message, post } = await PostService.getPost(id);

		res.status(200).send({ code, message, post });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}
	
});

/**
 * @route PUT api/posts/update:id
 * @desc Update blog post.
 * @access Private
 */
router.route('/update/:id').put(userAuthentication.isLoggedIn, fileUpload.single('file'), async (req, res) => {
	
	try {

		const { id } = req.params;
		
		const { code, message } = await PostService.update(id, req.body);

		res.status(200).send({ code, message });
		
	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route DELETE api/posts/delete:id
 * @desc Remove blog post.
 * @access Private
 */
router.route('/delete/:id').delete(userAuthentication.isLoggedIn, async (req, res) => {

	try {

		const { id } = req.params;
	
		const { code, message, post } = await PostService.delete(id);
		
		if (code === 0) {
			await PostService.removeUserPostFile(post);
		}

		res.status(200).send({ code, message });
		
	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

/**
 * @route POST api/posts/unique
 * @desc Check if the Slug is unique.
 * @access Private
 */
router.route('/unique').post(userAuthentication.isLoggedIn, async (req, res) => {

	try {

		const postDTO = req.body;
		
		const { code, newSlug } = await PostService.unique(postDTO);

		res.status(200).send({ code, newSlug });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}

});

module.exports = router;