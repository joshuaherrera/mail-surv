const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const app = express(); //generates running express app

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

app.get(
	'/auth/google', //use passport's request method; GoogleStrategy has internal ID of 'google'
	passport.authenticate('google', {
		scope: ['profile', 'email'] //specifies what info to access from google, its profile and email. names controlled by google
	})
);

app.get('/auth/google/callback', passport.authenticate('google')); //code to get prof info

const PORT = process.env.PORT || 5000; //heroku can inject the env var
app.listen(PORT); //tells node to listen on this port
