const sendGrid = require('@sendgrid/mail');
const { sendgrid_api_key, from_email, test_user_email, node_env } = require('../config/index');
sendGrid.setApiKey(sendgrid_api_key);

module.exports = {

	sendEmail: async ({ to, subject, body, html }) =>  {

		if (html === undefined) {
			html = false;
		}

		if (node_env === 'development') {
			to = test_user_email;
		}

		const mailOptions = {
			to: to,
			from: from_email,
			subject: subject,
		};

		if (html) {
			mailOptions.html = body;
		} else {
			mailOptions.text = body;
		}	

		await sendGrid.send(mailOptions);

	}

};