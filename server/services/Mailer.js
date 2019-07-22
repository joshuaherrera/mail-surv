const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
	/*helper.Mail is default mailer from sendgrid*/
	constructor({ subject, recipients }, content) {
		//used with new keyword
		super();

		//sendgrid specific setup
		this.from_email = new helper.Email('no-reply@email.com');
		this.subject = subject;
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients);

		this.addContent(this.body); //built in fcn from helper.Mail
		this.addClickTracking();
		this.addRecipients();
	}

	formatAddresses(recipients) {
		//creates new array of formatted emails
		return recipients.map(({ email }) => {
			return new helper.Email(email);
		});
	}

	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}
}

module.exports = Mailer;
