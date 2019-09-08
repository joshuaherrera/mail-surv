const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys'); //do it this way to avoid errors with testing frameworks

module.exports = (app) => {
	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: false //exclude recipients list
		});

		res.send(surveys);
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		//returns wildcards denoted with :
		const p = new Path('/api/surveys/:surveyId/:choice');
		_.chain(req.body)
			.map(({ email, url }) => {
				//use p above to find appropriate pathnaem
				const match = p.test(new URL(url).pathname);
				if (match) {
					return {
						email,
						surveyId: match.surveyId,
						choice: match.choice
					};
				}
			})
			.compact() //removes all falsey values eg false, undefined etc
			.uniqBy('email', 'surveyId') //only unique values kept
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId, //mongo always uses _id
						recipients: {
							$elemMatch: { email: email, responded: false }
						}
					},
					{
						$inc: { [choice]: 1 },
						$set: { 'recipients.$.responded': true }, //$ aligns with recipeint found with $elemMatch
						lastResponded: new Date()
					}
				).exec(); //executes query
			})
			.value();

		//console.log(events);

		//must respond to sendgrid so response isnt resent
		res.send({});
	});

	//note: middleware should be placed in order of desired execution
	app.post(
		'/api/surveys/new',
		requireLogin,
		requireCredits,
		async (req, res) => {
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
			try {
				await mailer.send();
				await survey.save();
				req.user.credits -= 1;
				const user = await req.user.save();

				res.send(user); //send back user model with new credits for front end
			} catch (err) {
				res.status(422).send(err);
			}
		}
	);

	/*	app.post('/api/surveys/delete', requireLogin, async (req, res) => {
		//think of how to send the user id to mongo. how do
		//we get it from the client sige?
		console.log('delete post handler', req.body);
		await Survey.findByIdAndDelete(req.body.id, (err) => {
			if (err) console.log(err);
			console.log('successful delete of ' + req.body.id);
		});
		res.send({});
	});
	*/
};
