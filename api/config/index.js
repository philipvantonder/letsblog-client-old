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
	sendgrid_api_key: process.env.SENDGRID_API_KEY,
	from_email: process.env.FROM_EMAIL,
}