const passport = require('passport'); // seperate from config

//export the function for use in index.js
module.exports = (app) => {
	app.get(
		'/auth/google', //use passport's request method; GoogleStrategy has internal ID of 'google'
		passport.authenticate('google', {
			scope: ['profile', 'email'] //specifies what info to access from google, its profile and email. names controlled by google
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google')); //code to get prof info
};
