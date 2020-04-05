const dotenv = require('dotenv');
dotenv.config();

[
	'NODE_ENV',
	'PORT'
].forEach((name) => {
	if (!process.env[name]) {
		throw new Error('Environement variable ${name} is missing.');
	}
});

module.exports = {
	jwt_secret: process.env.JWT_SECRET,
	port: process.env.PORT,
	mongo_url: process.env.MONGO_URL,
}