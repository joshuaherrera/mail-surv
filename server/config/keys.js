if (process.env.NODE_ENV === 'production') {
	//in production - return prod keys
	module.exports = require('./prod.js');
} else {
	//in dev - return dev keys
	module.exports = require('./dev');
}
