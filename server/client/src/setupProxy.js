const proxy = require('http-proxy-middleware');
//only needed for dev, create-react-app server nonexistant in prod
module.exports = function(app) {
	app.use(
		proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' })
	);
};
