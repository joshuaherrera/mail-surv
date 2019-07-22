const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys'); //do it this way to avoid errors with testing frameworks

module.exports = (app) => {
	//note: middleware should be placed in order of desired execution
	app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
		//make sure user is logged in.
		//also need to check if have enough
		//credits for a survey
		const { title, subject, body, recipients } = req.body; //get and assign appropriate props

		const survey = new Survey({
			title, //equivalent to {title: title}
			subject,
			body,
			recipients: recipients
				.split(',')
				.map((email) => ({ email: email.trim() })), //create short object
			_user: req.user.id, //automatically made by mongoose
			dateSent: Date.now()
		});

		//send email here
		const mailer = new Mailer(survey, surveyTemplate(survey));
	});
};
