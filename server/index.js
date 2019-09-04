const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Survey');
require('./services/passport');

//const authRoutes = require('./routes/authRoutes');

const app = express(); //generates running express app

//tell express (using .use) to utilize cookies
/*
 * Tells app to wire up middleware.
 * middleware takes some request, modifies it, then send to route handler.
 */
app.use(bodyParser.json());
app.use(
	/*
	 * cookie-session contains session, the info we want to use, in the cookie.
	 *		since we just care about id, we dont need express-session
	 *		cookie limited to 4kb. if we needed more data, would use express-sesh
	 * using express-session, id, references a session from a
	 * session store (db).
	 */
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

//authRoutes(app); immediately call function with app
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//add config for production environment. only run in prod
if (process.env.NODE_ENV === 'production') {
	// Express will serve up prod assets
	// like main.js / main.css file
	// if dont have routehandler, look in build dir to see
	// if a route is defined there.
	app.use(express.static('client/build'));

	// Express will serve up index.html if
	// it doesn't recognize the route
	// if nothing in our routes directory or client/build
	// handle here
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

mongoose.connect(keys.mongoURI, { useNewUrlParser: true }); //fixes deprecation warnings

const PORT = process.env.PORT || 5000; //heroku can inject the env var
app.listen(PORT);
