module.exports = {

	userAuthenticated: function(req, res, next) {

		if (req.isAuthenticated()) {

			return next()

		}

		req.flash('error_msg', 'Please log in to review this resource')
		req.redirect('/users/login')
	}

}