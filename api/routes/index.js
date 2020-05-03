const express = require('express');
const app = express();

const postRoute = require('./post');
const userRoute = require('./user');
const categoryRoute = require('./category');

module.exports = {
	postRoute,
	userRoute,
	categoryRoute
};
