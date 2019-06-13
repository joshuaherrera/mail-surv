const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users'); //one arg means fetch from mongoose

passport.serializeUser((user, done) => {
	done(null, user.id); //id (becomes cookie) identifies user from the db; uses _id
});

passport.deserializeUser((id, done) => {
	//turn id to a user
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true //used for redirect uris
		}, //callback function to do when user signsin
		(accessToken, refreshToken, profile, done) => {
			//.then is async call, returns a promise
			User.findOne({ googleId: profile.id }).then((existingUser) => {
				if (existingUser) {
					//have record with id
					done(null, existingUser); //first arg is error, second is user
				} else {
					new User({ googleId: profile.id })
						.save() // use then because save is async
						.then((user) => done(null, user)); //make model instance and save to mongodb
				}
			});
		}
	)
); //be able to auth with google
