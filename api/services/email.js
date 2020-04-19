const UserModel = require('../models/user');
const sendGrid = require('@sendgrid/mail');
const { sendgrid_api_key, from_email } = require('../config/index');
sendGrid.setApiKey(sendgrid_api_key);

module.exports = {

	sendEmail: async (to, subject, text) =>  {

		try {

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