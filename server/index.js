const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

//const authRoutes = require('./routes/authRoutes');

const app = express(); //generates running express app

//tell express (using .use) to utilize cookies
/*
 * Tells app to wire up middleware.
 * middleware takes some request, modifies it, then send to route handler.
 */
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

//authRoutes(app);
require('./routes/authRoutes')(app);

mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 5000; //heroku can inject the env var
app.listen(PORT);
