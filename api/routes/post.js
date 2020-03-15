const express = require('express')
const postRoutes = express.Router()
const multer = require('multer')
const app = express()
const userAuthentication = require('../middleware/userAuthentication')
const Post = require('../models/post.js')
const  userHelper = require('../lib/user/helper')
const fs = require('fs')

var storage = multer.diskStorage({

	destination: function (req, file, cb) {
		
		userHelper.getUser(req)
		.then(user => {

			let fileDir = 'images/' + user._id

			if (!fs.existsSync(fileDir)) {
				fs.mkdirSync(fileDir)
			}
	
			cb(null, fileDir + '/')
		})
		.catch(error => console.error(error))

	},
	
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
	
})

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

})


// Get all posts
postRoutes.route('/').get(userAuthentication.isLoggedIn, (req, res) => { 	

    Post.find(function(err, posts) {
        if (err) {
            res.json(err)
        } else {
            res.json(posts)
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

	let post = new Post(req.body)
    post.save().
    then(() => {
        res.status(200).json('Post have been successfully saved')
    })
    .catch(() => {
        res.status(400).send('unable to save to database')
    })
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

			let { title, body } = req.body

            post.title = title
            post.body = body
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