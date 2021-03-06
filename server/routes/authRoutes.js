const passport = require('passport'); // seperate from config

//export the function for use in index.js
module.exports = (app) => {
	app.get(
		'/auth/google', //use passport's request method; GoogleStrategy has internal ID of 'google'
		passport.authenticate('google', {
			scope: ['profile', 'email'] //specifies what info to access from google, its profile and email. names controlled by google
		})
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		}
	); //code to get profile info. last arrow fcn is what to do after
	// auth

	app.get('/api/logout/', (req, res) => {
		//passport attaches functions to req we can use
		req.logout(); //takes cookie for user and kills it to logout
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		//res.send(req.session); //contains data from passport
		res.send(req.user); //passport automatically attaches user object to res
	});
};
