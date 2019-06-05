const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			console.log('access token', accessToken); //code used for profile
			console.log('refresh token', refreshToken); //allows refreshing of expired access token.
			console.log('profile:', profile); // id'ing info
		}
	)
); //be able to auth with google