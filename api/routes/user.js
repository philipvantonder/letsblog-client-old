const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const appSettings = require('../config/appSettings')

var BCRYPT_SALT_ROUNDS = 12

let User = require('../models/user.js')

router.route('/isAuthenticated').get((req, res) => {

	let token = req.headers['x-access-token'] || req.headers['authorization']

	if (token.startsWith('Bearer ')) {
		token = token.slice(7, token.length)
	}

	if (token) {

		jwt.verify(token, appSettings.jwt_secret, (err, decoded) => {

			if (err) {
				
				res.status(200).send({
					code: 1,
					message: 'Invalid token'
				})
				
			}

			User.findOne({ _id: decoded.userId })
			.then(user => {

				if (user) {

					res.status(200).send({ 
						code: 0, 
						message: 'User have been found' 
					})
					
				} else {

					res.status(200).send({ 
						code: 1, 
						message: 'Could not find user' 
					})

				}

			})
			.catch(error => res.status(200).send({ code: 1, message: 'Error retreiving user' }))

		})

	} else {

		res.status(200).send({
			code: 1,
			message: 'Token is expired'
		})

	}

})

// User login
router.route('/login').post((req, res) => {	

	let { email, password } = req.body

	User.findOne({ email: email })
	.then(user => {

		if (!user) {
			
			res.status(200).send({ 
				code: 1, 
				message: 'Username or password is incorrect' 
			})

		}

		bcrypt.compare(password, user.password, (err, isMatch) => {

			if (err) res.sendStatus(500) 

			if (isMatch) {

				let jwt_token = jwt.sign({ userId: user._id }, appSettings.jwt_secret)

				res.status(200).send({ 
					code: 0, 
					message: 'Logged in', 
					token: jwt_token 
				})

			} else {

				res.status(200).send({ 
					code: 1, 
					message: 'Username or password is incorrect' 
				})

			}

		})

	})
	.catch(() => res.sendStatus(400))

})

// User Registration
router.route('/register').post((req, res) => {
	
	let { name, surname, email, password } = req.body

	bcrypt.hash(password, BCRYPT_SALT_ROUNDS).
	then(hashed_password => {

		let post = new User({
			'name': name,
			'surname': surname,
			'email': email,
			'password': hashed_password
		})
		
		post.save()

	})
	.then(() => {

        res.status(200).json({ 
			code: 0, 
			message: 'Registration successfully'
		})

    })
    .catch(() => res.status(400))
	
})

module.exports = router