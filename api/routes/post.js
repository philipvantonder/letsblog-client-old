const fs = require('fs');
const express = require('express');
const path = require('path');
const moment = require('moment');
const postRoutes = express.Router();
const multer = require('multer');
const app = express();
const userAuthentication = require('../middleware/userAuthentication');
const Post = require('../models/post.js');
const userHelper = require('../lib/user/helper');

var fileDir;

var storage = multer.diskStorage({

	destination: function (req, file, cb) {

		userHelper.getUser(req)
		.then(user => {
			fileDir = 'images/' + user._id

			if (!fs.existsSync(fileDir)) {
				fs.mkdirSync(fileDir, { recursive: true })
			}

			cb(null, fileDir + '/')

		})
		.catch(error => console.error(error))
		
	},
	
	filename: function (req, file, cb) {

		var originalname = file.originalname;
		if (fs.existsSync(fileDir + '/' + originalname)) {
			let fileName = originalname.split('.')[0];
			let fileExtension = originalname.split('.')[1];
			originalname = fileName + '-' + Date.now() + fileExtension
		}

		cb(null, originalname) 
	}
	
});

const fileFilter = (req, file, cb) => {

	const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']

	if (!allowedTypes.includes(file.mimetype)) {
		const error = new Error('Incorrect file type')
		error.code = "INCORRECT_FILETYPE"

		return cb(error, false)
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

postRoutes.route('/image/:id/:file').get((req, res) => {

	let { id, file } = req.params

	fileDir = 'images/' + id + '/' + file

	res.sendFile(path.join(__dirname, '../' + fileDir))

});

// Get all posts
postRoutes.route('/').get(userAuthentication.isLoggedIn, (req, res) => { 	

    Post.find(function(err, posts) {
        if (err) {
            res.json(err)
        } else {
            res.json({ code: 0, data: posts })
        }
    })

})

// Get all published posts 
postRoutes.route('/published').get(userAuthentication.isLoggedIn, (req, res) => { 	

    Post.find({ isPublished: true }, function(err, posts) {
        if (err) {
            res.json(err)
        } else {
            res.json({ code: 0, data: posts })
        }
	})

})

// file upload error checking
app.use((err, req, res, next) =>  {

	if(err.code === "INCORRECT_FILETYPE") {
		res.status(422).json("Only images are allowed")
	}

	if(err.code === "LIMIT_FILE_SIZE") {
		res.status(422).json("Allowed file size is 2MB")
	}

})

postRoutes.route('/add').post(userAuthentication.isLoggedIn, fileUpload.single('file'), (req, res) => {

	let { title, body, isPublished } = req.body

	let { filename } = req.file

	userHelper.getUser(req)
	.then(user => {
		
		if (isPublished === 'undefined') {
			isPublished = false
		}

		let post = new Post({
			title: title,
			body: body,
			isPublished: isPublished,
			fileName: filename,
			user: user._id,
		})
		post.save()
		.then(() => {
			res.status(200).json({ 
				code: 0, 
				message: 'Post have been successfully saved' 
			})
		})
		.catch(() => {
			res.status(400).send({ 
				code: 1, 
				message: 'unable to save to database' 
			})
		})

	})
	.catch(error => console.error(error))
})

postRoutes.route('/edit/:id').get(userAuthentication.isLoggedIn, (req, res) => {

    let { id } = req.params;

    Post.findById(id, function(err, post) {
        if (err) {
            res.json(err)
        } else {
            res.json(post)
        }
    })

})

postRoutes.route('/update/:id').post(userAuthentication.isLoggedIn, (req, res) => {

	let { id } = req.params;

    Post.findById(id, function(err, post) {

        if (!post) {

            res.status(200).send({ code: 0, messasge: 'Post not found' })

        } else {

			let { title, body, isPublished } = req.body

            post.title = title
			post.body = body
			post.isPublished = isPublished
			post.dateUpdated = moment().format('YYYY-MM-DD hh:mm:ss')
            post.save()
            .then(() => {
                res.status(200).send({ code: 0, messasge: 'Post have been updated' })
            })
            .catch(() => {
				res.status(200).send({ code: 0, messasge: 'Unable to update the data' })
            })

        }

    })

})

postRoutes.route('/delete/:id').delete(userAuthentication.isLoggedIn, (req, res) => {

    Post.findByIdAndRemove({ _id: req.params.id }, function(err) {
     
        if (err) {
            res.json(err)
        } else {
            res.status(200).send({ code: 0, messasge: 'Post have been removed' })
        }

    })

})

module.exports = postRoutes