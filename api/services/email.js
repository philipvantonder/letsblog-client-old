const sendGrid = require('@sendgrid/mail');
const { sendgrid_api_key, from_email, test_user_email,  node_env } = require('../config/index');
sendGrid.setApiKey(sendgrid_api_key);

module.exports = {

	sendEmail: async (to, subject, text) =>  {

		try {

			if (node_env === 'development') {
				to = test_user_email;
			}

			const mailOptions = {
				to: to,
				from: from_email,
				subject: subject,
				text: text
			};

			await sendGrid.send(mailOptions);

		} catch (error) {
			throw new Error("There was a problem sending the email.");
		}

	}

};